import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';  // Añadimos el componente Box de Material UI

const theme = createTheme({
  palette: {
    primary: {
      main: '#227C00', // Verde oscuro
    },
    secondary: {
      main: '#ffffff', // Blanco
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh', // Garantiza que la altura mínima sea igual a la altura de la ventana
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Box>

        {/* Footer siempre al final */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;