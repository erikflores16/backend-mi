<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use Illuminate\Support\Facades\Storage;

class PlanController extends Controller
{
    public function index()
    {
        return response()->json(Plan::all(), 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'string|max:255',
                'precio' => 'numeric|min:0',
                'descripcion' => 'string',
                'duracion_meses' => 'integer|min:1',
                'caracteristicas' => 'string',
            ]);

            $plan = Plan::create([
                'nombre' => $request->nombre,
                'precio' => $request->precio,
                'descripcion' => $request->descripcion,
                'duracion_meses' => $request->duracion_meses,
                'caracteristicas' => $request->caracteristicas,
            ]);

            return response()->json($plan, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error en la creación: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $plan = Plan::find($id);

        if (!$plan) {
            return response()->json(['message' => 'Plan no encontrado'], 404);
        }

        return response()->json($plan, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'string|max:255',
            'precio' => 'numeric|min:0',
            'descripcion' => 'string',
            'duracion_meses' => 'integer|min:1',
            'caracteristicas' => 'string',
        ]);

        $plan = Plan::find($id);

        if (!$plan) {
            return response()->json(['message' => 'Plan no encontrado'], 404);
        }

        $plan->update([
            'nombre' => $request->nombre,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion,
            'duracion_meses' => $request->duracion_meses,
            'caracteristicas' => $request->caracteristicas,
        ]);

        return response()->json($plan, 200);
    }

    public function destroy($id)
    {
        $plan = Plan::find($id);

        if (!$plan) {
            return response()->json(['message' => 'Plan no encontrado'], 404);
        }

        $plan->delete();

        return response()->json(['message' => 'Plan eliminado correctamente'], 200);
    }
}
