import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box, Link } from '@mui/material';
import logo from '../../assets/logosintext.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//uso del backend
import { register } from '../../apiService';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      toast.error('Las contaseñas no coinciden');
      return;
    }
    try {
      const data = await register({ name, email, password, phone, address });
      console.log('Registro exitoso:', data);
      toast.success('Registro exitoso');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      toast.error('Error en el proceso de registro. Por favor, intenta de nuevo.');
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Grid container spacing={4} sx={{ boxShadow: 10, borderRadius: 10, padding: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Regístrate 👋
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre Completo"
              margin="normal"
              required
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              margin="normal"
              required
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Contraseña"
              margin="normal"
              required
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              margin="normal"
              required
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Teléfono"
              margin="normal"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              fullWidth
              label="Dirección"
              margin="normal"
              variant="outlined"
              multiline
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              type="submit"
            >
              Registrarse
            </Button>
          </Box>

          <Typography sx={{ mt: 2 }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" underline="hover">
              Inicia sesión aquí
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundImage:  `url(${logo})`, //antes era 'url(https://source.unsplash.com/random)'
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
};

export default Register;
