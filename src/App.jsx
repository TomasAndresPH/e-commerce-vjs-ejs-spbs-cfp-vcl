//todo lo que es front
import {React} from 'react';
import { Routes, Route } from 'react-router-dom';
//Pages
import Navbar from './components/navbar-footer/Navbar';
import Footer from './components/navbar-footer/Footer';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <ToastContainer />
            </OrderProvider> 
          </CartProvider>
        </UserProvider>
    </ThemeProvider>
  );
}

export default App;