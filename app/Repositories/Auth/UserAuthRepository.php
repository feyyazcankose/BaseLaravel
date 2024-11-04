<?php

namespace App\Repositories\Auth;

use App\Models\User;
use App\Models\Session;
use App\Models\Verification;

class UserAuthRepository implements IUserAuthRepository
{
    public function getUserByCredential(string $credential): ?User
    {
        return filter_var($credential, FILTER_VALIDATE_EMAIL)
            ? User::where('email', $credential)->first()
            : User::where('phone', $credential)->first();
    }

    public function findUserByPhone($phone)
    {
        return User::where('phone', $phone)->first();
    }

    public function findUserByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    public function createSession(array $data)
    {
        return Session::create($data);
    }

    public function deleteSessionByToken(string $token)
    {
        return Session::where('token', $token)->delete();
    }

    public function createVerificationCode(array $data)
    {
        return Verification::create($data);
    }

    public function getVerificationByCode(string $code): ?Verification
    {
        return Verification::where('code', $code)->with("user")->first();
    }

    public function verifyUser(int $userId, string $type)
    {
        Verification::where('user_id', $userId)->where('type', $type)->update(['status' => 'verified']);
        if ($type === 'mail') {
            User::where('id', $userId)->update(['is_email_verify' => true]);
        } else if ($type === 'phone') {
            User::where('id', $userId)->update(['is_phone_verify' => true]);
        }
    }
}
