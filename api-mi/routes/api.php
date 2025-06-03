<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UniversidadController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\PlanController;


/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
use App\Http\Controllers\DashboardController;

Route::get('/dashboard-data', [DashboardController::class, 'getDashboardData']);

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});


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


// Rutas protegidas
Route::middleware(['jwt.verify'])->group(function () {
    Route::get('users', [UserController::class, 'index']);

    // Ruta para cerrar sesión
    Route::post('logout', [AuthController::class, 'logout']);

    // Rutas de usuarios
    Route::get('usuarios', [UsuarioController::class, 'index']);
    Route::post('usuarios', [UsuarioController::class, 'store']);
    Route::get('usuarios/{id}', [UsuarioController::class, 'show']);
    Route::post('usuarios/{id}', [UsuarioController::class, 'update']);
    Route::delete('usuarios/{id}', [UsuarioController::class, 'destroy']);

    // Rutas de universidades
    Route::get('universidades', [UniversidadController::class, 'index']);
    Route::post('universidades', [UniversidadController::class, 'store']);
    Route::get('universidades/{id}', [UniversidadController::class, 'show']);
    Route::post('universidades/{id}', [UniversidadController::class, 'update']);
    Route::delete('universidades/{id}', [UniversidadController::class, 'destroy']);
});
