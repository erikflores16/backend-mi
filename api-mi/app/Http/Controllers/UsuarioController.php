<?php

namespace App\Http\Controllers;

use App\Http\Requests\Usuario\UsuarioRequest;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    // Obtener todos los usuarios
    public function index()
    {
        // Obtener todos los usuarios (por ejemplo, con paginación si tienes muchos usuarios)
        $usuarios = Usuario::all();
        return response()->json(compact('usuarios'), 200);
    }

    // Crear un nuevo usuario
    public function store(UsuarioRequest $request)
    {
        // Crear el usuario, sin la contraseña 
        $usuario = Usuario::create($request->except('password'));
        return response()->json($usuario, 201);
    }

    // Obtener un usuario específico
    public function show($id)
    {
        // Buscar el usuario por su ID, si no existe devolver error 404
        $usuario = Usuario::findOrFail($id);
        return response()->json(compact('usuario'), 200);
    }

    // Actualizar un usuario
    public function update(UsuarioRequest $request, $id)
    {
        // Buscar el usuario y asegurarnos de que existe
        $usuario = Usuario::findOrFail($id);
        // Actualizar el usuario con los nuevos datos
        $usuario->update($request->except('password'));
        return response()->json(compact('usuario'), 200);
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        // Buscar el usuario y asegurarnos de que existe
        $usuario = Usuario::findOrFail($id);
        // Eliminar el usuario
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado'], 200);
    }
}
