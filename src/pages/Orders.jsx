import React, { useEffect } from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useOrder } from '../context/orderContext.jsx';
import { useUser } from '../context/userContext.jsx';

const getStatusString = (status) => {
  return status || 'Desconocido';
};

const OrderControl = () => {
  const { orders, fetchOrders } = useOrder();
  const { user } = useUser();

  useEffect(() => {
    if (user) { // Verifica que el usuario esté definido
      fetchOrders();
    }
  }, [user, fetchOrders]); // Asegúrate de incluir user en las dependencias

  if (!orders) {
    return (
      <Container sx={{mt:10, display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{mt:10}}>
      <Typography variant="h3" gutterBottom>
        Tus pedidos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Monto Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                <TableCell>{getStatusString(order.status?.status)}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton aria-label="detalles">
                    <InfoIcon />
                  </IconButton>
                  <IconButton aria-label="soporte">
                    <ContactSupportIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderControl;