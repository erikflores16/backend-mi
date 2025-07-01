<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class loginController extends Controller
{
    // Mostrar el formulario de login
    public function showLoginForm()
    {
        return view('auth.login');
    }

    // Procesar el login
    public function login(Request $request)
    {
        // Validar campos
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Intentar autenticación
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard')->with('success', 'Inicio de sesión exitoso.');
        }

        // Si falla
        return back()->withErrors([
            'email' => 'Las credenciales no coinciden con nuestros registros.',
        ])->onlyInput('email');
    }

    // Cerrar sesión
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login')->with('success', 'Sesión cerrada correctamente.');
    }
}
