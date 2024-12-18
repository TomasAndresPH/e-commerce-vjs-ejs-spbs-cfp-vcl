import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateOrderStatus } from '../../apiService';
import { useCart } from '../../context/cartContext';
import { Container, Typography, Box, Button, Alert } from '@mui/material';

const Shipping = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');
  const { clearCart } = useCart();

  useEffect(() => {
    const processTransaction = async () => {
      const params = new URLSearchParams(window.location.search);
      const transactionStatus = params.get('status');
      const orderId = params.get('order_id');

      try {

        clearCart(); // Limpiar el carrito antes de actualizar el estado de la orden

        if (transactionStatus === 'success' && orderId) {
          setStatus('success');
          clearCart(); // Limpiar el carrito después de un pago exitoso
          await updateOrderStatus(orderId, 2);
        } else if (transactionStatus === 'failed') {
          setStatus('failed');
          setError('La transacción no fue autorizada');
        } else {
          setStatus('error');
          setError('Error en el proceso de pago');
        }
      } catch (error) {
        console.error('Error al procesar la transacción:', error);
        setStatus('error');
        setError('Error al procesar la transacción');
      }
    };

    processTransaction();
  }, [navigate]);

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <Box textAlign="center" mt={4}>
            <Typography variant="h4" color="success.main" gutterBottom>
              ¡Pago Exitoso!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Tu orden ha sido procesada correctamente.
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/orders')}
                sx={{ mx: 1 }}
              >
                Ver Mis Órdenes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/')}
                sx={{ mx: 1 }}
              >
                Volver al Inicio
              </Button>
            </Box>
          </Box>
        );

      case 'failed':
        return (
          <Box textAlign="center" mt={4}>
            <Alert severity="error">{error}</Alert>
            <Typography variant="h5" color="error" gutterBottom>
              Pago No Autorizado
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/cart')}
              >
                Volver al Carrito
              </Button>
            </Box>
          </Box>
        );

      case 'error':
        return (
          <Box textAlign="center" mt={4}>
            <Alert severity="error">{error}</Alert>
            <Typography variant="h5" color="error" gutterBottom>
              Error en el Proceso
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/cart')}
              >
                Volver al Carrito
              </Button>
            </Box>
          </Box>
        );


      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Estado de la Transacción
      </Typography>
      {renderContent()}
    </Container>
  );
};

export default Shipping;
