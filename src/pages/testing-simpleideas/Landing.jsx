import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, Box, Grid, Container } from '@mui/material';
import { ShoppingCart, Search } from '@mui/icons-material';
import { Instagram } from '@mui/icons-material';

import bg from '../../assets/test/pk.webp'; // Cambia la ruta según corresponda
import terceraBig from '../../assets/test/bg.webp'; // Cambia la ruta según corresponda
import promoImage from '../../assets/test/promoImage.webp'; // Cambia esta URL por la imagen de la promoción
import simpleideas from '../../assets/test/navbar.webp';
import tuSegundaImagen from '../../assets/test/second.webp'; // Cambia la ruta según corresponda
import promoImage2 from '../../assets/test/promo.webp'; // Cambia esta URL por la imagen de la promoción
import Favs from './Favos';
import logoImage from '../../assets/test/logo.webp'; // Cambia la ruta por la imagen de tu logo

import post1 from '../../assets/test/post1.webp'; // Cambia la ruta por la imagen de tu publicación
import post2 from '../../assets/test/post2.webp'; // Cambia la ruta por la imagen de tu publicación
import post3 from '../../assets/test/post3.webp'; // Cambia la ruta por la imagen de tu publicación

const products = [
    {
      id: 1,
      name: 'Producto 1',
      price: 19.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 29.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 39.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 4,
      name: 'Producto 4',
      price: 49.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 5,
      name: 'Producto 5',
      price: 59.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 6,
      name: 'Producto 6',
      price: 69.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 7,
      name: 'Producto 7',
      price: 79.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 8,
      name: 'Producto 8',
      price: 89.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 9,
      name: 'Producto 9',
      price: 99.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 10,
      name: 'Producto 10',
      price: 109.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 11,
      name: 'Producto 11',
      price: 119.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
    {
      id: 12,
      name: 'Producto 12',
      price: 129.99,
      image: promoImage, // Reemplaza con la ruta de la imagen real
    },
  ];
const Landing = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getOpacity = () => {
    if (scrollPosition < 50) return 0; // Navbar transparente al inicio
    if (scrollPosition < 200) return scrollPosition / 200;
    return 1;
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: `rgba(54, 3, 53, ${getOpacity()})`,
          transition: 'background-color 0.3s ease',
          boxShadow: 'none',
          zIndex: 10,
        }}
      >
        <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button href="/" disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
            <img
              src={simpleideas} // Cambia la ruta de la imagen
              alt="Logo de la tienda"
              style={{ height: '50px', objectFit: 'contain', padding: 10 }} // Ajusta el tamaño según sea necesario
            />
          </Button>
        </Box>


          {/* Search Icon */}
          <IconButton sx={{ color: '#ffffff' }}>
            <Search />
          </IconButton>

          {/* Cart Icon */}
          <IconButton sx={{ color: '#ffffff' }}>
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Links */}
          <Button sx={{ color: '#ffffff' }} href="/blog">Sobre mí</Button>
          <Button sx={{ color: '#ffffff' }} href="/preventa">Preventa</Button>
          <Button sx={{ color: '#ffffff' }} href="/disponibles">En Stock</Button>
          <Button sx={{ color: '#ffffff' }} href="/patrones-digitales">Patrones digitales</Button>
        </Toolbar>
      </AppBar>

      {/* Full screen image */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Aquí puedes agregar más contenido si lo deseas */}
      </Box>

      {/* Promo Section */}
      {/* Promo Section */}
      <Box
        sx={{
          padding: '50px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Imagen Cuadrada a la Izquierda */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={promoImage}
              alt="Promoción"
              sx={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'flex',
                margin: '0 auto',
              }}
            />
          </Grid>

          {/* Texto Promocional a la Derecha */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ color: '#4c064a', marginBottom: '20px' }}>
              ¡No te pierdas esta increíble oferta!
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '30px' }}>
              Descubre nuestros productos de calidad con precios exclusivos. ¡No dejes pasar esta oportunidad!
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#4c064a',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#3a053a',
                },
              }}
            >
              Lo quiero
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Segunda Imagen Gigante */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${tuSegundaImagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Aquí puedes agregar más contenido si lo deseas */}
      </Box>
      {/* Nueva Promo Section Invertida */}
      <Box
        sx={{
          padding: '50px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Grid container spacing={0} alignItems="center">
          {/* Texto Promocional a la Izquierda */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ color: '#4c064a', marginBottom: '20px', marginLeft: '300px' }}>
              ¡Aprovecha nuestras nuevas ofertas!
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '30px', marginLeft: '310px'  }}>
              Encuentra lo mejor en calidad y precios. ¡No dejes pasar esta oportunidad!
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginLeft: '515px',
                backgroundColor: '#4c064a',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#3a053a',
                },
              }}
            >
              Lo quiero
            </Button>
          </Grid>

          {/* Imagen Cuadrada a la Derecha */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={promoImage2} // Cambia esta ruta por la imagen correspondiente
              alt="Promoción"
              sx={{
                width: '100%', // Ajusta el ancho de la imagen
                maxWidth: '400px', // Ancho máximo para mantener proporciones
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </Grid>
        </Grid>
      </Box>
          
        {/* Productos Favoritos */}
      <Favs products={products} />
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${terceraBig})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Aquí puedes agregar más contenido si lo deseas */}
      </Box>
      {/* Instagram Section */}
      <Box sx={{ padding: '50px 20px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" sx={{ color: '#4c064a', textAlign: 'center', marginBottom: '30px' }}>
        Síguenos en Instagram
      </Typography>
      <Grid container spacing={0} justifyContent="center">
        {/* Reemplaza estas imágenes con enlaces a tus publicaciones de Instagram */}
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Box
            component="a"
            href="https://www.instagram.com/p/C38hECIx6rR/" // Reemplaza con el enlace a tu publicación
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex' }}
          >
            <Box
              component="img"
              src={post1} // Reemplaza con la imagen de tu publicación
              alt="Instagram post 1"
              sx={{ width: '80%', height: '500px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto' }} // Tamaño fijo con objectFit y centrado
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Box
            component="a"
            href="https://www.instagram.com/yourpost2" // Reemplaza con el enlace a tu publicación
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex' }}
          >
            <Box
              component="img"
              src={post2} // Reemplaza con la imagen de tu publicación
              alt="Instagram post 2"
              sx={{ width: '80%', height: '500px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto' }} // Tamaño fijo con objectFit y centrado
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Box
            component="a"
            href="https://www.instagram.com/p/C38hECIx6rR/" // Reemplaza con el enlace a tu publicación
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex' }}
          >
            <Box
              component="img"
              src={post3} // Reemplaza con la imagen de tu publicación
              alt="Instagram post 3"
              sx={{ width: '80%', height: '500px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto' }} // Tamaño fijo con objectFit y centrado
            />
          </Box>
        </Grid>
        {/* Agrega más imágenes según necesites */}
      </Grid>
    </Box>

      {/* Footer */}
      {/* Footer */}
      <Box sx={{ backgroundColor: '#4c064a', padding: '20px 0', color: '#fff' }}>
  <Container>
    <Grid container alignItems="center">
      {/* Texto a la izquierda */}
      <Grid item xs={4}>
        <Typography variant="body1" align="left">
          © {new Date().getFullYear()} SimpleIdeas
        </Typography>
      </Grid>

      {/* Imagen en el centro con icono de Instagram debajo */}
      <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
        <img
          src={logoImage} // Cambia logoImage a la ruta de tu imagen
          alt="Logo"
          style={{ height: '200px', objectFit: 'contain', marginBottom: '8px' }} // Ajusta el tamaño y margen si es necesario
        />
        <IconButton
          href="https://www.instagram.com/tu_perfil" // Reemplaza con el enlace de tu perfil de Instagram
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#fff', fontSize: '16px' }} // Ajusta el tamaño del icono si es necesario
        >
          <Instagram />
        </IconButton>
      </Grid>

      {/* Texto a la derecha */}
      <Grid item xs={4}>
        <Typography variant="body1" align="right">
          Todos los derechos reservados.
        </Typography>
      </Grid>
    </Grid>
  </Container>
</Box>

      
    </>
  );
};

export default Landing;


