import React from 'react';
import { AppBar, Toolbar, TextField, IconButton, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 10,
        backgroundImage: 'linear-gradient(to right, #0d7510, #0aa30e)', // Degradado de izquierda a derecha
        padding: '0 20px', // Añadido padding para la consistencia
        borderBottomLeftRadius: '20px', // Valor para redondear esquina inferior izquierda
        borderBottomRightRadius: '20px', // Valor para redondear esquina inferior derecha
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Imagen de la tienda */}
        <Box sx={{ display: 'flex', alignItems: 'center' }} >
          <Button href="/">
            <img
              src="https://ecoplastics.store/wp-content/uploads/2022/09/blanco-01.png"
              alt="Logo de la tienda"
              style={{ height: '60px', objectFit: 'contain' }} // Ajusta el tamaño según sea necesario
            />
          </Button>
        </Box>

        {/* Contenedor de los elementos de la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Input de búsqueda con estilo outlined en blanco */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '300px' }}>
            <TextField
              variant="outlined"
              placeholder="Buscar productos..."
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'white' }} />,
                style: {
                  color: 'white',
                  borderColor: 'white',
                },
              }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Borde en blanco
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Borde en blanco al hacer hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Borde en blanco cuando está enfocado
                  },
                },
              }}
            />
          </Box>

          {/* Botón de Ingresar con estilo en blanco */}
          <Button href="/login"
            variant="outlined"
            sx={{
              borderColor: 'white', // Borde en blanco
              color: 'white', // Texto en blanco
              '&:hover': {
                borderColor: 'white', // Borde en blanco al hacer hover
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semi-transparente al hacer hover
              },
            }}
          >
            Ingresar
          </Button>

          {/* Botón del carrito de compras */}
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;





