<?php

namespace App\Core\Helpers\ApiDoc\app;

use App\Core\Helpers\ApiDoc\app\Controllers\ApiDocController;
use Illuminate\Support\Facades\Route;

class ApiDocRoute
{
    public static function registerRoutes()
    {
        Route::get("/", [ApiDocController::class, function () {
            return redirect('/api/doc/dashboard');
        }])->middleware("basic.auth");

        Route::get("{type}", [ApiDocController::class, "index"])->middleware("basic.auth");
        Route::get("/dynamo-doc", [ApiDocController::class, "dynamoDoc"]);
        Route::get('/assets/{path}', function ($path) {
            $file = app_path("Core/Helpers/ApiDoc/public/{$path}");

            if (file_exists($file)) {
                if (str_contains($path, '.js')) {
                    return response()->file($file, [
                        'Content-Type' => 'application/javascript',  // JavaScript için doğru MIME türü
                        'Content-Disposition' => 'inline',
                    ]);
                } else if (str_contains($path, '.css')) {
                    return response()->file($file, [
                        'Content-Type' => 'text/css',  // CSS için doğru MIME türü
                        'Content-Disposition' => 'inline',
                    ]);
                }
            }

            abort(404);
        })->where('path', '.*');
    }
}
