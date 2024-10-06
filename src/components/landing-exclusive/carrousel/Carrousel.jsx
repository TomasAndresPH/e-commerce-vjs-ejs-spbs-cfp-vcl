import Carousel from 'react-material-ui-carousel';
import { Typography, Box } from '@mui/material';

//visuals
import logoEco from '../../../assets/logoeco.png';
import slider1 from '../../../assets/carousel/slider1.png';
import slider2 from '../../../assets/carousel/slider2.png';
import slider3 from '../../../assets/carousel/slider3.png';
import slider4 from '../../../assets/carousel/slider4.png';
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

export default CarouselSection;