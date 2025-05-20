<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $users = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exception\TokenInvalidException) {
                return response()->json(['status' => 'Token is Invalid']);
            } else if ($e instanceof \Tymon\JWTAuth\Exception\TokenExpiredException) {
                return response()->json(['status' => 'Token is Expired']);
            } else {
                return response()->json(['status' => 'Authorization token not found']);
            }
        }

        return $next($request);
    }
}
