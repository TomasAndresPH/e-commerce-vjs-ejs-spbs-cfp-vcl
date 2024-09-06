import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Checkbox, FormControlLabel, Box, Slider } from '@mui/material';

// Ejemplo de un conjunto de datos para productos
const productData = [
  { id: 1, name: 'Camiseta', price: 25, category: 'ropa', image: 'link-a-imagen1' },
  { id: 2, name: 'Zapatos', price: 80, category: 'Calzado', image: 'link-a-imagen2' },
  { id: 3, name: 'Reloj', price: 120, category: 'Accesorios', image: 'link-a-imagen3' },
  { id: 4, name: 'Pantalón', price: 50, category: 'Ropa', image: 'link-a-imagen4' },
  { id: 5, name: 'Gorra', price: 20, category: 'Accesorios', image: 'link-a-imagen5' },
  { id: 6, name: 'Zapatillas', price: 90, category: 'Calzado', image: 'link-a-imagen6' }
];

const Products = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState([0, 100]); // Estado para el slider
  const [selectedCategories, setSelectedCategories] = useState({
    Plasticos: false,
    Aluminios: false,
    Papeleria: false,
    Material: false,
  });

  // Filtro por categorías
  const handleCategoryChange = (event) => {
    setSelectedCategories({
      ...selectedCategories,
      [event.target.name]: event.target.checked,
    });
  };

  // Cambio del rango de precios en el slider
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

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
      
      <Box sx={{ width: '20%', p: 2, marginRight: 4 }}>
        <Typography variant="h6">Categorías</Typography>
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
          sx={{ color: 'primary.main' }} // Color del slider personalizado
        />
        <Button variant="contained" color="primary" sx={{ display: 'block', mb: 2 }}>Aplicar filtros</Button>
        <Button variant="outlined" color="primary" sx={{ display: 'block' }}>Limpiar filtros</Button>
      </Box>

      {/* Listado de productos en la parte derecha */}
      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        {productData.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Añadir al carrito</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;

