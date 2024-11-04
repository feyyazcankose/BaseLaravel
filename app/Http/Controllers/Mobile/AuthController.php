<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Mobile\LoginRequest;
use App\Http\Requests\Mobile\LoginVerifyRequest;
use App\Http\Requests\Mobile\RegisterRequest;
use App\Http\Requests\Mobile\RegisterEmailVerifyResendRequest;
use App\Http\Requests\Mobile\RegisterEmailVerifyRequest;
use App\Http\Requests\Mobile\RegisterPhoneVerifyRequest;
use App\Http\Requests\Mobile\RegisterPhoneVerifyResendRequest;
use App\Http\Resources\Mobile\UserResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\Mobile\AuthResponseResource;
use App\Http\Resources\Mobile\VerificationResource;
use App\Services\User\IUserAuthService;

/**
 * @tags Mobile > Auth
 */
class AuthController extends Controller
{
    protected $authService;

    public function __construct(IUserAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Auth Login
     *
     * Bu servis sisteme giriş yapmak için kullanılır.
     * Aynı zamanda tekrar kod gönderme servisidir.
     * @unauthenticated
     *
     * @response VerificationResource
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('credential');
        $response = $this->authService->login($credentials, $request->ip(), $request->header('User-Agent'));

        return new VerificationResource($response);
    }

    /**
     * Auth Login Verify
     *
     * Bu servis giriş için doğrulama servisidir.
     * Kullanıcının giriş kodunu doğrular ve oturumu başlatır.
     * @unauthenticated
     *
     * @response AuthResponseResource
     */
    public function loginVerify(LoginVerifyRequest $request)
    {
        $data = [
            'credential' => $request->input('credential'),
            'verify_code' => $request->input('verify_code'),
            'ip' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
        ];

        return new AuthResponseResource($this->authService->loginVerify($data));
    }

    /**
     * Auth Register
     *
     * Bu servis sisteme kayıt olmak için kullanılır.
     * Kullanıcıyı kaydeder ve e-posta doğrulama kodu gönderir.
     * @unauthenticated
     *
     * @response VerificationResource
     */
    public function register(RegisterRequest $request)
    {
        return new VerificationResource($this->authService->register($request->toArray()));
    }


    /**
     * Auth Register Email Resend
     *
     * Bu servis e-posta için yeni bir doğrulama kodu gönderir.
     * Kullanıcıya e-posta doğrulama kodu yeniden gönderilir.
     * @unauthenticated
     *
     * @response VerificationResource
     */
    public function resendVerificationEmail(RegisterEmailVerifyResendRequest $request)
    {
        return new VerificationResource($this->authService->resendVerificationEmail($request->input('email')));
    }

    /**
     * Auth Register Phone Resend
     *
     * Bu servis telefon numarası için yeni bir doğrulama kodu gönderir.
     * Kullanıcıya telefon doğrulama kodu yeniden gönderilir.
     * @unauthenticated
     *
     * @response VerificationResource
     */
    public function resendVerificationPhone(RegisterPhoneVerifyResendRequest $request)
    {
        return new VerificationResource($this->authService->resendVerificationPhone($request->input('phone')));
    }

    /**
     * Auth Register Email Verify
     *
     * Bu servis kayıt esnasındaki e-posta için doğrulama işlemini sağlar.
     * Kullanıcının e-posta doğrulamasını tamamlar ve SMS doğrulama kodu gönderir.
     * @unauthenticated
     *
     * @response VerificationResource
     */
    public function verifyEmail(RegisterEmailVerifyRequest $request)
    {
        $data = [
            'email' => $request->input('email'),
            'verify_code' => $request->input('verify_code')
        ];

        return new VerificationResource($this->authService->verifyEmail($data));
    }

    /**
     * Auth Register Phone Verify
     *
     * Bu servis kayıt esnasındaki telefon için doğrulama işlemini sağlar.
     * Kullanıcının telefon doğrulamasını tamamlar ve giriş tokenı verir.
     * @unauthenticated
     *
     * @response AuthResponseResource
     */
    public function verifyPhone(RegisterPhoneVerifyRequest $request)
    {
        $data = [
            'phone' => $request->input('phone'),
            'verify_code' => $request->input('verify_code')
        ];

        return new AuthResponseResource($this->authService->verifyPhone($data));
    }

    /**
     * Auth Logout
     *
     * Bu servis sistemden çıkış yapmak için kullanılır.
     * Kullanıcının oturumunu kapatır ve geçerli token'ı iptal eder.
     *
     * @response MessageResource
     */
    public function logout()
    {
        return new MessageResource($this->authService->logout());
    }

    /**
     * Auth Current
     *
     * Bu servis, sistemdeki mevcut giriş yapmış kullanıcının bilgilerini getirir.
     * Kullanıcının profil bilgilerini döndürür.
     *
     * @response UserResource
     */
    public function current()
    {
        return new UserResource($this->authService->getCurrentUser());
    }
}
