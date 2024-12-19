import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, IconButton, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../context/cartContext';
import { useMediaQuery, useTheme } from '@mui/material';

function CartPopover({ anchorEl, onClose, isMobile, drawerOpen, toggleDrawer }) {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleUpdateQuantity = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToSummary = () => {
    if (isMobile) toggleDrawer(false); // Cierra el Drawer en móvil
    onClose(); // Cierra el Popover en escritorio
    navigate('/summary'); // Redirige a la página de pago
  };

  const CartContent = () => (
    <Box sx={{ p: 2, width: isMobile ? '60vw' : 300 }}>
      <Typography variant="h6" gutterBottom>Carrito de Compras</Typography>
      {cart.length > 0 ? (
        <List>
          {cart.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                borderBottom: '1px solid #eee',
                py: 1,
              }}
            >
              <ListItemText
                primary={item.name}
                secondary={`Precio: $${item.price}`}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 1,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1 }}>${(item.price * item.quantity)}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ mt: 2 }}>El carrito está vacío.</Typography>
      )}
      <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
        Total: ${getCartTotal()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleProceedToSummary}
        sx={{ mt: 2 }}
      >
        Proceder al Pago
      </Button>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 300, // Ancho fijo de 350px
            maxWidth: '100%', // Asegura que no exceda el ancho de la pantalla
            backgroundColor: '#f5f5f5', // Cambiar el color de fondo // Espaciado interno
            boxShadow: 3, // Sombra para el contenido
          }}
          role="presentation"
          onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer clic en el contenido
        >
          <CartContent />
        </Box>
      </Drawer>
    );
  }
  

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <CartContent />
    </Popover>
  );
}

export default CartPopover;
