import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';

function Login() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Grid container spacing={4} sx={{ boxShadow: 3, borderRadius: 2, padding: 4 }}>
        {/* Columna izquierda: Formulario de login */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
            <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
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
              backgroundImage: 'url(https://via.placeholder.com/500)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
