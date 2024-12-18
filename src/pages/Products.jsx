import React, { useState, useEffect } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Checkbox, FormControlLabel, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Skeleton } from '@mui/material';
import img_product_default from '../assets/products/default.webp';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import img_product1 from '../assets/products/1.webp';
import img_product2 from '../assets/products/2.webp';
import img_product3 from '../assets/products/3.webp';
import img_product4 from '../assets/products/4.webp';
import img_product5 from '../assets/products/5.webp';
import img_product6 from '../assets/products/6.webp';
import img_product7 from '../assets/products/7.webp';
import img_product8 from '../assets/products/8.webp';
import img_product9 from '../assets/products/9.webp';
import img_product10 from '../assets/products/10.webp';

import { getAllProducts } from '../apiService';
import { useCart } from '../context/cartContext.jsx';

// Crear un mapa de imágenes basado en el id
const productImages = {
  1: img_product1,
  2: img_product2,
  3: img_product3,
  4: img_product4,
  5: img_product5,
  6: img_product6,
  7: img_product7,
  8: img_product8,
  9: img_product9,
  10: img_product10,
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const categoryId = searchParams.get('category');
  const [selectedCategories, setSelectedCategories] = useState({
    1: false, // Plasticos
    2: false, // Aluminios
    3: false, // Papeleria
    4: false, // Material
  });

  const { addToCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar al inicio
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []); // Este efecto solo carga los productos inicialmente
  
  // Filtrar por categoría o búsqueda cada vez que `products`, `categoryId` o `searchTerm` cambien
  useEffect(() => {
    let filtered = [...products];
  
    // Filtrar por categoría
    if (categoryId) {
      filtered = filtered.filter(
        (product) => product.category_id === parseInt(categoryId)
      );
    }
  
    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    setFilteredProducts(filtered);
  }, [products, categoryId, searchTerm]); // Dependencias que activan el filtro

  if (loading) {
    return <Skeleton />;
  }

  // Nueva función para aplicar los filtros
  const applyFilters = () => {
    let filtered = [...products];

    // Filtrar por categorías seleccionadas
    const activeCategories = Object.entries(selectedCategories)
      .filter(([_, isChecked]) => isChecked)
      .map(([categoryId]) => parseInt(categoryId));

    if (activeCategories.length > 0) {
      filtered = filtered.filter(product => 
        activeCategories.includes(product.category_id)
      );
    }

    // Filtrar por rango de precios
    filtered = filtered.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories({
      ...selectedCategories,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMinPriceChange = (event) => {
    const value = Math.max(0, Number(event.target.value));
    setMinPrice(value);
  };

  const handleMaxPriceChange = (event) => {
    const value = Math.max(0, Number(event.target.value));
    setMaxPrice(value);
  };

  const clearFilters = () => {
    setSelectedCategories({
      1: false,
      2: false,
      3: false,
      4: false,
    });
    setMinPrice(0);
    setMaxPrice(100000);
    setFilteredProducts(products);
    navigate('/products');
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // Mantén los componentes Skeleton como estaban...
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

  const categoryNames = {
    1: 'Plasticos',
    2: 'Aluminios',
    3: 'Papeleria',
    4: 'Material'
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        paddingTop: '80px', // Para el navbar
        bgcolor: 'background.default'
      }}
    >
      {/* Filtros - Ahora con position fixed */}
      <Box
        sx={{
          width: '250px', // Ancho fijo en lugar de porcentaje
          position: 'fixed',
          left: '2.5%', // Para mantener el margen del 95% del container
          top: '120px', // Alineado con el paddingTop del contenedor principal
          height: '410px', // Altura total menos el espacio para el navbar y un pequeño margen
          overflowY: 'auto', // Por si el contenido del filtro es muy largo
          p: 2,
          borderRadius: '20px',
          boxShadow: 6,
          bgcolor: 'background.paper',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Typography variant="h6" sx={{fontWeight: 'bold'}}>Categorías</Typography>
        {Object.entries(categoryNames).map(([id, name]) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox 
                checked={selectedCategories[id]} 
                onChange={handleCategoryChange} 
                name={id}
              />
            }
            label={name}
          />
        ))}

        <Typography variant="h6" sx={{fontWeight: 'bold', mt: 1}}>Rango de precios</Typography>
        <Box>
          <TextField
            label="Precio mínimo"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Precio máximo"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mb: 2 }}
          onClick={applyFilters}
        >
          Aplicar filtros
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={clearFilters}
        >
          Limpiar filtros
        </Button>
      </Box>

      {/* Contenedor de productos - Con margen izquierdo para dar espacio al filtro fijo */}
      {/* Contenedor de productos - Con margen izquierdo para dar espacio al filtro fijo */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '320px', // 300px del ancho del filtro + 20px de espacio
          padding: 1,
          minHeight: '100vh',
        }}
      >
        {/* Mostrar productos cargados o skeleton mientras se cargan */}
        {loading ? (
          <Grid container spacing={4}>
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
        ) : (
          // Si los productos ya están cargados, mostrar lista filtrada
          <Grid container spacing={4}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 4,
                      borderRadius: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={productImages[product.id]} // Asignar la imagen según el id
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
                        {categoryNames[product.category_id]}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 1, marginRight: 1 }}
                        onClick={() => addToCart(product)}
                        startIcon={<AddShoppingCartIcon />}
                      >
                        Añadir
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 1 }}
                        onClick={() => handleOpenDialog(product)}
                        startIcon={<ChecklistIcon />}
                      >
                        Ver detalles
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              // Mostrar mensaje si no hay productos que coincidan con la búsqueda
              <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
                No hay productos que coincidan con tu búsqueda
              </Typography>
            )}
          </Grid>
        )}
      </Box>


      {/* Dialog se mantiene igual */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <img 
                src={productImages[selectedProduct.id]} 
                alt={selectedProduct.name} 
                style={{ width: '100%', marginBottom: '20px' }} 
              />
              <Typography variant="body1">Categoría: {categoryNames[selectedProduct.category_id]}</Typography>
              <Typography variant="body1">Precio: ${selectedProduct.price}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                {selectedProduct.description}
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
    </Box>
  );
};

export default Products;