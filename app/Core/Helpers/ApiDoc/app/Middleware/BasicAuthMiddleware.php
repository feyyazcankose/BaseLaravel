<?php

namespace App\Core\Helpers\ApiDoc\app\Middleware;

use Closure;

class BasicAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Basic auth logic
        if ($request->getUser() !== env("API_DOC_USER", "apiDoc") || $request->getPassword() !== env("API_DOC_PASS", "apiDoc")) {
            return response('Unauthorized.', 401, ['WWW-Authenticate' => 'Basic']);
        }

        return $next($request);
    }
}
