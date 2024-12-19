//navbar
import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, TextField, Button, Badge, Box, Typography, IconButton, Avatar, Menu, MenuItem, ListItem, Drawer, List, ListItemText, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { PersonOutline as PersonOutlineIcon, List as ListIcon, Logout as LogoutIcon, Login as LoginIcon, HowToReg as HowToRegIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext.jsx';
import { useCart } from '../../context/cartContext.jsx';
import CartPopover from '../carrito/CartPopover.jsx';
import avatar from '../../assets/icons&logos/avatardefault.webp';
import { useMediaQuery, useTheme } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event && (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
      return;
    }
    setDrawerOpen(open);
  };
  
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    handleMenuItemClick('/');
  };


  const handleCartOpen = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleProceedToCheckout = () => {
    handleCartClose();
    navigate('/checkout');
  };

  const handleProceedToSummary = () => {
    handleCartClose();
    navigate('/summary');
  };


  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleCartDrawer = (open) => (event) => {
    if (event && (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
      return;
    }
    setCartDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 10,
        backgroundImage: 'linear-gradient(to right, #0d7510, #0aa30e)',
        padding: '0 20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button href="/">
            <img
              src="https://ecoplastics.store/wp-content/uploads/2022/09/blanco-01.png"
              alt="Logo de la tienda"
              style={{ height: '60px', objectFit: 'contain' }}
            />
          </Button>
        </Box>
  
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {user ? (
                    <>
                      <ListItem button onClick={() => handleMenuItemClick('/profile')}>
                        <PersonOutlineIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Perfil" />
                      </ListItem>
                      <ListItem button onClick={() => handleMenuItemClick('/orders')}>
                        <ListIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Pedidos" />
                      </ListItem>
                      <ListItem button onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem button onClick={() => handleMenuItemClick('/login')}>
                        <LoginIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Iniciar sesión" />
                      </ListItem>
                      <ListItem button onClick={() => handleMenuItemClick('/register')}>
                        <HowToRegIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Registrarse" />
                      </ListItem>
                    </>
                  )}
                </List>
                <Divider />
                <List>
                  {/* Cambiar el evento onClick para abrir el Drawer del carrito */}
                  <ListItem button onClick={toggleCartDrawer(true)}>
                    <ShoppingCartIcon sx={{ mr: 1 }} />
                    <ListItemText primary={`Carrito (${totalItems})`} />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
  
            {/* Drawer para el carrito en modo móvil */}
            <CartPopover
              isMobile={isMobile}
              drawerOpen={cartDrawerOpen}
              toggleDrawer={toggleCartDrawer}
            />
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '300px' }}>
              <TextField
                variant="outlined"
                placeholder="Buscar productos..."
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'white' }} />,
                  style: { color: 'white', borderColor: 'white' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                }}
              />
            </Box>
            <IconButton aria-label="cart" onClick={handleCartOpen} color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <CartPopover
              open={Boolean(cartAnchorEl)}
              anchorEl={cartAnchorEl}
              onClose={handleCartClose}
            />
            <Avatar src={avatar} onClick={handleMenuOpen} sx={{ cursor: 'pointer' }} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user ? (
                <>
                  <MenuItem key="profile" onClick={() => handleMenuItemClick('/profile')}>
                    <PersonOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                    Perfil
                  </MenuItem>
                  <MenuItem key="orders" onClick={() => handleMenuItemClick('/orders')}>
                    <ListIcon fontSize="small" sx={{ mr: 1 }} />
                    Pedidos
                  </MenuItem>
                  <MenuItem key="logout" onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem key="login" onClick={() => handleMenuItemClick('/login')}>
                    <LoginIcon fontSize="small" sx={{ mr: 1 }} />
                    Iniciar sesión
                  </MenuItem>
                  <MenuItem key="register" onClick={() => handleMenuItemClick('/register')}>
                    <HowToRegIcon fontSize="small" sx={{ mr: 1 }} />
                    Registrarse
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );  
};

export default Navbar;




