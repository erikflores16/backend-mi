<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespuestaFormulario extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_usuario', 
        'id_formulario', 
        'respuesta',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function formulario()
    {
        return $this->belongsTo(Formulario::class);
    }
}
