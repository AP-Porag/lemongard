<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminUserInactiveMail extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;
    public $admin;

    public function __construct(User $user, $admin)
    {
        $this->user = $user;
        $this->admin = $admin;
    }

    public function build(): static
    {
        return $this
            ->subject('User Account Deactivated')
            ->view('emails.admin-user-inactive');
    }
}
