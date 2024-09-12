import {React, useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';

import { UserProvider } from './pages/auth/context/userContext.jsx';

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Intenta cargar el usuario desde localStorage al iniciar la app
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Aquí puedes añadir cualquier otra lógica de cierre de sesión
  };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;