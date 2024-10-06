import {React} from 'react';
import { Container, Box, Button } from '@mui/material';

function CompraBtn() {
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

export default CompraBtn;