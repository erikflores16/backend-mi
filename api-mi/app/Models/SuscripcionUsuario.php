<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuscripcionUsuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_usuario', 
        'id_suscripcion', 
        'fecha_inicio', 
        'fecha_fin',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function suscripcion()
    {
        return $this->belongsTo(Suscripcion::class);
    }
}
