<?php

namespace App\Services\Admin;

interface IAdminAuthService
{
    public function login(array $credentials, string $ip, string $userAgent);
    public function logout();
    public function getCurrentUser();
}
