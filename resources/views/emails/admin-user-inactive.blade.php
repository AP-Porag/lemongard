<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>User Deactivated</title>
</head>

<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px;background:#f8fafc;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

                    <tr>
                        <td style="background:#0f172a;padding:35px;text-align:center;">
                            <h1 style="margin:0;color:#facc15;">LemonGard</h1>
                            <p style="margin-top:10px;color:#cbd5e1;">
                                Administrator Notification
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:40px;">

                            <h2>User Account Deactivated</h2>

                            <p>
                                Hello {{ $admin->name }},
                            </p>

                            <p>
                                This is a confirmation that a user account has been marked as <strong>Inactive</strong>.
                            </p>

                            <table width="100%" cellpadding="10" style="margin-top:25px;border-collapse:collapse;">

                                <tr style="background:#f3f4f6;">
                                    <td><strong>User</strong></td>
                                    <td>{{ $user->name }}</td>
                                </tr>

                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>{{ $user->email }}</td>
                                </tr>

                                <tr style="background:#f3f4f6;">
                                    <td><strong>Status</strong></td>
                                    <td>Inactive</td>
                                </tr>

                                <tr>
                                    <td><strong>Updated By</strong></td>
                                    <td>{{ $admin->name }}</td>
                                </tr>

                                <tr style="background:#f3f4f6;">
                                    <td><strong>Date</strong></td>
                                    <td>{{ now()->format('d M Y h:i A') }}</td>
                                </tr>

                            </table>

                            <div
                                style="margin-top:30px;padding:20px;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:10px;">

                                <strong>Actions Completed</strong>

                                <ul style="line-height:2;">
                                    <li>User access disabled.</li>
                                    <li>All active sessions terminated.</li>
                                    <li>Subscription cancelled.</li>
                                    <li>User must purchase a new subscription if reactivated.</li>
                                </ul>

                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f9fafb;padding:20px;text-align:center;">
                            © {{ date('Y') }} LemonGard
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
