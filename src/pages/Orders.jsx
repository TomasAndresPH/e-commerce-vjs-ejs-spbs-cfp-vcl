import React, { useEffect } from 'react';
import { 
  Table, 
  TableCell, 
  TableBody, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography, 
  Container, 
  CircularProgress,
  Box 
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useOrder } from '../context/orderContext.jsx';
import { useUser } from '../context/userContext.jsx';

const getStatusString = (status) => {
  return status?.status || 'Desconocido';
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CL', { 
    style: 'currency', 
    currency: 'CLP' 
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const OrderControl = () => {
  const { orders, fetchOrders } = useOrder();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  if (!orders) {
    return (
      <Box 
        sx={{
          mt: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box 
        sx={{
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No hay órdenes disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Tus órdenes aparecerán aquí cuando realices una compra
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{mt: 10}}>
      <Typography variant="h4" gutterBottom>
        Mis Órdenes
      </Typography>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: '70vh',
          overflow: 'auto',
          '& .MuiTableCell-root': { 
            py: 1.5,
            px: 2 
          },
          '& .MuiTableHead-root': {
            position: 'sticky',
            top: 0,
            backgroundColor: 'background.paper',
            zIndex: 1,
          },
          '& .MuiTableHead-root .MuiTableCell-root': {
            fontWeight: 'bold',
            backgroundColor: 'background.paper',
            borderBottom: 2,
            borderColor: 'divider'
          }
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID Orden</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id}
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{order.id || ''}</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>{getStatusString(order.status)}</TableCell>
                <TableCell align="right">{formatCurrency(order.total_amount)}</TableCell>
                <TableCell>
                  {order.ordenes_items && order.ordenes_items.map((item, index) => (
                    <Typography key={index} variant="body2" component="div">
                      {item.productos?.name} ({item.quantity} unidades)
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton size="small" sx={{ mr: 1 }}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton size="small">
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