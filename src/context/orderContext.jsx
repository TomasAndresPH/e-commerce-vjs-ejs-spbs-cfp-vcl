import React, { createContext, useContext, useState, useCallback } from 'react';
import { useUser } from './userContext.jsx';
import { useCart } from './cartContext.jsx';
import { createOrder as apiCreateOrder, getOrdersByCustomer } from '../apiService';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const { clearCart } = useCart();

  const createOrder = async (cartItems) => {
    try {
      const orderData = {
        customer_id: user.id,
        items: cartItems
      };
      const newOrder = await apiCreateOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      clearCart();
      return newOrder;
    } catch (error) {
      console.error('Error en createOrder:', error);
      throw error;
    }
  };

  const fetchOrders = useCallback(async () => { // Usar useCallback aquí
    if (!user) return;
    
    try {
      const data = await getOrdersByCustomer(user.id);
      setOrders(data);
    } catch (error) {
      console.error('Error en fetchOrders:', error);
    }
  }, [user]); // Dependencia: el usuario

  return (
    <OrderContext.Provider value={{ orders, createOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };