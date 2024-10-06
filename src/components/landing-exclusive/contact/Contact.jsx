import {React} from 'react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';

function Contact() {
    return (
      <Box sx={{ backgroundColor: '#f4f4f4', py: 8, borderRadius: '20px' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Contáctanos y Cotiza
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Nombre" variant="outlined" margin="normal" />
              <TextField fullWidth label="Email" variant="outlined" margin="normal" />
              <TextField fullWidth label="Mensaje" variant="outlined" multiline rows={4} margin="normal" />
              <Button variant="contained" color="primary" fullWidth>
                Enviar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Información de Contacto
              </Typography>
              <Typography variant="body1">Email: ventas@ecoplastics.cl</Typography>
              <Typography variant="body1">Tel. 1: 22 774 33 56</Typography>
              <Typography variant="body1">Tel. 2: 22 505 38 83</Typography>
              <Typography variant="body1">Dirección: Molina Lavín 01691, Quinta Normal, RM</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <img
                  src="https://ecoplastics.store/wp-content/uploads/2022/09/logo_ecoplas_09-01.png"
                  alt="Logo ecoplastics"
                  style={{
                    maxWidth: '50%', // Hace que la imagen nunca sea más grande que su contenedor
                    height: 'auto', // Ajusta la altura automáticamente según el ancho
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

export default Contact;