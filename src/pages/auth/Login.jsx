import React, { useState, useContext } from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import logo from '../../assets/logosintext.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/userContext.jsx';
//llamando al backend para el login
import { login as apiLogin } from '../../apiService';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin({ email, password });
      toast.success('Inicio de sesión exitoso');
      login(data.user);
      localStorage.setItem('userEmail', data.user.email);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      toast.error('Error en el inicio de sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Grid container spacing={4} sx={{ boxShadow: 10, borderRadius: 10, padding: 4 }}>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" justifyContent="center" height="100%">
            <Typography variant="h4" gutterBottom>Inicia Sesión 🙌</Typography>
            <TextField 
              fullWidth 
              label="Correo electrónico" 
              variant="outlined" 
              margin="normal" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField 
              fullWidth 
              label="Contraseña" 
              type="password" 
              variant="outlined" 
              margin="normal" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>Iniciar Sesión</Button>
            
            <Typography variant="body2" align="center">
              ¿Aún no tienes cuenta? <a href="/register">Regístrate aquí</a>
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default Login;

