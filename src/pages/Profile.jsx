import React, { useEffect, useState, useContext } from 'react';
import { Card, CardContent, CardActions, TextField, Button, Typography, Box, Avatar, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import icon from '../assets/icons&logos/avatardefault.webp'; 

import { useUser } from '../context/userContext.jsx'; // Asegúrate de que la ruta sea correcta
import { updateProfile } from '../apiService'; // Asegúrate de que la ruta sea correcta

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
      setLoading(false);
    } else {
      setError('No se ha encontrado información del usuario');
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Identificar campos modificados
      const updates = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== user[key] && formData[key] !== '') {
          updates[key] = formData[key];
        }
      });

      if (Object.keys(updates).length === 0) {
        setError('No hay cambios para guardar');
        setLoading(false);
        return;
      }

      const updatedUser = await updateProfile(updates);
      setUser(updatedUser);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2, mt: 10, borderRadius: 4, boxShadow: 6 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user.image || icon}
              sx={{ width: 100, height: 100, boxShadow: 3 }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                boxShadow: 10,
                backgroundColor: 'background.paper',
                '&:hover': { backgroundColor: 'background.default' },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h5" gutterBottom>
              Perfil de Usuario
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Actualiza tu información personal
            </Typography>
          </Box>
        </Box>

        <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            defaultValue={user.name || 'No disponible'}
          />
          <TextField
            fullWidth
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            defaultValue={user.email}
          />
          <TextField
            fullWidth
            label="Teléfono"
            variant="outlined"
            defaultValue={user.phone || 'No disponible'}
          />
          <TextField
            fullWidth
            label="Dirección"
            variant="outlined"
            defaultValue={user.address || 'No disponible'}
          />
        </Box>

        {user.created_at && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Registrado el: {new Date(user.created_at).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button 
          variant="contained" 
          fullWidth 
          size="large"
          sx={{ mt: 2 }}
        >
          Guardar Cambios
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;