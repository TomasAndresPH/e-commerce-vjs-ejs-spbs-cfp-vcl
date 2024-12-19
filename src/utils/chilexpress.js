export const fetchShippingRates = async (destinationCountyCode) => {
    const API_URL = 'http://testservices.wschilexpress.com/rating/api/v1.0/rates/courier';
    const API_KEY = import.meta.env.VITE_SUBSCRIPTION_KEY_CX; // Reemplaza por la clave correcta si cambia
  
    // Datos de ejemplo para el paquete
    const requestBody = {
      originCountyCode: 'STGO', // Código fijo de origen (Santiago)
      destinationCountyCode,    // Código dinámico basado en la comuna del usuario
      package: {
        weight: '5',           // Peso fijo del paquete
        height: '1',
        width: '1',
        length: '1'
      },
      productType: 3,            // Producto fijo
      contentType: 2,            // Tipo de contenido fijo
      declaredWorth: '3000',     // Valor declarado del paquete
      deliveryTime: 3           // Tiempo estimado de entrega
    };
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Ocp-Apim-Subscription-Key': API_KEY
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`Error en la API de Chilexpress: ${response.statusText}`);
      }
  
      const data = await response.json();
      const serviceOptions = data?.data?.courierServiceOptions || [];
  
      if (serviceOptions.length === 0) {
        throw new Error('No se encontraron opciones de envío disponibles.');
      }
  
      // Retorna el valor del servicio más económico
      const { serviceValue } = serviceOptions[0];
      console.log(`Precio de envío desde la API: $${serviceValue}`);
      return { serviceValue };
    } catch (error) {
      console.error('Error al obtener tarifas de envío:', error);
      throw error; // Propaga el error para manejarlo donde se llame
    }
  };