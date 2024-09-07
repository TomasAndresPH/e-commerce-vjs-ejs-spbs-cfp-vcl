import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box, Link } from '@mui/material';
import logo from '../../assets/logosintext.png';
const Register = () => {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Grid container spacing={4} sx={{ boxShadow: 10, borderRadius: 10, padding: 4 }}>
        {/* Columna izquierda: Formulario de registro */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Registrate 👋
          </Typography>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre Completo"
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              margin="normal"
              required
              variant="outlined"
              type="email"
            />
            <TextField
              fullWidth
              label="Contraseña"
              margin="normal"
              required
              variant="outlined"
              type="password"
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              margin="normal"
              required
              variant="outlined"
              type="password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Registrarse
            </Button>
          </Box>

          {/* Enlace para redirigir al login */}
          <Typography sx={{ mt: 2 }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" underline="hover">
              Inicia sesión aquí
            </Link>
          </Typography>
        </Grid>

        {/* Columna derecha: Imagen representativa */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundImage: `url(${logo})`,  // Corrección aquí: `url()` con template literals
              backgroundSize: 'contain',        // Cambia a 'contain' o 'cover' según tu preferencia
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',    // Añadido para evitar repeticiones
              height: '100%',                   // Mantén la altura completa del contenedor
              borderRadius: 10,
              minHeight: 300,                   // Añadido para asegurar que siempre tenga una altura mínima
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
