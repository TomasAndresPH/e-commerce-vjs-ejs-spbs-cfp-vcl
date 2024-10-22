const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const WORKER_API_PRODUCTS = import.meta.env.VITE_WORKER_API_PRODUCTS;
const WORKER_API_AUTH = import.meta.env.VITE_WORKER_API_AUTH;
const WORKER_API_CART = import.meta.env.VITE_WORKER_API_CART;
const WORKER_API_ORDERS = import.meta.env.VITE_WORKER_API_ORDERS;

// Función utilitaria para obtener el token JWT almacenado
const getToken = () => localStorage.getItem('token');
const CACHE_KEY = 'cached_products';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

const handleApiError = (error, context) => {
  console.error(`Error en ${context}:`, error);
  throw new Error(`Error en ${context}: ${error.message}`);
};

const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleApiError(error, 'fetchWithErrorHandling');
  }
};

//Productos
//Obtener todos los productos, esto se usa en la pagina de productos
export const getAllProducts = async () => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION && Array.isArray(data)) {
        console.log('Returning cached products');
        return data;
      }
    }

    const products = await fetchWithErrorHandling(`${WORKER_API_PRODUCTS}/products`);
    
    if (!Array.isArray(products)) {
      throw new Error('La respuesta del servidor no es un array válido');
    }
    
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: products
    }));
    
    return products;
  } catch (error) {
    handleApiError(error, 'getAllProducts');
  }
};
//Obtener un producto en especifico, esto no se esta usando actualmente, pero lo dejo por si se necesita en un futuro cuando se habra un producto en especifico,
//esto no se si dejarlo asi ya que involucra dos llamados al backend, lo cual quizas no sea necesario, quizas sea mejor guardar los productos en una varaible
//para no llamar al backend tantas veces.
export const getProductById = async (id) => {
  try {
    const product = await fetchWithErrorHandling(`${WORKER_API_PRODUCTS}/products/${id}`);
    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    return product;
  } catch (error) {
    handleApiError(error, `getProductById para ID ${id}`);
  }
};
//Registro
export const register = async (userData) => {
  try {
    const response = await fetch(`${WORKER_API_AUTH}/auth/register`, {
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
//Login
export const login = async (credentials) => {
  try {
    const response = await fetch(`${WORKER_API_AUTH}/auth/login`, {
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

// Ordenes
export const createOrder = async (orderData) => {
  const token = getToken(); // Obtener el token JWT

  try {
    const response = await fetch(`${WORKER_API_ORDERS}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado de autorización
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
  const token = getToken(); // Obtener el token JWT
  try {
    const response = await fetch(`${WORKER_API_ORDERS}/order/customer/${customerId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado de autorización
        'Content-Type': 'application/json',
      },
    });
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
  const token = getToken(); // Obtener el token JWT

  try {
    const response = await fetch(`${WORKER_API_ORDERS}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado de autorización
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener la orden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getOrderById:', error);
    throw error;
  }
};


//Carrito
export const getCart = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${WORKER_API_CART}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener el carrito');
    }

    const cartItems = await response.json();
    console.log('Carrito:', cartItems); // Agrega esta línea para depurar
    return cartItems;

  } catch (error) {
    console.error('Error en getCart:', error);
    throw error;
  }
};

export const addToCart = async (productoId, cantidad) => {
  const token = getToken();
  try {
    const response = await fetch(`${WORKER_API_CART}/cart/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productoId, cantidad }),
    });
    if (!response.ok) {
      throw new Error('Error al añadir al carrito');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en addToCart:', error);
    throw error;
  }
};

export const updateCartItem = async (productoId, cantidad) => {
  const token = getToken();
  try {
    const response = await fetch(`${WORKER_API_CART}/cart/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productoId, cantidad }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el carrito');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en updateCartItem:', error);
    throw error;
  }
};

export const removeFromCart = async (productoId) => {
  const token = getToken();
  try {
    const response = await fetch(`${WORKER_API_CART}/cart/remove/${productoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al eliminar del carrito');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en removeFromCart:', error);
    throw error;
  }
};