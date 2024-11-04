<?php

use App\Core\Helpers\ApiDoc\app\ApiDocRoute;
use App\Core\Helpers\ApiDoc\app\Middleware\BasicAuthMiddleware;
use App\Http\Middleware\AdminRoles;
use App\Http\Middleware\TokenIsValid;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        using: function () {
            Route::prefix('api/doc')
                ->name('doc.')
                ->group(function () {
                    ApiDocRoute::registerRoutes();
                });

            Route::prefix('api/backoffice')
                ->name('backoffice.')
                ->group(base_path('routes/backoffice.php'));

            Route::prefix('api/common')
                ->name('common.')
                ->group(base_path('routes/common.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            Route::prefix('api/mobile')
                ->name('mobile.')
                ->group(base_path('routes/mobile.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
        $middleware->alias([
            'roles' => AdminRoles::class,
            'token-valid' => TokenIsValid::class,
            'basic.auth' => BasicAuthMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
