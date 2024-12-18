import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Badge,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  PersonOutline as PersonOutlineIcon,
  List as ListIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  HowToReg as HowToRegIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext.jsx';
import { useCart } from '../../context/cartContext.jsx';
import CartPopover from '../carrito/CartPopover.jsx';
import avatar from '../../assets/icons&logos/avatardefault.webp';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuOptions = user
    ? [
        { icon: <PersonOutlineIcon />, label: 'Perfil', action: () => handleMenuItemClick('/profile') },
        { icon: <ListIcon />, label: 'Pedidos', action: () => handleMenuItemClick('/orders') },
        { icon: <LogoutIcon />, label: 'Logout', action: handleLogout },
      ]
    : [
        { icon: <LoginIcon />, label: 'Iniciar sesión', action: () => handleMenuItemClick('/login') },
        { icon: <HowToRegIcon />, label: 'Registrarse', action: () => handleMenuItemClick('/register') },
      ];

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
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button href="/">
            <img
              src="https://ecoplastics.store/wp-content/uploads/2022/09/blanco-01.png"
              alt="Logo de la tienda"
              style={{ height: '60px', objectFit: 'contain' }}
            />
          </Button>
        </Box>

        {/* Menu Hamburguesa en pantallas pequeñas */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List sx={{ width: 250 }}>
              {menuOptions.map((option, index) => (
                <ListItem button key={index} onClick={option.action}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItem>
              ))}
              <ListItem button onClick={() => navigate('/cart')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={`Carrito (${totalItems})`} />
              </ListItem>
            </List>
          </Drawer>
        </Box>

        {/* Elementos normales en pantallas grandes */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
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
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {menuOptions.map((option, index) => (
              <MenuItem key={index} onClick={option.action}>
                {option.icon}
                <Typography variant="inherit" sx={{ ml: 1 }}>
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;