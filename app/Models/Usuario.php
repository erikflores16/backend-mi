<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    // Tabla que será utilizada
    protected $table = 'usuarios';

    // Campos asignables masivamente
    protected $fillable = [
        'nombre',
        'apellido',
        'email',
        'rol',
    ];

    // Campos ocultos en las respuestas JSON
    protected $hidden = [];

    // Relaciones
    public function suscripciones()
    {
        return $this->hasMany(SuscripcionUsuario::class, 'id_usuario');
    }

    public function respuestasFormulario()
    {
        return $this->hasMany(RespuestaFormulario::class, 'id_usuario');
    }

    public function actividades()
    {
        return $this->hasMany(HistorialActividad::class, 'id_usuario');
    }
}
