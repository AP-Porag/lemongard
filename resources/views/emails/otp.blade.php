{{-- <!DOCTYPE html>
<html>

<head>
    <title>OTP Verification</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div
        style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; text-align: center;">Welcome to Our Platform!</h2>
        <p style="font-size: 16px; color: #666666;">Thank you for registering. Please use the following One-Time Password
            (OTP) to verify your account. This code is valid for 10 minutes.</p>

        <div style="text-align: center; margin: 30px 0;">
            <span
                style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4f46e5; background: #f3f4f6; padding: 10px 20px; border-radius: 5px; border: 1px dashed #4f46e5;">
                {{ $otp }}
            </span>
        </div>

        <p style="font-size: 14px; color: #999999; text-align: center;">If you did not request this registration, please
            ignore this email.</p>
    </div>
</body>

</html> --}}



<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
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
                            <h1 style="margin:0;color:#facc15;font-size:28px;font-weight:700;">
                                LemonGard
                            </h1>
                            <p style="margin:10px 0 0;color:#cbd5e1;font-size:14px;">
                                Account Verification
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:40px 35px;">

                            <h2 style="margin-top:0;color:#111827;font-size:24px;text-align:center;">
                                Welcome to Our Platform!
                            </h2>

                            <p
                                style="font-size:16px;line-height:1.7;color:#4b5563;text-align:center;margin-bottom:30px;">
                                Thank you for registering. Please use the
                                following One-Time Password (OTP) to verify
                                your account. This code is valid for 10
                                minutes.
                            </p>

                            <div style="text-align:center;margin:35px 0;">
                                <span
                                    style="
                                        display:inline-block;
                                        background:#fef9c3;
                                        border:2px dashed #eab308;
                                        color:#0f172a;
                                        font-size:34px;
                                        font-weight:700;
                                        letter-spacing:8px;
                                        padding:16px 30px;
                                        border-radius:12px;
                                    ">
                                    {{ $otp }}
                                </span>
                            </div>

                            <p style="font-size:14px;color:#6b7280;line-height:1.7;text-align:center;">
                                If you did not request this registration,
                                please ignore this email.
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">
                            <p style="margin:0;font-size:12px;color:#9ca3af;">
                                © {{ date('Y') }} LemonGard. All rights
                                reserved.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
