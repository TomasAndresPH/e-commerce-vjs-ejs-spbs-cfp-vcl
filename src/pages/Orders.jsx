import React from 'react';
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

// Datos ficticios de pedidos
const fakeOrders = [
  { id: 1, customer_id: 101, total_amount: 150.50, status_id: 1, created_at: '2024-09-25 10:30:00' },
  { id: 2, customer_id: 102, total_amount: 75.25, status_id: 2, created_at: '2024-09-25 11:45:00' },
  { id: 3, customer_id: 103, total_amount: 200.00, status_id: 1, created_at: '2024-09-26 09:15:00' },
  { id: 4, customer_id: 104, total_amount: 50.75, status_id: 3, created_at: '2024-09-26 14:20:00' },
  { id: 5, customer_id: 105, total_amount: 125.00, status_id: 2, created_at: '2024-09-27 12:00:00' },
  { id: 6, customer_id: 106, total_amount: 300.50, status_id: 1, created_at: '2024-09-27 16:30:00' },
  { id: 7, customer_id: 107, total_amount: 80.25, status_id: 3, created_at: '2024-09-28 10:45:00' },
  { id: 8, customer_id: 108, total_amount: 175.00, status_id: 2, created_at: '2024-09-28 13:15:00' },
  { id: 9, customer_id: 109, total_amount: 90.75, status_id: 1, created_at: '2024-09-29 11:30:00' },
  { id: 10, customer_id: 110, total_amount: 250.00, status_id: 2, created_at: '2024-09-29 15:00:00' },
];

// Función para mapear status_id a un string legible
const getStatusString = (statusId) => {
  const statusMap = {
    1: 'Pendiente',
    2: 'En proceso',
    3: 'Completado'
  };
  return statusMap[statusId] || 'Desconocido';
};

const OrderControl = () => {
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
              <TableCell>ID Cliente</TableCell>
              <TableCell>Monto Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer_id}</TableCell>
                <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                <TableCell>{getStatusString(order.status_id)}</TableCell>
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