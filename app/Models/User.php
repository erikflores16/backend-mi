<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    // Indica que la tabla se llama 'usuarios'
    protected $table = 'usuarios';

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // Campos ocultos al serializar
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Casts para atributos
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',  // Laravel hará el hash automáticamente
    ];

    /**
     * Obtener el identificador que se almacenará en el claim del JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Retorna un array con claims personalizados para el JWT.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
