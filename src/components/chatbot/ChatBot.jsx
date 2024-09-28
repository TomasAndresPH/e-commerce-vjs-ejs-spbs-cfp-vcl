import React, { useState } from 'react';
import { Box, Fab, Paper, Typography, TextField, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    // Aquí iría la lógica para enviar el mensaje
    console.log('Mensaje enviado:', message);
    setMessage('');
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        onClick={handleToggle}
      >
        <ChatIcon />
      </Fab>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 300,
            height: 400,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            ¿En qué podemos ayudarte?
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            {/* Aquí irían los mensajes del chat */}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              size="small"
            />
            <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default ChatbotButton;