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
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
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
            <Typography variant="body2">Email: contacto@ecommerce.com</Typography>
            <Typography variant="body2">Teléfono: +56 9 1234 5678</Typography>
            <Typography variant="body2">Dirección: Calle Falsa 123, Ciudad, País</Typography>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="https://www.linkedin.com" target="_blank">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} E-commerce App. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
