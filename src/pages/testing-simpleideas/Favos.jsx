import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const Favs = ({ products }) => {
  return (
    <Box
      sx={{
        padding: '50px 250px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" sx={{ color: '#4c064a', marginBottom: '20px', textAlign: 'center' }}>
        Productos Favoritos
      </Typography>
      
      <Grid container spacing={1} justifyContent="center">
        {products.map((product, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            key={index}
            sx={{ display: 'flex', justifyContent: 'center', margin: 0 }}
          >
            <Card sx={{ maxWidth: 180, width: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image || 'defaultImage.jpg'} // Cambia esto a la ruta de la imagen por defecto
                alt={product.name}
              />
              <CardContent sx={{ textAlign: 'center', padding: '8px' }}>
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default Favs;