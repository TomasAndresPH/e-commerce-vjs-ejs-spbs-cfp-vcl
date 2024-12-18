import React, { useMemo, useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Para la navegación
import defaultProduct from '../../../assets/products/default.webp';
import img_product1 from '../../../assets/products/1.webp';
import img_product2 from '../../../assets/products/2.webp';
import img_product3 from '../../../assets/products/3.webp';
import img_product4 from '../../../assets/products/4.webp';
import img_product5 from '../../../assets/products/5.webp';
import img_product6 from '../../../assets/products/6.webp';
import img_product7 from '../../../assets/products/7.webp';
import img_product8 from '../../../assets/products/8.webp';
import img_product9 from '../../../assets/products/9.webp';
import img_product10 from '../../../assets/products/10.webp';

// Mapeo de imágenes de productos
const productImages = [
  img_product1,
  img_product2,
  img_product3,
  img_product4,
  img_product5,
  img_product6,
  img_product7,
  img_product8,
  img_product9,
  img_product10,
];

function RecommendedProducts() {
  const navigate = useNavigate();

  // Estado para manejar el índice de las imágenes
  const [currentImages, setCurrentImages] = useState([0, 1, 2, 3]);

  // Generar productos recomendados aleatoriamente
  const recommendedProducts = useMemo(() => {
    const shuffled = productImages
      .map((image) => ({ image, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 4) // Selecciona 4 productos al azar
      .map((item, index) => ({
        name: '',
        image: item.image,
      }));
    return shuffled;
  }, []);

  // Cambiar imágenes cada 3 segundos
  useEffect(() => {
    // Cambiar las imágenes cada 3 segundos
    const interval = setInterval(() => {
      setCurrentImages((prevImages) =>
        prevImages.map((index) => (index + 1) % productImages.length)
      );
    }, 3000);

    return () => clearInterval(interval); // Limpieza del intervalo
  }, []);

  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Productos Recomendados para Ti
      </Typography>
      <Grid container spacing={4}>
        {currentImages.map((imageIndex, cardIndex) => (
          <Grid item xs={12} sm={6} md={3} key={cardIndex}>
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
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  position: 'relative',
                }}
              >
                <img
                  src={productImages[imageIndex] || defaultProduct}
                  alt={`Producto ${cardIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 1s ease-in-out',
                  }}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/products')}
              >
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

