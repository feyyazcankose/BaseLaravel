<?php

namespace App\Services\User;

use App\Core\Helpers\Sms\SmsModule;
use App\Core\Mail\LoginVerifyMail;
use App\Core\Mail\RegisterVerifyMail;
use App\Models\User;
use App\Repositories\Auth\IUserAuthRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Services\User\IUserAuthService;

class UserAuthService implements IUserAuthService
{
    protected $authRepository;

    public function __construct(IUserAuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login(array $credentials, string $ip, string $userAgent)
    {
        $user = $this->authRepository->getUserByCredential($credentials['credential']);
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $verifyCode = random_int(1000, 9999);
        $this->authRepository->createVerificationCode([
            'type' => 'auth_mail',
            'code' => $verifyCode,
            'user_id' => $user->id,
            'verify_time' => now()->addMinutes(5),
            'status' => 'pending'
        ]);

        if (filter_var($credentials['credential'], FILTER_VALIDATE_EMAIL)) {
            Mail::to($user->email)->send(new LoginVerifyMail($user, $verifyCode));
        } else {
            $sms = new SmsModule();
            $sms->sendSms($user->phone, "Doğrulama Kodunuz: " . $verifyCode);
        }

        return ['message' => 'Doğrulama kodu gönderildi.', 'credential' => $credentials['credential']];
    }

    public function loginVerify(array $data)
    {
        $verification = $this->authRepository->getVerificationByCode($data['verify_code']);
        if (!$verification || Carbon::now()->greaterThan($verification->verify_time)) {
            return response()->json(['message' => 'Kod geçersiz veya süresi dolmuş'], 400);
        }

        $user = $verification->user;
        $token = JWTAuth::fromUser($user);
        auth("user-api")->setUser($user);

        $this->authRepository->createSession([
            'ip_address' => $data['ip'],
            'user_agent' => $data['user_agent'],
            'last_activity' => now(),
            'token' => $token,
            'user_id' => $user->id,
        ]);

        $this->authRepository->verifyUser($user->id, 'auth_mail');
        return ['accessToken' => $token, 'user' => $user];
    }

    public function register(array $data)
    {
        $user = User::create([
            "first_name" => $data['first_name'],
            "last_name" => $data['last_name'],
            "phone" => $data['phone'],
            "phone_code" => $data['phone_code'],
            "email" => $data['email'],
            "image" => $data['image'] ?? null,
            "gender" => $data['gender'] ?? 'not_specified',
            "referance_code" => $data['referance_code'] ?? null,
            "birthdate" => $data['birthdate'] ?? null,
            "country_id" => $data['country_id'] ?? null,
            "city_id" => $data['city_id'] ?? null,
            "town_id" => $data['town_id'] ?? null,
            "user_code" => User::makeAuthVerifyCode()
        ]);


        if ($user) {
            $verifyCode = random_int(1000, 9999);
            $this->authRepository->createVerificationCode([
                'type' => 'mail',
                'code' => $verifyCode,
                'user_id' => $user->id,
                'verify_time' => now()->addMinutes(5),
                'status' => 'pending',
                "email" => $user->email
            ]);

            Mail::to($user->email)->send(new RegisterVerifyMail($user, $verifyCode));

            return [
                "message" => "E-posta doğrulaması gönderildi",
                "credential" => $user->email
            ];
        }

        abort(
            response()->json(['error' => 'Kullanıcı oluşturulamadı'], 500)
        );
    }


    public function resendVerification(string $email)
    {
        $user = User::where('email', $email)->first();

        if ($user) {
            $verifyCode = random_int(1000, 9999);
            $this->authRepository->createVerificationCode([
                'type' => 'mail',
                'code' => $verifyCode,
                'user_id' => $user->id,
                'verify_time' => now()->addMinutes(5),
                'status' => 'pending',
                "email" => $user->email
            ]);

            Mail::to($user->email)->send(new RegisterVerifyMail($user, $verifyCode));

            return [
                "message" => "E-posta doğrulaması gönderildi.",
                "credential" => $user->email
            ];
        }

        abort(
            response()->json(['error' => 'Kullanıcı bulunamadı'], 404)
        );
    }

    public function resendVerificationPhone($phone)
    {
        $user = $this->authRepository->findUserByPhone($phone);
        if (!$user) {
            return response()->json(['message' => 'Kullanıcı bulunamadı'], 404);
        }

        $verifyCode = random_int(1000, 9999);
        $this->authRepository->createVerificationCode([
            'type' => 'auth_phone',
            'code' => $verifyCode,
            'user_id' => $user->id,
            'verify_time' => now()->addMinutes(5),
            'status' => 'pending'
        ]);

        $sms = new SmsModule();
        $sms->sendSms($user->phone, "Doğrulama Kodunuz: " . $verifyCode);

        return [
            'message' => 'SMS doğrulaması gönderildi',
            'credential' => $user->phone
        ];
    }

    public function verifyEmail(array $data)
    {
        $email = $data['email'];
        $verifyCode = $data['verify_code'];

        $user = User::where('email', $email)->first();
        $verification = $this->authRepository->getVerificationByCode($verifyCode);

        if ($verification && $verification->user_id == $user->id && Carbon::now()->lessThanOrEqualTo($verification->verify_time)) {
            $this->authRepository->verifyUser($user->id, 'mail');

            $phoneVerifyCode = random_int(1000, 9999);
            $this->authRepository->createVerificationCode([
                'type' => 'phone',
                'code' => $phoneVerifyCode,
                'user_id' => $user->id,
                'verify_time' => now()->addMinutes(5),
                'status' => 'pending',
                "phone" => $user->phone
            ]);

            $sms = new SmsModule();
            $sms->sendSms($user->phone, "Doğrulama Kodunuz: " . $phoneVerifyCode);

            return [
                "message" => "Sms doğrulaması gönderildi.",
                "credential" => $user->phone
            ];
        }

        abort(
            response()->json(['error' => 'Doğrulama kodu geçersiz veya süresi dolmuş'], 400)
        );
    }

    public function verifyPhone(array $data)
    {
        $phone = $data['phone'];
        $verifyCode = $data['verify_code'];

        $user = User::where('phone', $phone)->first();
        $verification = $this->authRepository->getVerificationByCode($verifyCode);

        if ($verification && $verification->user_id == $user->id && Carbon::now()->lessThanOrEqualTo($verification->verify_time)) {
            $this->authRepository->verifyUser($user->id, 'phone');

            $token = JWTAuth::fromUser($user);
            auth("user-api")->setUser($user);
            $this->authRepository->createSession([
                'ip_address' => request()->ip(),
                'user_agent' => request()->header('User-Agent'),
                'last_activity' => now(),
                'token' => $token,
                'user_id' => $user->id,
            ]);

            return [
                'accessToken' => $token,
                'user' => $user
            ];
        }

        abort(
            response()->json(['error' => 'Doğrulama kodu geçersiz veya süresi dolmuş'], 400)
        );
    }

    public function logout()
    {
        $token = JWTAuth::getToken();
        JWTAuth::authenticate($token);

        $this->authRepository->deleteSessionByToken($token);
        JWTAuth::invalidate($token);

        return ['message' => 'Successfully logged out'];
    }

    public function getCurrentUser()
    {
        if (!$user = Auth::guard('user-api')->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $user;
    }

    public function updateUserDevice(array $data, int $userId)
    {
        //TODO: Kullanıcı cihaz bilgilerini güncelleme işlemleri
    }

    public function resendVerificationEmail($email)
    {
        $user = $this->authRepository->findUserByEmail($email);
        if (!$user) {
            return response()->json(['message' => 'Kullanıcı bulunamadı'], 404);
        }

        $verifyCode = random_int(1000, 9999);
        $this->authRepository->createVerificationCode([
            'type' => 'mail',
            'code' => $verifyCode,
            'user_id' => $user->id,
            'verify_time' => now()->addMinutes(5),
            'status' => 'pending'
        ]);

        Mail::to($user->email)->send(new RegisterVerifyMail($user, $verifyCode));

        return [
            'message' => 'E-posta doğrulaması gönderildi',
            'credential' => $user->email
        ];
    }
}
