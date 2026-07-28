<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} - Password Reset</title>
</head>

<body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background:#0f172a;padding:35px 30px;text-align:center;">
                            <h1 style="margin:0;color:#facc15;font-size:28px;font-weight:700;text-align:center;">
                                {{ config('app.name') }}
                            </h1>
                            <p style="margin:10px 0 0;color:#cbd5e1;font-size:14px;text-align:center;">
                                Password Reset Request
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:40px 35px;">
                            <h2 style="margin-top:0;color:#111827;font-size:22px;">Hello!</h2>
                            <p style="font-size:16px;line-height:1.7;color:#4b5563;">
                                You are receiving this email because we received a password reset request for your
                                account.
                            </p>

                            <!-- হলুদ বাটন -->
                            <div style="text-align:center;margin:35px 0;">
                                <a href="{{ $url }}"
                                    style="
                                        display:inline-block;
                                        background:#facc15;
                                        color:#0f172a;
                                        font-size:16px;
                                        font-weight:700;
                                        text-decoration:none;
                                        padding:14px 40px;
                                        border-radius:8px;
                                        border:1px solid #facc15;
                                        box-shadow:0 4px 6px rgba(0,0,0,0.1);
                                   ">
                                    Reset Password
                                </a>
                            </div>

                            <!-- ব্যাকআপ টেক্সট লিংক -->
                            {{-- <p
                                style="font-size:14px;color:#6b7280;line-height:1.7;text-align:center;word-break:break-all;">
                                Alternatively, copy and paste this link into your browser:<br>
                                <a href="{{ $url }}" style="color:#facc15;">{{ $url }}</a>
                            </p> --}}

                            <p style="font-size:14px;color:#6b7280;line-height:1.7;text-align:center;margin-top:20px;">
                                This password reset request will expire in 60 minutes.
                            </p>

                            <p style="font-size:14px;color:#6b7280;line-height:1.7;text-align:center;margin-top:20px;">
                                If you did not request a password reset, no further action is required.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">
                            <p style="margin:0;font-size:12px;color:#9ca3af;">
                                © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>
