<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
{
    try {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'], // Laravel hashea automáticamente
        ]);

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user,
        ], 201);

    } catch (\Exception $e) {
        // Devuelve el mensaje del error para depuración
        return response()->json([
            'error' => 'Error al registrar usuario',
            'message' => $e->getMessage(),
        ], 500);
    }
}
}