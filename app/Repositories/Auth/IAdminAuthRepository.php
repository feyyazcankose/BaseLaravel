<?php

namespace App\Repositories\Auth;

interface IAdminAuthRepository
{
    public function createSession(array $data);
    public function deleteSessionByToken(string $token);
}
