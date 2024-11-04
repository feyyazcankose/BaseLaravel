<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\LoginRequest;
use App\Http\Resources\Backoffice\AdminResource;
use App\Services\Admin\IAdminAuthService;

/**
 * @tags Dashboard > Auth
 */
class AuthController extends Controller
{
    protected $authService;

    public function __construct(IAdminAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Auth Login
     *
     * Bu servis sisteme giriş yapmak için kullanılır.
     * @unauthenticated
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $response = $this->authService->login($credentials, $request->ip(), $request->header('User-Agent'));;
        return [
            'accessToken' => $response['accessToken'],
            'user' => new AdminResource($response['user']),
        ];
    }

    /**
     * Auth Logout
     *
     * Bu servis sisteme çıkış yapmak için kullanılır.
     */
    public function logout()
    {
        if ($this->authService->logout()) {
            return response()->json(['message' => 'Çıkış başarılı'], 200);
        }

        return response()->json(['message' => 'Çıkış başarısız'], 400);
    }

    /**
     * Auth Current
     *
     * Bu servis paneldeki giriş yapmış kullanıcının bilgilerini getirir.
     * @response AdminResource
     */
    public function current()
    {
        return new AdminResource($this->authService->getCurrentUser());
    }
}
