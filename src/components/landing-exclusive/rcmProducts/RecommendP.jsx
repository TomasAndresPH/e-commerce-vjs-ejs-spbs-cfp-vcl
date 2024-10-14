import React from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import defaultProduct from '../../../assets/products/default.webp';

function RecommendedProducts() {
  // Aquí puedes agregar la lógica para obtener los productos recomendados
  // Por ahora, usaremos datos de ejemplo
  const recommendedProducts = [
    { name: 'Producto Recomendado 1', image: defaultProduct },
    { name: 'Producto Recomendado 2', image: defaultProduct },
    { name: 'Producto Recomendado 3', image: defaultProduct },
    { name: 'Producto Recomendado 4', image: defaultProduct },
  ];

  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Productos Recomendados para Ti
      </Typography>
      <Grid container spacing={4}>
        {recommendedProducts.map((product, index) => (
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
              <Button variant="contained" color="primary">
                Ver Detalles
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RecommendedProducts;