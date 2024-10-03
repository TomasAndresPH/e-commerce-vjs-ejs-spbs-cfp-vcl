import {React, useContext} from 'react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel'; // Asegúrate de instalar react-material-ui-carousel

// Componentes
import RecommendedProducts from '../components/rcmProducts/RecommendP';
import ChatBot from '../components/chatbot/ChatBot';
import { useUser } from '../context/userContext';

//visuals
import logoEco from '../assets/logoeco.png';
import slider1 from '../assets/carousel/slider1.png';
import slider2 from '../assets/carousel/slider2.png';
import slider3 from '../assets/carousel/slider3.png';
import slider4 from '../assets/carousel/slider4.png';
// Sección del Carrusel
function CarouselSection() {
  const items = [
    {
      image: logoEco,
    },
    {
      image: slider1,
    },
    {
      image: slider2,
    },
    {
      image: slider3,
    },
    {
      image: slider4,
    },
  ];

  return (
    <Box sx={{ mt: 10, mb: 8 }}>
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
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            {item.title && (
              <Typography 
                variant="h2" 
                component="div" 
                sx={{ 
                  textAlign: 'center',
                  p: 2, 
                  fontWeight: 'bold',
                  background: 'rgba(0, 0, 0, 0.8)', // Fondo semitransparente para el texto
                  borderRadius: '10px', // Borde redondeado para el fondo del texto
                }}
              >
                {item.title}
              </Typography>
            )}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}


function BuyOption() {
  return (
    <Container>
      <Box
        sx={{
          mt: 10,
          mb: 8,
          display: 'flex',         // Utiliza flexbox
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center',     // Centra verticalmente
          height: '1vh',          // Altura del viewport para centrar verticalmente
        }}
      >
        <Button variant="contained" color="primary" href="/products" sx={{
            padding: '20px 40px',       // Aumenta el padding para agrandar el botón
            fontSize: '24px',           // Aumenta el tamaño del texto del botón
            borderRadius: '8px',        // Cambia el radio del borde (opcional)
            boxShadow: 10,               // Añade sombra para resaltar el botón
            transition: 'transform 0.3s, background-color 0.3s', // Transiciones para hover
            '&:hover': {
              backgroundColor: '#388e3c', // Color de fondo en hover
              transform: 'scale(1.05)',   // Aumenta el tamaño en hover
            },
          }}
        >
          Compra aquí
        </Button>
      </Box>
    </Container>
  );
}

function MostVendidos() {
  // Array de productos más vendidos
  const mas_vendidos = [
    { name: 'Plasticos', image: 'https://s.alicdn.com/@sc04/kf/H5f546b8dfaf147fb9724db9aa84ebe767.jpg_300x300.jpg' },
    { name: 'Aluminios', image: 'https://distribuidoratodoinsumos.cl/wp-content/uploads/2023/05/ti-219.jpg' },
    { name: 'Papeleria', image: 'https://img.freepik.com/fotos-premium/utensilios-papel-ecologicos_89381-3383.jpg' },
    { name: 'Material', image: 'https://www.mallasyplasticos.com/227-large_default/film-polietileno-natural-g-400-rollos.jpg' },
  ];

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
                height: '100%', // Asegura que el contenedor ocupe el espacio completo
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
                  height: '200px', // Altura fija para las imágenes
                  objectFit: 'cover', // Ajusta la imagen sin distorsionarla
                  borderRadius: '8px',
                }}
              />
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Button variant="contained" color="primary">
                Ver
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
// Sección de Contacto y Cotización
function Contact() {
  return (
    <Box sx={{ backgroundColor: '#f4f4f4', py: 8, borderRadius: '20px' }}>
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
            <Typography variant="body1">Email: ventas@ecoplastics.cl</Typography>
            <Typography variant="body1">Tel. 1: 22 774 33 56</Typography>
            <Typography variant="body1">Tel. 2: 22 505 38 83</Typography>
            <Typography variant="body1">Dirección: Molina Lavín 01691, Quinta Normal, RM</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <img
                src="https://ecoplastics.store/wp-content/uploads/2022/09/logo_ecoplas_09-01.png"
                alt="Logo ecoplastics"
                style={{
                  maxWidth: '50%', // Hace que la imagen nunca sea más grande que su contenedor
                  height: 'auto', // Ajusta la altura automáticamente según el ancho
                  borderRadius: '8px',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Componente Principal de Landing Page
function LandingPage() {
  const { user } = useUser();
  return (
    <>
      <ChatBot />
      <CarouselSection />
      <BuyOption />
      {user && <RecommendedProducts />}
      <MostVendidos />
      <Contact />
    </>
  );
}

export default LandingPage;
