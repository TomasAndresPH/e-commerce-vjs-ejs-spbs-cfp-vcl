import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Alert, Modal, Backdrop } from '@mui/material';
import { useCart } from '../../context/cartContext.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTransaction } from '../../apiService.js';
import { useOrder } from '../../context/orderContext.jsx';
import { useUser } from '../../context/userContext.jsx';
import logo_webpay from '../../assets/icons&logos/logo_webpay.webp';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

const regionsAndCommunes = {
  "Metropolitana": ["Cerrillos", "Cerro Navia", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Ramón", "Santiago", "Vitacura"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quillota"],
  "Biobío": ["Concepción", "Talcahuano", "Chillán"]
};

const SummaryPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const { createOrder } = useOrder(); // Usamos `createOrder` desde el contexto
  const { user } = useUser();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalWithDiscount, setTotalWithDiscount] = useState(null);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(!user);
  const [countdown, setCountdown] = useState(10);
  const [openModal, setOpenModal] = useState(!user);
  

  useEffect(() => {
      if (!user) {
        setShowAlert(true);
        setOpenModal(true);
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
  
        if (countdown === 0) {
          navigate('/login');
        }
  
        return () => clearInterval(timer);
      }
    }, [user, countdown, navigate]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [totalWithShipping, setTotalWithShipping] = useState(totalPrice);

  
  const [formData, setFormData] = useState({
    firstName: '',
    address: '',
    housingType: '',
    postalCode: '',
    region: '',
    comuna: '',
    phone: '',
    saveInfo: false,
    deliveryMethod: ''
  });

  const handleApplyDiscount = () => {
    if (discountCode === 'DESCUENTO10') {
      setTotalWithDiscount(totalPrice * 0.9);
      setDiscountApplied(true);
    } else {
      setTotalWithDiscount(null);
      setDiscountApplied(false);
    }
  };

  const handleProceedToShipping = () => {
    setShowShippingForm(true);
    setProceedToPayment(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (name === 'region') setFormData((prev) => ({ ...prev, comuna: '' }));
  };

  const finalTotal = discountApplied
    ? totalWithDiscount + (formData.deliveryMethod === 'envio' ? 3990 : 0)
    : totalWithShipping;

    const handleProceedToPayment = async () => {
      const buyOrder = `order-${Date.now()}`;
      const sessionId = `session-${Date.now()}`;
      const amount = Number(finalTotal);
    
      if (isNaN(amount) || amount <= 0) {
        setErrorMessage('El monto total no es válido.');
        return;
      }
    
      const transactionData = {
        buyOrder,
        sessionId,
        amount,
        cart: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        shippingInfo: formData
      };
    
      console.log('Datos de transacción:', transactionData);
    
      if (!transactionData.cart.length) {
        console.error('El carrito está vacío.');
        setErrorMessage('Error: Carrito vacío');
        return;
      }
    
      if (!transactionData.shippingInfo.firstName) {
        console.error('Información de envío incompleta.');
        setErrorMessage('Error: Información de envío incompleta');
        return;
      }
    
      try {
        // 🔄 1. Crear la orden en Hono
        const createdOrder = await createOrder({
          customer_id: user.id,
          items: transactionData.cart.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        });
    
        console.log('Orden creada exitosamente:', createdOrder);
    
        // 🔄 2. Crear la transacción con Webpay
        const { token, url } = await createTransaction(transactionData);
    
        // 🔄 3. Redirigir a Webpay
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
    
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token_ws';
        tokenInput.value = token;
        form.appendChild(tokenInput);
        document.body.appendChild(form);
        form.submit();
    
        console.log('Redirigiendo a Webpay...', form);
      } catch (error) {
        console.error('Error en el proceso de pago:', error);
        setErrorMessage('Hubo un error al iniciar el pago. Intenta de nuevo más tarde.');
      }
    };

  return (
    <Container maxWidth="lg" sx={{ mt: 14, boxShadow: 5, borderRadius: 6, p: 4 }}>
      {showAlert && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Necesitas estar logueado para proceder al proceso de pago.
              </Alert>
            )}
      {errorMessage && (
        <Box sx={{ color: 'red', mt: 2 }}>
          <Typography variant="body2">{errorMessage}</Typography>
        </Box>
      )}
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
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${(item.price * item.quantity)}</TableCell>
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
          <Box sx={{ mb: 3, mt: 6.6, p: 2, boxShadow: 4, borderRadius: 2 }}>
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
            <Typography variant="h6">
              Total: 
              <Box component="span" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${finalTotal}
              </Box>
            </Typography>
              {discountApplied && (
                <Typography variant="body2" color="success.main">Descuento aplicado</Typography>
              )}
            </Box>
            
            {/* Renderiza el botón según el estado */}
            {!proceedToPayment ? (
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={handleProceedToShipping}
              >
                Proceder al Envío
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="secondary" 
                fullWidth 
                sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 5, borderRadius: 3 }}
                onClick={handleProceedToPayment}
              >
                <Box 
                  component="img" 
                  src={logo_webpay} 
                  alt="Logo Webpay" 
                  sx={{ width: 140, height: 40, mr: 1 }} 
                />
                Proceder al Pago
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Shipping Form */}
      {showShippingForm && (
        <Box sx={{ mt: 2, p: 5, boxShadow: 5, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>Detalles de Envío</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField label="Nombre y Apellido" fullWidth name="firstName" onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField label="Dirección" fullWidth name="address" onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField label="Casa/Depa./Otro" fullWidth name="housingType" onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField label="Código Postal" type="number" fullWidth name="postalCode" onChange={handleChange} /></Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Región</InputLabel>
                <Select name="region" value={formData.region} onChange={handleChange}>
                  {Object.keys(regionsAndCommunes).map((region) => (
                    <MenuItem key={region} value={region}>{region}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Comuna</InputLabel>
                <Select
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  disabled={!formData.region}
                >
                  {formData.region && regionsAndCommunes[formData.region].map((comuna) => (
                    <MenuItem key={comuna} value={comuna}>{comuna}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}><TextField label="Teléfono" fullWidth placeholder="+56" name="phone" onChange={handleChange} /></Grid>
            <Grid item xs={12}>
              <FormControlLabel 
                control={<Checkbox checked={formData.saveInfo} onChange={handleChange} name="saveInfo" />} 
                label="Guardar mi info para próximos envíos" 
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Método de Entrega</InputLabel>
                <Select
                  name="deliveryMethod"
                  value={formData.deliveryMethod || ''}
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value === 'envio') {
                      setTotalWithShipping(totalPrice + 3990);
                    } else {
                      setTotalWithShipping(totalPrice);
                    }
                  }}
                  disabled={!formData.region} // Deshabilita hasta que se seleccione una región
                >
                  <MenuItem value="retiro" disabled>
                    Retiro en tienda (solo mediante comunicación por WhatsApp)
                  </MenuItem>
                  <MenuItem value="envio">
                    Envío general {formData.region && `(${formData.region})`} - $3.990
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* Modal para iniciar sesión */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          {/* Icono centrado y agrandado */}
          <RemoveShoppingCartOutlinedIcon 
            sx={{ fontSize: '6rem', color: 'primary.main', mb: 2 }} 
          />

          <Typography variant="h4" gutterBottom>Debes iniciar sesión para continuar</Typography>
          <Typography variant="body1" gutterBottom>
            Redirigiendo en {countdown} segundos...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Iniciar sesión
          </Button>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontSize: '0.875rem' }}>
            ¿No tienes cuenta?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size='small'
            sx={{
              fontSize: '0.75rem', // Tamaño de fuente más pequeño
              padding: '4px 8px', // Reducir padding
              minWidth: 'auto', // Quitar el ancho mínimo predeterminado
            }}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </Button> 
        </Box>
      </Modal>
    </Container>
  );
};

export default SummaryPage;
