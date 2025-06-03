<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log; // Asegúrate de importar la clase Log si no está importada

class WhatsappController extends Controller  
{
   public function escuchar(Request $request) {
        // Logueamos el contenido crudo del body
        $input = $request->getContent();
        Log::info('Webhook POST recibido: ' . $input);

        // Decodificamos json si es necesario
        $data = json_decode($input, true);

        // Logueamos la data decodificada
        Log::info($data);

        // Respuesta 200 OK para que el webhook no falle
        return response()->json(['status' => 'ok']);
    }


    function token() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (isset($_GET['hub_mode']) && isset($_GET['hub_verify_token']) && isset($_GET['hub_challenge']) && $_GET['hub_mode'] === 'subscribe' && $_GET['hub_verify_token'] === 'erik') {
                Log::info($_GET['hub_mode']);
                Log::info($_GET['hub_verify_token']);
                Log::info($_GET['hub_challenge']);
               
                echo $_GET['hub_challenge'];
            } else {
                http_response_code(403);
                Log::info('fallo...');
            }
        }
    }
}