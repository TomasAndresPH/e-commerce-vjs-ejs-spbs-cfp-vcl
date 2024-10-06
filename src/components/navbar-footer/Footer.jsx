import React from 'react';
import { Container, Grid, Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        borderRadius: '20px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Enlaces a Páginas */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces
            </Typography>
            <Link href="/" variant="body2" color="inherit" underline="hover">
              Home
            </Link>
            <br />
            <Link href="/products" variant="body2" color="inherit" underline="hover">
              Productos
            </Link>
            <br />
            <Link href="/about" variant="body2" color="inherit" underline="hover">
              Nosotros
            </Link>
            <br />
            <Link href="/contact" variant="body2" color="inherit" underline="hover">
              Contacto
            </Link>
          </Grid>

          {/* Información de Contacto */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2">Molina Lavín 01691</Typography>
            <Typography variant="body2">Quinta Normal, RM</Typography>
            <Typography variant="body2">ventas@ecoplastics.cl</Typography>
            <Typography variant="body2">Tel. 1: 22 774 33 56</Typography>
            <Typography variant="body2">Tel. 2: 22  505 38 83</Typography>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={12} sm={4} sx={{display: 'flex', alignItems:'center'}}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://web.facebook.com/profile.php?id=100080467056190&locale=es_LA" target="_blank">
                <FacebookIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Ecoplastic App. Todos los derechos reservados. Desarrollado por <Link href="https://www.linkedin.com/in/tom%C3%A1s-andr%C3%A9s-ph/" color="inherit" underline="hover">Tomás Andrés</Link>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;