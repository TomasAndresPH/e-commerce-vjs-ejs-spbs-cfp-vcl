import React, { useEffect, useState, useContext } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import { useUser } from '../context/userContext.jsx'; // Asegúrate de que la ruta sea correcta

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setError('No se ha encontrado información del usuario');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2, mt: 10, borderRadius: 4, boxShadow: 6 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user.image || "/api/placeholder/96/96"}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
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