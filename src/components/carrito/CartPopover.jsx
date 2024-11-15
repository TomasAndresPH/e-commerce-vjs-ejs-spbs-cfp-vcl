import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, Box, Typography, List, ListItem, ListItemText, Button,IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../context/cartContext';

// Opción 1: Función regular
function CartPopover({ anchorEl, onClose, onSummary }) {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal, isLoading } = useCart();
  const open = Boolean(anchorEl);


  const handleUpdateQuantity = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (isLoading) {
    return (
    <Popover
      open={open}
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
      <Box sx={{ p: 2, width: 300 }}>
        <Typography variant="h6" gutterBottom>Carrito de Compras</Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={item.id} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'start',
              borderBottom: '1px solid #eee',
              py: 1
            }}>
              <ListItemText 
                primary={item.name} 
                secondary={`Precio: $${item.price.toFixed(2)}`}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, width: '100%', justifyContent: 'space-between' }}>
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
                  <Typography sx={{ mr: 1 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
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
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Total: ${getCartTotal().toFixed(2)}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={onSummary}
          sx={{ mt: 2 }}
        >
          Proceder al Pago
        </Button>
      </Box>
    </Popover>
    );
  }

  return (
    <Popover
      open={open}
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
      <Box sx={{ p: 2, width: 300 }}>
        <Typography variant="h6" gutterBottom>Carrito de Compras</Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={item.id} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'start',
              borderBottom: '1px solid #eee',
              py: 1
            }}>
              <ListItemText 
                primary={item.name} 
                secondary={`Precio: $${item.price.toFixed(2)}`}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, width: '100%', justifyContent: 'space-between' }}>
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
                  <Typography sx={{ mr: 1 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
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
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Total: ${getCartTotal().toFixed(2)}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={onSummary}
          sx={{ mt: 2 }}
        >
          Proceder al Pago
        </Button>
      </Box>
    </Popover>
  );
}

export default CartPopover;
