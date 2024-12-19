import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useUser } from '../../context/userContext.jsx';
import { useCart } from '../../context/cartContext.jsx';
import { login as apiLogin, addToCart } from '../../apiService';
import logo from '../../assets/icons&logos/logosintext.webp';
import { toast } from 'sonner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const { clearCart, loadCart } = useCart();

  useEffect(() => {
    if (location.state && location.state.email) {
      setFormData(prev => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const validate = (fieldName, value) => {
    const newErrors = { ...errors };
    
    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.(cl|com|org)$/;
      if (!emailRegex.test(value)) {
        newErrors.email = 'Ingresa un email válido (ejemplo: email@gmail.cl)';
      } else {
        delete newErrors.email;
      }
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin(formData);
      toast.success('Inicio de sesión exitoso');
      
      localStorage.setItem('token', data.token);
      login(data.user);
      localStorage.setItem('userEmail', data.user.email);

      if (data.user.id === 44) {
        navigate('/view');
        return;
      }
      
      // Transferir productos del localStorage al carrito del usuario
      // Transferir productos del localStorage al carrito del usuario
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      let transferErrors = [];

      for (const item of localCart) {
        try {
          await addToCart(item.id, item.quantity);
          //toast.info(`Producto ${item.id} agregado al carrito`);
        } catch (error) {
          console.error(`Error al agregar el producto ${item.id} al carrito:`, error);
          transferErrors.push(item.id);
          //toast.error(`Error al agregar el producto ${item.id} al carrito`);
        }
      }

      if (transferErrors.length > 0) {
        toast.warning(`No se pudieron transferir algunos productos (IDs: ${transferErrors.join(', ')}) al carrito. Por favor, inténtalo de nuevo más tarde.`);
      } else if (localCart.length > 0) {
        toast.success('Carrito actualizado');
      }
      
      localStorage.removeItem('cart');
      clearCart(); // Limpiar el contexto del carrito local
      
      // Redireccionar al home
      navigate('/');

      setTimeout(() => loadCart(), 1500);
    } catch (error) {
      if (error.details) {
        error.details.forEach(err => {
          setErrors(prev => ({
            ...prev,
            [err.field]: err.message
          }));
        });
        toast.error('Por favor, verifica tus credenciales');
      } else {
        toast.error('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      }
    }
  };



  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
        marginTop: { xs: 9, md: 0 },
        marginBottom: { xs: 3, md: 0 }, // Add margin for smaller screens
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          boxShadow: 10,
          borderRadius: 10,
          padding: 4,
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="h4" gutterBottom>
              Inicia Sesión 🙌
            </Typography>
            <TextField
              fullWidth
              label="Correo electrónico"
              name="email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || 'Ejemplo: email@gmail.cl'}
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 1 }}
            >
              Iniciar Sesión
            </Button>

            <Typography align="center">
              ¿No tienes cuenta? 
                <Link sx={{ml: 0.5}} href="/register" underline="hover">
                  Regístrate aquí
                </Link>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '100%',
              borderRadius: 10,
              minHeight: 300,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;

