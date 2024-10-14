import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from '../apiService';
import { useUser } from './userContext';
import { toast } from 'sonner';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useUser();

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

  // const loadLocalCart = () => {
  //   const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
  //   setCart(localCart);
  //   setIsLoading(false);
  // };

  const isCartFull = (currentCart, additionalQuantity = 0) => {
    const totalQuantity = currentCart.reduce((total, item) => total + item.quantity, 0) + additionalQuantity;
    return totalQuantity >= 10;
  };

  const addToCart = async (product) => {
    if (isCartFull(cart, 1)) {
      toast.error('El carrito está lleno. No se pueden agregar más productos.');
      return;
    }

    if (isAuthenticated) {
      try {
        await apiAddToCart(product.id, 1);
        await loadCart();
      } catch (error) {
        console.error('Error al añadir al carrito:', error);
        toast.error('Error al añadir al carrito');
      }
    } else {
      const localCart = [...cart];
      const existingItem = localCart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        localCart.push({ ...product, quantity: 1 });
      }
      setCart(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        await apiRemoveFromCart(productId);
        await loadCart();
      } catch (error) {
        console.error('Error al eliminar del carrito:', error);
      }
    } else {
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const currentItem = cart.find(item => item.id === productId);
    const quantityDifference = newQuantity - currentItem.quantity;
    
    if (isCartFull(cart, quantityDifference)) {
      toast.error('No se puede aumentar la cantidad. El carrito alcanzó el límite de 10 productos.');
      return;
    }

    if (isAuthenticated) {
      try {
        await updateCartItem(productId, newQuantity);
        await loadCart();
      } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
      }
    } else {
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await Promise.all(cart.map(item => apiRemoveFromCart(item.id)));
        setCart([]);
      } catch (error) {
        console.error('Error al limpiar el carrito:', error);
      }
    } else {
      setCart([]);
      localStorage.removeItem('cart');
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
        loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;