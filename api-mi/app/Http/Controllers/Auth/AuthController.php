<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $user = User::where('email', $request->email)->first();

        return response()->json(compact('user','token'),200);
    }
    public function getAuthenticatedUser()
{
    $user = Auth::user();
    return response()->json([
        'id' => $user->id,
        'name' => $user->nombre,
        'id_rol' => $user->id_rol, // Aquí obtenemos el rol
    ]);
}
public function logout(Request $request)
{
    try {
        // Revocar el token JWT
        JWTAuth::parseToken()->invalidate();

        return response()->json(['message' => 'Logout exitoso'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'No se pudo cerrar sesión'], 500);
    }
}

}
