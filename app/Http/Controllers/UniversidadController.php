<?php

namespace App\Http\Controllers;

use App\Http\Requests\Universidad\UniversidadRequest; 
use App\Models\Universidad;
use Illuminate\Http\Request;

class UniversidadController extends Controller
{
    // Obtener todas las universidades
    public function index()
    {
        $universidades = Universidad::all();
        return response()->json(compact('universidades'), 200);
    }

    // Crear una nueva universidad
    public function store(UniversidadRequest $request) // Usamos el request aquí
    {
        // Los datos ya están validados por el UniversidadRequest
        $universidad = Universidad::create($request->validated()); // Usamos validated() para obtener solo los datos validados
        return response()->json(compact('universidad'), 201);
    }

    // Obtener una universidad específica
    public function show($id)
    {
        $universidad = Universidad::findOrFail($id);
        return response()->json(compact('universidad'), 200);
    }

    // Actualizar una universidad existente
    public function update(UniversidadRequest $request, $id) 
    {
        $universidad = Universidad::findOrFail($id);
        // Los datos ya están validados por el UniversidadRequest
        $universidad->update($request->validated());
        return response()->json(compact('universidad'), 200);
    }

    // Eliminar una universidad
    public function destroy($id)
    {
        $universidad = Universidad::findOrFail($id);
        $universidad->delete();
        return response()->json(['message' => 'Universidad eliminada'], 200);
    }
}
