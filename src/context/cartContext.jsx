import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from '../apiService';
import { useUser } from './userContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useUser(); // Obtener el estado de autenticación

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      await apiAddToCart(product.id, 1);
      await loadCart(); // Recargar el carrito después de añadir
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await apiRemoveFromCart(productId);
      await loadCart(); // Recargar el carrito después de eliminar
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await updateCartItem(productId, quantity);
      await loadCart(); // Recargar el carrito después de actualizar
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
    }
  };

  const clearCart = async () => {
    try {
      // Eliminar cada item del carrito
      await Promise.all(cart.map(item => apiRemoveFromCart(item.id)));
      setCart([]);
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;