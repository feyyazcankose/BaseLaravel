<?php

use App\Http\Controllers\Mobile\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('login/verify', [AuthController::class, "loginVerify"]);
Route::post('register', [AuthController::class, 'register']);
Route::post('register/email/verify', [AuthController::class, 'verifyEmail']);
Route::post('register/phone/verify', [AuthController::class, 'verifyPhone']);
Route::post('register/email/resend', [AuthController::class, "resendVerificationEmail"]);
Route::post('register/phone/resend', [AuthController::class, "resendVerificationPhone"]);

Route::middleware(["token-valid", "auth:user-api"])->group(function () {
    Route::get('current', [AuthController::class, 'current']);
    Route::get('logout', [AuthController::class, 'logout']);
});
