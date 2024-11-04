<?php

namespace App\Services\User;

interface IUserAuthService
{
    public function login(array $credentials, string $ip, string $userAgent);
    public function loginVerify(array $data);
    public function register(array $data);
    public function resendVerificationEmail(string $email);
    public function resendVerificationPhone(string $email);
    public function verifyEmail(array $data);
    public function verifyPhone(array $data);
    public function logout();
    public function getCurrentUser();
    public function updateUserDevice(array $data, int $userId);
}
