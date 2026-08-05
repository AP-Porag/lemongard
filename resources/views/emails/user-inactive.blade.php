<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Account Deactivated</title>
</head>

<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

                    <tr>
                        <td style="background:#0f172a;padding:35px;text-align:center;">
                            <h1 style="margin:0;color:#facc15;">LemonGard</h1>
                            <p style="margin:10px 0 0;color:#cbd5e1;">
                                Account Status Update
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:40px;">

                            <h2 style="margin-top:0;color:#111827;text-align:center;">
                                Your Account Has Been Deactivated
                            </h2>

                            <p style="font-size:16px;color:#4b5563;line-height:1.8;">

                                Hello <strong>{{ $user->name }}</strong>,

                            </p>

                            <p style="font-size:16px;color:#4b5563;line-height:1.8;">

                                Your LemonGard account has been marked as <strong>Inactive</strong> by an administrator.

                            </p>

                            <div
                                style="
margin:30px 0;
padding:20px;
border-radius:12px;
background:#FEF2F2;
border:1px solid #FCA5A5;
">

                                <h3 style="margin-top:0;color:#DC2626;">
                                    What happens now?
                                </h3>

                                <ul style="padding-left:20px;color:#374151;line-height:2;">
                                    <li>Your access to LemonGard has been disabled.</li>
                                    <li>All active sessions have been terminated.</li>
                                    <li>Your subscription has been cancelled immediately.</li>
                                    <li>If your account is reactivated in the future, you will need to purchase a new
                                        subscription before accessing the platform again.</li>
                                </ul>

                            </div>

                            <p style="font-size:15px;color:#6b7280;line-height:1.8;">

                                If you believe this action was taken by mistake, please contact our support team.

                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">

                            <p style="margin:0;font-size:12px;color:#9ca3af;">
                                © {{ date('Y') }} LemonGard. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
