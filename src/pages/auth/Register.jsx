import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box, Link } from '@mui/material';

const Register = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: '80px' }}>
      <Grid container spacing={2}>
        {/* Columna izquierda: Formulario de registro */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Crear Cuenta
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
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="https://via.placeholder.com/400"
            alt="Imagen representativa de la empresa"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
