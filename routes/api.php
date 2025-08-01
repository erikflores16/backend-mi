<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UniversidadController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\PlanController;
use App\Models\User;

Route::get('/usuarios', function () {
    return response()->json(User::all());
});
// Comenta o elimina esta línea y ruta si no tienes DashboardController aún
// use App\Http\Controllers\DashboardController;
// Route::get('/dashboard-data', [DashboardController::class, 'getDashboardData']);

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Rutas públicas
Route::get('/study-plans', [PlanController::class, 'index']);
Route::post('/study-plans', [PlanController::class, 'store']);
Route::get('/study-plans/{id}', [PlanController::class, 'show']);
Route::post('/study-plans/{id}', [PlanController::class, 'update']);
Route::delete('/study-plans/{id}', [PlanController::class, 'destroy']);

use App\Http\Controllers\PaymentController;

Route::middleware('auth:sanctum')->post('/payments', [PaymentController::class, 'process']);

Route::prefix('careers')->group(function () {
    Route::get('/', [CareerController::class, 'index']);
    Route::post('/', [CareerController::class, 'store']);
    Route::get('/{id}', [CareerController::class, 'show']);
    Route::post('/{id}', [CareerController::class, 'update']);
    Route::delete('/{id}', [CareerController::class, 'destroy']);
});

// Rutas protegidas con JWT
Route::middleware(['jwt.verify'])->group(function () {
    Route::get('users', [UserController::class, 'index']);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('usuarios', [UsuarioController::class, 'index']);
    Route::post('usuarios', [UsuarioController::class, 'store']);
    Route::get('usuarios/{id}', [UsuarioController::class, 'show']);
    Route::post('usuarios/{id}', [UsuarioController::class, 'update']);
    Route::delete('usuarios/{id}', [UsuarioController::class, 'destroy']);

    Route::get('universidades', [UniversidadController::class, 'index']);
    Route::post('universidades', [UniversidadController::class, 'store']);
    Route::get('universidades/{id}', [UniversidadController::class, 'show']);
    Route::post('universidades/{id}', [UniversidadController::class, 'update']);
    Route::delete('universidades/{id}', [UniversidadController::class, 'destroy']);
});
