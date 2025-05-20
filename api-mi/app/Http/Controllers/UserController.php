<?php
namespace App\Http\Controllers;

use App\Models\User;

class DashboardController extends Controller
{
    public function getDashboardData()
    {
        // Obtener el total de usuarios
        $totalUsuarios = User::count(); // Utilizando Eloquent

        // Obtener los usuarios por rol
        $planBasico = User::where('id_rol', 1)->count();  // Plan Básico
        $planMax = User::where('id_rol', 2)->count();      // Plan Max
        $planPremium = User::where('id_rol', 3)->count();  // Plan Premium

        // Retornar los datos al frontend
        return response()->json([
            'totalUsuarios' => $totalUsuarios,
            'dineroGenerado' => 1500,
            'suscripciones' => [
                'Plan Básico' => $planBasico,
                'Plan Max' => $planMax,
                'Plan Premium' => $planPremium,
            ]
        ]);
    }
}
