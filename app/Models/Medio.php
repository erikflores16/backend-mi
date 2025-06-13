<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medio extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo', 
        'url', 
        'tabla_asociada', 
        'id_asociado',
    ];
}
