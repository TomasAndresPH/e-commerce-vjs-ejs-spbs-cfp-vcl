// src/apiService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Obtener la URL base desde las variables de entorno

// Función para obtener todos los productos
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

// Función para obtener un producto por ID
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
