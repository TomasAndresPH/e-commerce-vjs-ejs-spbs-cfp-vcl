import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, TextField, Alert, Modal, Backdrop } from '@mui/material';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { useUser } from '../../context/userContext.jsx';
import { useCart } from '../../context/cartContext.jsx';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { user } = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(!user);
  const [countdown, setCountdown] = useState(10);
  const [openModal, setOpenModal] = useState(!user);

  useEffect(() => {
    if (!user) {
      setShowAlert(true);
      setOpenModal(true);
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        navigate('/login');
      }

      return () => clearInterval(timer);
    }
  }, [user, countdown, navigate]);

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
      <Typography variant="h2" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }} gutterBottom>
        Vamos a completar el pedido
      </Typography>
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
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={!user}>
                  Pagar
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '12px', display: 'flex', justifyContent: 'center', mt: 1 }} variant="body2" gutterBottom>
                Al hacer clic en "Pagar", acepta nuestros términos y condiciones.
              </Typography>
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }} gutterBottom>
                También puedes pagar con:
              </Typography>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {/* Modal para iniciar sesión */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          {/* Icono centrado y agrandado */}
          <RemoveShoppingCartOutlinedIcon 
            sx={{ fontSize: '6rem', color: 'primary.main', mb: 2 }} 
          />

          <Typography variant="h4" gutterBottom>Debes iniciar sesión para continuar</Typography>
          <Typography variant="body1" gutterBottom>
            Redirigiendo en {countdown} segundos...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Iniciar sesión
          </Button>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontSize: '0.875rem' }}>
            ¿No tienes cuenta?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size='small'
            sx={{
              fontSize: '0.75rem', // Tamaño de fuente más pequeño
              padding: '4px 8px', // Reducir padding
              minWidth: 'auto', // Quitar el ancho mínimo predeterminado
            }}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </Button> 
        </Box>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
