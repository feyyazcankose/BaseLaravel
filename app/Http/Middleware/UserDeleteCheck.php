<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserDeleteCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  array  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // JWT içinden kullanıcının token'ını al
        if (!$user = (Auth::guard('user-api')->user())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($user->deleted_at === null) {
            return $next($request);
        } else if ($user->deleted_at) {
            return response()->json([
                'message' => 'Kullanıcı silinmiş. Bu işlemi gerçekleştiremezsiniz. Lütfen yeni bir hesap oluşturun.'
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'message' => 'Yetkisiz erişim. Gerekli role sahip değilsiniz.'
        ], Response::HTTP_FORBIDDEN);
    }
}
