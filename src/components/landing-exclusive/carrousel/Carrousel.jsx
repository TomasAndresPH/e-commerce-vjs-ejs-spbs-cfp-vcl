import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';

//visuals
import slider0 from '../../../assets/carousel/slider0.webp';
import slider1 from '../../../assets/carousel/slider1.webp';
import slider2 from '../../../assets/carousel/slider2.webp';
import slider3 from '../../../assets/carousel/slider3.webp';
import slider4 from '../../../assets/carousel/slider4.webp';

// Sección del Carrusel
function CarouselSection() {
  const items = [{image: slider0},{image: slider1},{image: slider2},{image: slider3},{image: slider4}];

  return (
    <Box sx={{ mt: 10, mb: 8 }}>
      <Carousel>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: { xs: '40vh', sm: '50vh', md: '60vh' }, // Ajuste de altura según el tamaño de la pantalla
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'contain', // Asegura que la imagen se ajuste sin ser cortada
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default CarouselSection;