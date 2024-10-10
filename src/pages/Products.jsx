import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Checkbox, FormControlLabel, Box, Slider, Dialog, DialogTitle, DialogContent, DialogActions,Skeleton } from '@mui/material';
import img_product from '../assets/products/default.png'
import { getAllProducts } from '../apiService';
import { useCart } from '../context/cartContext.jsx';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState({
    Plasticos: false,
    Aluminios: false,
    Papeleria: false,
    Material: false,
  });

  const { addToCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        // Verificación adicional por si acaso
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setProducts([]); // Establecer como array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories({
      ...selectedCategories,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const FiltersSkeleton = () => (
    <Box sx={{ width: '20%', p: 2, marginRight: 4, boxShadow: 10, borderRadius: '20px' }}>
      <Skeleton variant="text" width="60%" height={40} />
      {[...Array(4)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Skeleton variant="rectangular" width={24} height={24} sx={{ mr: 1 }} />
          <Skeleton variant="text" width="70%" />
        </Box>
      ))}
      <Skeleton variant="text" width="50%" height={40} sx={{ mt: 4 }} />
      <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
      <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
      <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
    </Box>
  );

  const ProductsSkeleton = () => (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      {[...Array(8)].map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ height: '100%' }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" height={24} width="40%" />
              <Skeleton variant="text" height={24} width="60%" />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="rectangular" height={36} width="100%" />
              </Box>
              <Box sx={{ mt: 1 }}>
                <Skeleton variant="rectangular" height={36} width="100%" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        py: 4,
        paddingTop: '80px',
        margin: '0 auto',
        width: '95%',
      }}
    >
      {loading ? (
        <>
          <FiltersSkeleton />
          <ProductsSkeleton />
        </>
      ) : (
        <>
          <Box sx={{ width: '20%', p: 2, marginRight: 4, boxShadow: 10, borderRadius: '20px' }}>
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>Categorías</Typography>
            <FormControlLabel
              control={<Checkbox checked={selectedCategories.Plasticos} onChange={handleCategoryChange} name="Plasticos" />}
              label="Plasticos"
            />
            <FormControlLabel
              control={<Checkbox checked={selectedCategories.Aluminios} onChange={handleCategoryChange} name="Aluminios" />}
              label="Aluminios"
            />
            <FormControlLabel
              control={<Checkbox checked={selectedCategories.Papeleria} onChange={handleCategoryChange} name="Papeleria" />}
              label="Papeleria"
            />
            <FormControlLabel
              control={<Checkbox checked={selectedCategories.Material} onChange={handleCategoryChange} name="Material" />}
              label="Material"
            />

            <Typography variant="h6" sx={{ mt: 4 }}>Rango de precios</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={150}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              Aplicar filtros
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Limpiar filtros
            </Button>
          </Box>

          <Grid container spacing={4} sx={{ padding: 4 }}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={img_product}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => addToCart(product)}>
                      Añadir al carrito
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => handleOpenDialog(product)}>
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
              No hay productos disponibles
            </Typography>
          )}
          </Grid>
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <img src={img_product} alt={selectedProduct.name} style={{ width: '100%', marginBottom: '20px' }} />
              <Typography variant="body1">Categoría: {selectedProduct.category}</Typography>
              <Typography variant="body1">Precio: ${selectedProduct.price}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                Descripción del producto...
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Products;

