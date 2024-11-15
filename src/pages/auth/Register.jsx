import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Typography, Box, Link, FormHelperText } from '@mui/material';
import { toast } from 'sonner';

import { register } from '../../apiService';
import { useUser } from '../../context/userContext.jsx';
import logo from '../../assets/icons&logos/logosintext.webp';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // phone: '',
    // address: ''
  });
  const [errors, setErrors] = useState({});
  const { isRegistered, setIsRegistered } = useUser();
  const navigate = useNavigate();

  const validate = (fieldName, value) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'name':
        if (value.length < 2) {
          newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        } else if (value.length > 100) {
          newErrors.name = 'El nombre no puede exceder los 100 caracteres';
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.(cl|com|org)$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'Ingresa un email válido (ejemplo: usuario@dominio.cl)';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'password':
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(value)) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo (!@#$%^&*)';
        } else {
          delete newErrors.password;
        }
        break;
      
      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      
      // case 'phone':
      //   const phoneRegex = /^\+56[9]\d{8}$/;
      //   if (!phoneRegex.test(value)) {
      //     newErrors.phone = 'Ingresa un número válido (ejemplo: +56912345678)';
      //   } else {
      //     delete newErrors.phone;
      //   }
      //   break;w
      
      // case 'address':
      //   if (value.length < 6) {
      //     newErrors.address = 'La dirección debe tener al menos 6 caracteres';
      //   } else if (value.length > 255) {
      //     newErrors.address = 'La dirección no puede exceder los 255 caracteres';
      //   } else {
      //     delete newErrors.address;
      //   }
      //   break;
      
      // default:
      //   break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isValid = true;
    Object.keys(formData).forEach(key => {
      if (!validate(key, formData[key])) {
        isValid = false;
      }
    });
  
    if (!isValid) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }
  
    try {
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      if (!isRegistered) {
        toast.success('Registro exitoso. Por favor, inicia sesión.');
        navigate('/login', { state: { email: formData.email } });
        setTimeout(() => {toast.info('Por favor, inicia sesión con tu nueva cuenta.');}, 1000);
        setIsRegistered(true);  // Evitar duplicados
      }
    } catch (error) {
      if (error.details) {
        error.details.forEach(err => {
          setErrors(prev => ({
            ...prev,
            [err.field]: err.message
          }));
        });
        toast.error('Por favor, verifica los datos ingresados');
      }
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center', py: 4, pt: 12 }}>
      <Grid container spacing={4} sx={{ boxShadow: 10, borderRadius: 10, padding: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Regístrate 👋
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre Completo"
              name="name"
              margin="normal"
              required
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || "Ingresa tu nombre completo"}
              placeholder="Juan Pérez Silva"
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              margin="normal"
              required
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || "email@gmail.com"}
            />
            32232ASDADSAAsa!
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              margin="normal"
              required
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormHelperText>
              Debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo (!@#$%^&*)
            </FormHelperText>
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              name="confirmPassword"
              margin="normal"
              required
              variant="outlined"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            {/* <TextField
              fullWidth
              label="Teléfono"
              name="phone"
              margin="normal"
              required
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone || "Ej. válido: +56912345678"}
              placeholder="+56912345678"
            /> */}
            {/* <TextField
              fullWidth
              label="Dirección"
              name="address"
              margin="normal"
              required
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address || "Ingresa tu dirección completa"}
            /> */}
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
};

export default Register;