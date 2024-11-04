<?php

namespace App\Services\Admin;

use App\Repositories\Auth\IAdminAuthRepository;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class AdminAuthService implements IAdminAuthService
{
    protected $authRepository;

    public function __construct(IAdminAuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login(array $credentials, string $ip, string $userAgent)
    {
        if (!$token = auth("admin-api")->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $authUser = auth("admin-api")->user();

        $this->authRepository->createSession([
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'last_activity' => Carbon::now(),
            'token' => $token,
            'admin_id' => $authUser->id,
        ]);

        return [
            'accessToken' => $token,
            'user' => $authUser,
        ];
    }

    public function logout()
    {
        $token = JWTAuth::getToken();
        JWTAuth::authenticate($token);

        $this->authRepository->deleteSessionByToken($token);
        JWTAuth::invalidate($token);

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function getCurrentUser()
    {
        if (!$user = Auth::guard('admin-api')->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $user;
    }
}
