import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, TextField, Alert } from '@mui/material';
import { useUser } from '../context/userContext.jsx';
import { useCart } from '../context/cartContext.jsx';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { user } = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(!user);

  useEffect(() => {
    if (!user) {
      setShowAlert(true);
    }
  }, [user]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para procesar el pago
    console.log('Procesando pago...');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      {showAlert && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Necesitas estar logueado para proceder al proceso de pago.
        </Alert>
      )}
      <Typography variant="h2" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }} gutterBottom>Vamos a completar el pedido</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Resumen del Pedido</Typography>
          {cart.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography>{item.name} x {item.quantity}</Typography>
              <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Información de Pago</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Nombre en la tarjeta" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Número de tarjeta" required />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Fecha de expiración" required />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="CVV" required />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  disabled={!user}
                >
                  Pagar
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{"fontSize": "12px", display: 'flex', justifyContent:'center', mt: 1}} variant="body2" gutterBottom>
                Al hacer clic en "Pagar", acepta nuestros términos y condiciones.
              </Typography>
              <Typography variant="h6" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2}} gutterBottom>
                Tambien puedes pagar con:
              </Typography>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;