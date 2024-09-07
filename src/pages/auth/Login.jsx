import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import logo from '../../assets/logosintext.png';
function Login() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Grid container spacing={4} sx={{ boxShadow: 10, borderRadius: 10, padding: 4 }}>
        {/* Columna izquierda: Formulario de login */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
            <Typography variant="h4" gutterBottom>Inicia Sesión 🙌</Typography>
            <TextField fullWidth label="Correo electrónico" variant="outlined" margin="normal" />
            <TextField fullWidth label="Contraseña" type="password" variant="outlined" margin="normal" />
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>Iniciar Sesión</Button>
            
            {/* Pregunta para registro */}
            <Typography variant="body2" align="center">
              ¿Aún no tienes cuenta? <a href="/register">Regístrate aquí</a>
            </Typography>
          </Box>
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
}

export default Login;

