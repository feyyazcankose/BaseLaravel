<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" /><!--$-->
</head>
<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">SocialUp'a Hoş Geldiniz
</div>

<body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
        style="max-width:100%;background-color:#ffffff;border:1px solid #ddd;border-radius:5px;margin-top:20px;width:480px;margin:0 auto;padding:8% 6%">
        <tbody>
            <tr style="width:100%">
                <td>
                    <p style="font-size:18px;line-height:24px;margin:16px 0;font-weight:bold;text-align:center">Social
                        Up</p>
                    <h1 style="text-align:center">Kimlik doğrulama kodunuz</h1>
                    <p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center">{{ $userEmail }}
                        e-posta adresi ile SocialUp uygulamasına giriş yapmak istiyorsanız aşağıdaki kodu
                        kullanabilirsiniz.</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                        role="presentation"
                        style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px;max-width:100%">
                        <tbody>
                            <tr>
                                <td>
                                    <h1
                                        style="color:#000;display:inline-block;padding-bottom:8px;padding-top:8px;margin:0 auto;width:100%;text-align:center;letter-spacing:8px">
                                        {{ $verifyCode }}</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p
                        style="font-size:14px;line-height:24px;margin:0;color:#444;letter-spacing:0;padding:0 40px;text-align:center">
                        Bu e-postayı beklemiyor muydunuz?</p>
                    <p
                        style="font-size:14px;line-height:24px;margin:0;color:#444;letter-spacing:0;padding:0 40px;text-align:center">

                        Bu kodu siz talep etmediyseniz <a href="mailto:info@socialup.com"
                            style="color:#444;text-decoration:underline" target="_blank">info@socialup.com</a>
                        adresine başvurun.
                    </p>
                </td>
            </tr>
        </tbody>
    </table><!--/$-->
</body>

</html>
