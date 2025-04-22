import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MostVendidos() {
  const navigate = useNavigate();

  // Array de productos más vendidos con sus IDs de categoría
  const mas_vendidos = [
    { name: 'Plasticos', image: 'https://s.alicdn.com/@sc04/kf/H5f546b8dfaf147fb9724db9aa84ebe767.jpg_300x300.jpg', categoryId: 1 },
    { name: 'Aluminios', image: 'https://img.freepik.com/foto-gratis/brochetas-pollo-alto-angulo-bandeja-pimiento-rojo-tomates-cherry_23-2148699096.jpg', categoryId: 2 },
    { name: 'Papeleria', image: 'https://img.freepik.com/fotos-premium/utensilios-papel-ecologicos_89381-3383.jpg', categoryId: 3 },
    { name: 'Material', image: 'https://www.mallasyplasticos.com/227-large_default/film-polietileno-natural-g-400-rollos.jpg', categoryId: 4 },
  ];

  const handleViewCategory = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <Container sx={{ mb: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Productos Más Vendidos
      </Typography>
      <Grid container spacing={4}>
        {mas_vendidos.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewCategory(product.categoryId)}
              >
                Ver
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MostVendidos;
