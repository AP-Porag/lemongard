<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendOTPMail extends Mailable
{
    use Queueable, SerializesModels;

    // ১. এই ভেরিয়েবলটি পাবলিক করায় এটি অটোমেটিক মেইল ভিউতে (Blade) অ্যাক্সেস পাবে
    public $otp;

    /**
     * Create a new message instance.
     */
    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    /**
     * Get the message envelope (Subject সেট করার জন্য)
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your OTP Verification Code',
        );
    }

    /**
     * Get the message content definition (কোন ব্লেড ফাইল লোড হবে)
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.otp', // 👈 এই ভিউ ফাইলটি আমরা এখন তৈরি করব
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
