export class Api {
  static baseUrl = "http://127.0.0.1:8000/api/";

  static async post(url, data) {
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }
}

/*Cómo utilizarlo:
Para utilizar esta clase en React, en cualquier componente, se hace de la siguiente manera:

import { Api } from '../services/Api';

const submitData = async () => {
  try {
    const response = await Api.post('endpoint', { name: 'John Doe' });
    console.log(response.statusCode);  // Código de estado HTTP
    console.log(response.data);  // Los datos de la respuesta
  } catch (error) {
    console.error('Error:', error);
  }
};

Resumen:
El código de la clase Api está correcto.
El uso de fetch con async/await y el manejo adecuado de la respuesta en formato JSON también es correcto.
La importación de la clase Api en un componente de React también es adecuada.
*/
