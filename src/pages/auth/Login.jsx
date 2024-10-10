import React, { useState, useContext } from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import logo from '../../assets/logosintext.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useUser } from '../../context/userContext.jsx';
//llamando al backend para el login
import { login as apiLogin } from '../../apiService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useUser();

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
      
      setTimeout(() => navigate('/'), 1500);
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
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Grid container spacing={4} sx={{ boxShadow: 10, borderRadius: 10, padding: 4 }}>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" justifyContent="center" height="100%">
            <Typography variant="h4" gutterBottom>Inicia Sesión 🙌</Typography>
            <TextField 
              fullWidth 
              label="Correo electrónico" 
              name="email"
              variant="outlined" 
              margin="normal" 
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || "Ejemplo: email@gmail.cl"}
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
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
              Iniciar Sesión
            </Button>
            
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
    </Container>
  );
}

export default Login;

