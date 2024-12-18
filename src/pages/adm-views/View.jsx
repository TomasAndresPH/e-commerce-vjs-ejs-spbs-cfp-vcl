import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Drawer,
  TextField,
  Box,
} from '@mui/material';
import { getAllProducts, getOrders, updateProduct, deleteProduct, getOrderDetails } from '../../apiService';

const View = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [isProductDrawerOpen, setProductDrawerOpen] = useState(false);
  const [isOrderDrawerOpen, setOrderDrawerOpen] = useState(false);

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Cargar órdenes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error al cargar órdenes:', error);
      }
    };
    fetchOrders();
  }, []);

  // Editar producto
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductDrawerOpen(true);
  };

  // Guardar cambios del producto
  const handleSaveProduct = async () => {
    await updateProduct(selectedProduct.id, selectedProduct);
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
    );
    setProductDrawerOpen(false);
    setSelectedProduct(null);
  };

  // Eliminar producto
  const handleDeleteProduct = async () => {
    await deleteProduct(selectedProduct.id);
    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    setProductDrawerOpen(false);
    setSelectedProduct(null);
  };

  // Mostrar detalles de una orden
  const handleViewOrderDetails = async (orderId) => {
    try {
      const data = await getOrderDetails(orderId);
      console.log('Detalles de la orden:', data); // Verifica el formato de los datos
      setSelectedOrderDetails(data);
      setOrderDrawerOpen(true);
    } catch (error) {
      console.error('Error al cargar los detalles de la orden:', error);
      alert('Hubo un error al obtener los detalles de la orden. Por favor, inténtalo de nuevo.');
    }
  };  

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 10, fontWeight: 'bold'}} gutterBottom>
        Panel de Administración
      </Typography>

      {/* Tabla de productos */}
      <Typography variant="h5">Productos</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditProduct(product)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Drawer para editar producto */}
      <Drawer
        anchor="right"
        open={isProductDrawerOpen}
        onClose={() => setProductDrawerOpen(false)}
      >
        {selectedProduct && (
          <Box sx={{ width: 300, padding: 2 }}>
            <Typography variant="h6">Editar Producto</Typography>
            <TextField
              label="Nombre"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
              fullWidth
              sx={{ mb: 1, mt: 1 }}
            />
            <TextField
              label="Precio"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, price: e.target.value })
              }
              fullWidth
              type="number"
            />
            <TextField
              label="Stock"
              value={selectedProduct.stock}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, stock: e.target.value })
              }
              fullWidth
              sx={{ mb: 2, mt: 1 }}
              type="number"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button variant="contained" onClick={handleSaveProduct}>
                Guardar
              </Button>
              <Button variant="outlined" color="error" onClick={handleDeleteProduct}>
                Eliminar
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Tabla de órdenes */}
      <Typography variant="h5" sx={{ marginTop: 4 }}>Órdenes</Typography>
        <Table>
        <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Última Actualización</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Detalles</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {orders.map((order) => (
            <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.status.status}</TableCell>
                <TableCell>{new Date(order.updated_at).toLocaleString()}</TableCell>
                <TableCell>{order.total_amount}</TableCell>
                <TableCell>
                <Button onClick={() => handleViewOrderDetails(order.id)}>
                    Detalles
                </Button>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>

        {/* Drawer para detalles de la orden */}
        <Drawer
        anchor="left"
        open={isOrderDrawerOpen}
        onClose={() => setOrderDrawerOpen(false)}
        >
        <Box sx={{ width: 300, padding: 2 }}>
            <Typography variant="h6">Detalles de la Orden</Typography>
            {Array.isArray(selectedOrderDetails) && selectedOrderDetails.length > 0 ? (
                selectedOrderDetails.map((item, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                    <Typography>Producto: {item.productos.name}</Typography>
                    <Typography>Precio: ${item.price}</Typography>
                    <Typography>Cantidad: {item.quantity}</Typography>
                </Box>
                ))
            ) : (
                <Typography>No hay detalles para esta orden.</Typography>
            )}
            </Box>
        </Drawer>
    </Container>
  );
};

export default View;