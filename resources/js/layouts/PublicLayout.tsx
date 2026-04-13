import '../../css/public.css';

import { ReactNode } from 'react';

import { Toaster } from '@/components/public/ui/toaster';
import { Toaster as Sonner } from '@/components/public/ui/sonner';
import { TooltipProvider } from '@/components/public/ui/tooltip';

import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Props {
    children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />

                {/* Global Page Container */}
                <div className="flex min-h-screen flex-col bg-background">
                    {/* Navigation */}
                    <Navigation />

                    {/* Page Content */}
                    <main className="flex-1">{children}</main>

                    {/* Footer */}
                    <Footer />
                </div>
            </TooltipProvider>
        </QueryClientProvider>
    );
}
