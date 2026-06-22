<!DOCTYPE html>
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

</html>
