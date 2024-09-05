import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: 0 }}>
      <Toolbar>
        {/* Nombre de la tienda */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Tienda
        </Typography>

        {/* Input de búsqueda con estilo outlined */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, width: '300px' }}>
          <TextField
            variant="outlined"
            placeholder="Buscar productos..."
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
            fullWidth
          />
        </Box>

        {/* Botón de Ingresar */}
        <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
          Ingresar
        </Button>

        {/* Botón del carrito de compras */}
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


