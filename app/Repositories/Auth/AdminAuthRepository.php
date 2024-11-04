<?php

namespace App\Repositories\Auth;

use App\Models\Session;

class AdminAuthRepository implements IAdminAuthRepository
{

    public function createSession(array $data)
    {
        return Session::create($data);
    }

    public function deleteSessionByToken(string $token)
    {
        return Session::where('token', $token)->delete();
    }
}
