import React from 'react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel'; // Asegúrate de instalar react-material-ui-carousel

// Sección del Carrusel
function CarouselSection() {
  const items = [
    {
      image: 'https://via.placeholder.com/1600x600/ff7f7f/333333?text=Imagen+1',
      title: 'Bienvenidos a Nuestro E-commerce',
    },
    {
      image: 'https://via.placeholder.com/1600x600/7fbfff/333333?text=Imagen+2',
      title: 'Encuentra lo que necesitas',
    },
    {
      image: 'https://via.placeholder.com/1600x600/ffbf7f/333333?text=Imagen+3',
      title: 'Mejores Ofertas y Descuentos',
    },
  ];

  return (
    <Box sx={{ mt: 8, mb: 8 }}>
      <Carousel>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: '60vh',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <Typography variant="h3" component="div" sx={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.5)', p: 2 }}>
              {item.title}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

// Sección de Productos Más Vendidos
function BestSellersSection() {
  return (
    <Container sx={{ mb: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Productos Más Vendidos
      </Typography>
      <Grid container spacing={4}>
        {[1, 2, 3, 4].map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product}>
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
              }}
            >
              <img src={`https://via.placeholder.com/150`} alt={`Producto ${product}`} style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="h6" gutterBottom>
                Producto {product}
              </Typography>
              <Button variant="contained" color="primary">
                Comprar
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Sección de Contacto y Cotización
function ContactSection() {
  return (
    <Box sx={{ backgroundColor: '#f4f4f4', py: 8 }}>
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Contáctanos y Cotiza
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Nombre" variant="outlined" margin="normal" />
            <TextField fullWidth label="Email" variant="outlined" margin="normal" />
            <TextField fullWidth label="Mensaje" variant="outlined" multiline rows={4} margin="normal" />
            <Button variant="contained" color="primary" fullWidth>
              Enviar
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Información de Contacto
            </Typography>
            <Typography variant="body1">Email: contacto@ecommerce.com</Typography>
            <Typography variant="body1">Teléfono: +56 9 1234 5678</Typography>
            <Typography variant="body1">Dirección: Calle Falsa 123, Ciudad, País</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Componente Principal de Landing Page
function LandingPage() {
  return (
    <>
      <CarouselSection />
      <BestSellersSection />
      <ContactSection />
    </>
  );
}

export default LandingPage;
