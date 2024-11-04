<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Core\Helpers\Helper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'image',
        'phone_code',
        'gender',
        'birthdate',
        'is_email_verify',
        'is_blocked',
        'is_phone_verify',
        "amount",
        "point",
        "country_id",
        "user_code",
        "referance_code",
        "city_id",
        "town_id",
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Guard for the model
     *
     * @var string
     */
    protected $guard = 'user-api';

    // Gerekli metodları tanımlayalım
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        $user = $this;
        unset($user["is_email_verify"]);
        unset($user["is_blocked"]);
        unset($user["is_phone_verify"]);
        unset($user["country_id"]);
        unset($user["city_id"]);
        unset($user["town_id"]);
        unset($user["updated_at"]);
        return [
            'user' => $user
        ];
    }

    public static function makeAuthVerifyCode()
    {
        $code = Helper::makeId(4, true);
        if (User::where("user_code", $code)->first()) {
            return User::makeAuthVerifyCode()();
        }

        return $code;
    }
}
