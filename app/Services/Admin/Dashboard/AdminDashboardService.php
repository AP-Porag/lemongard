<?php

namespace App\Services\Admin\Dashboard;

use App\Models\User;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Stripe\StripeClient;

class AdminDashboardService
{

    public function getStats(): array
    {

        $total_subscriber = User::count() - 1;

        return [
            'total_subscriber' => $total_subscriber,

            'trialing' => $this->trialing(),

            'active' => $this->active(),

            'canceled' => $this->canceled(),

            'past_due' => $this->pastDue(),

            'trial_expired' => $this->trialExpired(),

            'monthly_subscriptions' => $this->monthlySubscriptions(),

            'total_revenue' => $this->calculateRevenue(),

            'monthly_revenue' => $this->monthlyRevenue(),

            'plan_distribution' => $this->subscriptionByTier(),

        ];
    }
    private function calculateRevenue(): float
    {
        $stripe = new StripeClient(config('cashier.secret'));

        $subscriptions = DB::table('subscriptions')
            ->where('stripe_status', 'active')
            ->get();

        $total = 0;

        foreach ($subscriptions as $sub) {
            try {
                // Stripe Price retrieve
                $price = $stripe->prices->retrieve($sub->stripe_price, []);

                // Stripe amount is in cents → convert to dollars
                $total += ($price->unit_amount ?? 0) / 100;
            } catch (\Exception $e) {
                continue;
            }
        }

        return (float) $total;
    }
    private function baseQuery()
    {
        return DB::table('subscriptions');
    }

    private function totalSubscriptions(): int
    {
        return $this->baseQuery()->count();
    }

    private function trialing(): int
    {
        return $this->baseQuery()
            ->where('stripe_status', 'trialing')
            ->count();
    }

    private function active(): int
    {
        return $this->baseQuery()
            ->where('stripe_status', 'active')
            ->where('stripe_price', '!=', 'price_1TXH33HKtXG9R7bGb5heMCgK')
            ->where(function ($query) {
                $query->whereNull('trial_ends_at')
                    ->orWhere('trial_ends_at', '<', now());
            })
            ->count();
    }
    private function canceled(): int
    {
        return $this->baseQuery()
            ->where('stripe_status', 'canceled')
            ->count();
    }

    private function pastDue(): int
    {
        return $this->baseQuery()
            ->where('stripe_status', 'past_due')
            ->count();
    }

    private function trialExpired(): int
    {
        return $this->baseQuery()
            ->whereNotNull('trial_ends_at')
            ->where('trial_ends_at', '<', now())
            ->count();
    }

    public function monthlySubscriptions(): array
    {
        return DB::table('subscriptions')
            ->where('stripe_status', 'active')
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as total")
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($row) => [
                'month' => $row->month,
                'total' => (int) $row->total
            ])
            ->toArray();
    }

    public function subscriptionStatusDistribution(): array
    {
        return [
            'active' => DB::table('subscriptions')
                ->where('stripe_status', 'active')
                ->count(),

            'trialing' => DB::table('subscriptions')
                ->where('stripe_status', 'trialing')
                ->count(),

            'canceled' => DB::table('subscriptions')
                ->where('stripe_status', 'canceled')
                ->count(),
        ];
    }


    public function monthlyRevenue(): array
    {
        $stripe = new StripeClient(config('cashier.secret'));

        $subscriptions = DB::table('subscriptions')
            ->where('stripe_status', 'active')
            ->select('stripe_price', 'created_at')
            ->get()
            ->groupBy(function ($item) {
                return date('Y-m', strtotime($item->created_at));
            });

        $result = [];

        foreach ($subscriptions as $month => $items) {

            $total = 0;

            foreach ($items as $sub) {
                $price = $stripe->prices->retrieve($sub->stripe_price);

                $total += ($price->unit_amount ?? 0) / 100;
            }

            $result[] = [
                'month' => $month,
                'monthly_revenue' => $total
            ];
        }

        return $result;
    }

    public function subscriptionByTier(): array
    {
        return DB::table('subscriptions')
            ->join('plans', 'subscriptions.stripe_price', '=', 'plans.stripe_price_id')
            ->where('subscriptions.stripe_status', 'active')
            ->select('plans.name')
            ->selectRaw('COUNT(subscriptions.id) as total')
            ->groupBy('plans.name')
            ->get()
            ->toArray();
    }
}
