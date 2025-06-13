<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialActividad extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_usuario', 
        'accion', 
        'tabla_objetivo', 
        'id_objetivo',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
