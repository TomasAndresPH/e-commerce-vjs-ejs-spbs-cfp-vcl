import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const UserContext = createContext();
const SESSION_TIMEOUT = 1800000; // 30 minutos
const GRACE_PERIOD = 20000; // 20 segundos para responder

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showExtendSession, setShowExtendSession] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const logout = useCallback(() => {
    console.log('Ejecutando logout...');
    setUser(null);
    setIsAuthenticated(false);
    setIsRegistered(false);  // Restablecer el estado de isRegistered
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    if (location.pathname === '/') {
      setTimeout(() => {
        setShowLogoutToast(true);
      }, 1000);
    } else {
      navigate('/');
      setTimeout(() => {
        setShowLogoutToast(true);
      }, 1000);
    }
  }, [navigate, location]);

  const resetSessionTimer = useCallback(() => {
    console.log('Reiniciando temporizador de sesión');
    setShowExtendSession(false);
    return setTimeout(() => {
      console.log('Tiempo de sesión alcanzado, mostrando alerta');
      setShowExtendSession(true);
    }, SESSION_TIMEOUT);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
  
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setIsRegistered(false);  // Restablecer si no hay token
    }
  }, []);

  useEffect(() => {
    let sessionTimer;
    let graceTimer;

    // Solo iniciar el temporizador si el usuario está autenticado
    if (isAuthenticated) {
      sessionTimer = resetSessionTimer();
    }

    return () => {
      clearTimeout(sessionTimer);
      clearTimeout(graceTimer);
    };
  }, [isAuthenticated, resetSessionTimer]);

  useEffect(() => {
    let graceTimer;
    
    if (showExtendSession && isAuthenticated) {
      graceTimer = setTimeout(() => {
        console.log('Período de gracia terminado, cerrando sesión');
        logout();
      }, GRACE_PERIOD);
    }

    return () => clearTimeout(graceTimer);
  }, [showExtendSession, isAuthenticated, logout]);

  const extendSession = () => {
    console.log('Sesión extendida');
    setShowExtendSession(false);
    resetSessionTimer();
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

   return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAuthenticated,
      showLogoutToast, // Agregarlo en el contexto para que esté disponible en otros componentes
      setShowLogoutToast // También exportar la función para resetear el estado desde otros componentes
    }}>
      {children}
      {isAuthenticated && (
        <Dialog
          open={showExtendSession}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            ¿Desea extender su sesión?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Su sesión está a punto de expirar. ¿Desea extenderla?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={logout} color="error">
              No extender
            </Button>
            <Button onClick={extendSession} color="primary" autoFocus>
              Extender sesión
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </UserContext.Provider>
  );
};

export default UserContext;