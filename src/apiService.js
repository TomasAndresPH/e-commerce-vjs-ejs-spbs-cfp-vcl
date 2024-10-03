const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//Obtener todos los productos, esto se usa en la pagina de productos
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getAllProducts:', error);
    throw error;
  }
};
//Obtener un producto en especifico, esto no se esta usando actualmente, pero lo dejo por si se necesita en un futuro cuando se habra un producto en especifico,
//esto no se si dejarlo asi ya que involucra dos llamados al backend, lo cual quizas no sea necesario, quizas sea mejor guardar los productos en una varaible
//para no llamar al backend tantas veces.
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getProductById:', error);
    throw error;
  }
};
//componente clave para la fase de registros
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en el registro');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en register:', error);
    throw error;
  }
};
//componente clave para la fase de login
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en el inicio de sesión');
    }

    if (!data.user) {
      throw new Error('Respuesta de login inválida: no se recibieron datos de usuario');
    }

    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Nuevas funciones para órdenes
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la orden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en createOrder:', error);
    throw error;
  }
};

export const getOrdersByCustomer = async (customerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/customer/${customerId}`);
    if (!response.ok) {
      throw new Error('Error al obtener las órdenes del cliente');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getOrdersByCustomer:', error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Error al obtener la orden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getOrderById:', error);
    throw error;
  }
};
