<?php

namespace App\Repositories\Auth;

interface IUserAuthRepository
{
    public function getUserByCredential(string $credential): ?\App\Models\User;
    public function createSession(array $data);
    public function deleteSessionByToken(string $token);
    public function createVerificationCode(array $data);
    public function getVerificationByCode(string $code): ?\App\Models\Verification;
    public function verifyUser(int $userId, string $type);
    public function findUserByEmail($email);
    public function findUserByPhone($phone);
}
