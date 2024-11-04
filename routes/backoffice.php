<?php

use App\Http\Controllers\Backoffice\AdminController;
use App\Http\Controllers\Backoffice\AuthController;
use App\Http\Controllers\Backoffice\RoleController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::middleware(["token-valid", "auth:admin-api"])->group(function () {
    Route::get('current', [AuthController::class, 'current']);
    Route::get('logout', [AuthController::class, 'logout']);

    Route::prefix("admin")->group(function () {
        Route::get('/', [AdminController::class, 'index'])->middleware("roles:ADMIN_VIEW");
        Route::post('/', [AdminController::class, 'store'])->middleware("roles:ADMIN_CREATE");
        Route::get('/{id}', [AdminController::class, 'show'])->middleware("roles:ADMIN_VIEW");
        Route::put('/{id}', [AdminController::class, 'update'])->middleware("roles:ADMIN_UPDATE");
        Route::delete('/{id}', [AdminController::class, "destroy"])->middleware("roles:ADMIN_DELETE");
    });

    Route::prefix("role")->group(function () {
        Route::get('/', [RoleController::class, 'index']);
        Route::get('/{id}', [RoleController::class, 'show']);
        Route::put('/{id}', [RoleController::class, 'update']);
    });
});
