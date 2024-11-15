import React, { useContext, useState } from 'react';
import { Container, Typography, Box, Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useCart } from '../../context/cartContext.jsx';
import DeleteIcon from '@mui/icons-material/Delete';

const SummaryPage = () => {
  const { cart, removeFromCart } = useCart(); // Usando `removeFromCart` para manejar la eliminación
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalWithDiscount, setTotalWithDiscount] = useState(null);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleApplyDiscount = () => {
    // Lógica para aplicar descuento (ejemplo simple de 10% de descuento si hay un código)
    if (discountCode === 'DESCUENTO10') {
      setTotalWithDiscount(totalPrice * 0.9);
      setDiscountApplied(true);
    } else {
      setTotalWithDiscount(null);
      setDiscountApplied(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 14, boxShadow: 5, borderRadius: 6}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>Resumen de Pedido</Typography>
          <TableContainer component={Paper} sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Precio Unitario</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><img src={item.image} alt={item.name} width="20" /></TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeFromCart(item.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3,mt: 6.6, p: 2, boxShadow: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Código de Descuento</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField 
                  fullWidth 
                  placeholder="Ingresa el código" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" fullWidth onClick={handleApplyDiscount}>
                  Aplicar
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Total: 
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  ${discountApplied ? totalWithDiscount.toFixed(2) : totalPrice.toFixed(2)}
                </span>
              </Typography>
              {discountApplied && (
                <Typography variant="body2" color="success.main">Descuento aplicado</Typography>
              )}
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => alert('Procediendo al envío')}
            >
              Proceder al Envío
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SummaryPage;
