<?php

namespace App\Providers;

use App\Core\Helpers\Filter\FilterService;
use App\Repositories\Auth\AdminAuthRepository;
use App\Repositories\Auth\IAdminAuthRepository;
use App\Repositories\Auth\IUserAuthRepository;
use App\Repositories\Auth\UserAuthRepository;
use App\Repositories\GenericRepository;
use App\Repositories\IGenericRepository;
use App\Repositories\Role\IRoleRepository;
use App\Repositories\Role\RoleRepository;
use App\Services\Admin\AdminAuthService;
use App\Services\Admin\AdminService;
use App\Services\Admin\IAdminAuthService;
use App\Services\Admin\IAdminService;
use App\Services\Role\IRoleService;
use App\Services\Role\RoleService;
use App\Services\User\IUserAuthService;
use App\Services\User\UserAuthService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Dedoc\Scramble\Scramble;
use Illuminate\Routing\Route;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IGenericRepository::class, function ($app) {
            return new GenericRepository($app->make(FilterService::class));
        });

        $this->app->bind(IAdminService::class, AdminService::class);
        $this->app->bind(IRoleRepository::class, RoleRepository::class);
        $this->app->bind(IRoleService::class, RoleService::class);
        $this->app->bind(IAdminAuthRepository::class, AdminAuthRepository::class);
        $this->app->bind(IAdminAuthService::class, AdminAuthService::class);
        $this->app->bind(IUserAuthRepository::class, UserAuthRepository::class);
        $this->app->bind(IUserAuthService::class, UserAuthService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Scramble::routes(function (Route $route) {
            return Str::startsWith($route->uri, 'api/');
        });


        Scramble::extendOpenApi(function (OpenApi $openApi) {
            $openApi->secure(
                SecurityScheme::http('bearer', 'JWT')
            );
        });
    }
}
