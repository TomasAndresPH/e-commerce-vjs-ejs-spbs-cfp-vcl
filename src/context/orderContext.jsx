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

  const createOrder = async (orderData) => {  // Recibe directamente orderData
    try {
      const response = await apiCreateOrder(orderData);
      if (response.success && response.data) {
        setOrders(prev => [response.data, ...prev]);
        //clearCart();
        return response.data;
      }
    } catch (error) {
      console.error('Error en createOrder:', error);
      throw error;
    }
  };

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await getOrdersByCustomer(user.id);
      // Actualizar para manejar la nueva estructura de respuesta
      if (response.success && response.data) {
        setOrders(response.data);
      }
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