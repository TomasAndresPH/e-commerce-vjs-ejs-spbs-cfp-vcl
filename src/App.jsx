//todo lo que es front
import {React, useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
//Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
//Customers backend
import { UserProvider } from './context/userContext.jsx';
import { CartProvider } from './context/cartContext.jsx';
import { OrderProvider } from './context/orderContext.jsx';
//apartado de diseño
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';  // Añadimos el componente Box de Material UI
//seleccion de colores para la pagina
const theme = createTheme({
  palette: {
    primary: {
      main: '#227C00', // Verde oscuro, este es el que se esta usando en los botones
    },
    secondary: {
      main: '#ffffff', // Blanco, de momento no se esta usando
    },
  },
});

function App() {

  //LA LOGICA COMENTA A CONTINUACION, FUE MOVIDA A userContext.jsx dentro de pages/auth/context
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Intenta cargar el usuario desde localStorage al iniciar la app
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);


  // //aca esto hay un error, en el userContext.jsx se llama a logout, pero en el app.js se llama a handleLogout,
  // //tengo que comprobar cual de estos esta realmente haciando la funcion de cerrar sesion.
  // const handleLogout = () => {
  //   setUser(null);
  //   localStorage.removeItem('user');
  //   // Aquí puedes añadir cualquier otra lógica de cierre de sesión
  // };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box sx={{ flexGrow: 1, p: 3 }}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </OrderProvider> 
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;