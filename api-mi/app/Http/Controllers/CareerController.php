<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Career;
use Illuminate\Support\Facades\Storage;

class CareerController extends Controller
{
    public function index()
    {
        return response()->json(Career::all(), 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'string|max:255',
                'duration' => 'string|max:255',
                'subjects' => 'string',
                'url' => 'nullable|url',
                'study_plan' => 'nullable|mimes:pdf|max:10240', // Asegurar que sea un PDF
            ]);

            // Subir archivo si existe
            $filePath = $request->hasFile('study_plan')
                ? $request->file('study_plan')->store('public/study_plans')
                : null;

            $career = Career::create([
                'name' => $request->name,
                'duration' => $request->duration,
                'subjects' => $request->subjects,
                'url' => $request->url,
                'study_plan' => $filePath,
            ]);

            return response()->json([
                'id' => $career->id,
                'name' => $career->name,
                'duration' => $career->duration,
                'subjects' => $career->subjects,
                'url' => $career->url,
                'study_plan_url' => $filePath ? asset(str_replace('public/', 'storage/', $filePath)) : null,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error en la creación: ' . $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Carrera no encontrada'], 404);
        }

        return response()->json($career, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|max:255',
            'duration' => 'string|max:255',
            'subjects' => 'string',
            'url' => 'nullable|url',
            'study_plan' => 'nullable|max:10240',
        ]);

        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Carrera no encontrada'], 404);
        }

        // Si hay un nuevo archivo PDF, lo subimos y actualizamos la ruta
        if ($request->hasFile('study_plan')) {
            // Eliminar el archivo anterior si existe
            if ($career->study_plan) {
                Storage::delete($career->study_plan);
            }

            $filePath = $request->file('study_plan')->store('public/study_plans');
        } else {
            $filePath = $career->study_plan; // Mantener el archivo actual si no se carga uno nuevo
        }

        // Actualizar la carrera
        $career->update([
            'name' => $request->name,
            'duration' => $request->duration,
            'subjects' => $request->subjects,
            'url' => $request->url,
            'study_plan' => $filePath,
        ]);

        return response()->json($career, 200);
    }

    public function destroy($id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Carrera no encontrada'], 404);
        }

        // Eliminar el archivo PDF si existe
        if ($career->study_plan) {
            Storage::delete($career->study_plan);
        }

        // Eliminar la carrera
        $career->delete();

        return response()->json(['message' => 'Carrera eliminada correctamente'], 200);
    }
}
