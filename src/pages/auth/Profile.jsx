import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { UserContext } from './context/userContext.jsx'; // Asegúrate de que la ruta sea correcta

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

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
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Nombre: {user.name || 'No disponible'}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Teléfono: {user.phone || 'No disponible'}</Typography>
        <Typography variant="h6">Dirección: {user.address || 'No disponible'}</Typography>
        {user.created_at && (
          <Typography variant="body2" color="text.secondary">
            Registrado en: {new Date(user.created_at).toLocaleDateString()}
          </Typography>
        )}
      </Box>
      <Button variant="outlined" color="primary" onClick={() => { /* Aquí puedes agregar lógica para editar el perfil */ }}>
        Editar Perfil
      </Button>
    </Container>
  );
};

export default Profile;