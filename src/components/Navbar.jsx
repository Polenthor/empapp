import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container } from '@mui/material';
import { Person, Logout } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { red, grey } from '@mui/material/colors';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const isJojoPage = location.pathname.startsWith("/jojo");

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
        backdropFilter: 'blur(8px)', // Modern glass effect
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 0 }}>
          
          {/* BRAND LOGO */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 800,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: grey[400] }
            }}
          >
            MODARC
          </Typography>

          {/* NAVIGATION LINKS */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            
            {isJojoPage && (
              <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                <Button 
                  component={Link} 
                  to="/view" 
                  sx={{ color: 'white', fontWeight: 600 }}
                >
                  View
                </Button>
                <Button 
                  component={Link} 
                  to="/add" 
                  sx={{ color: 'white', fontWeight: 600 }}
                >
                  Add
                </Button>
              </Box>
            )}

            {!loggedUser ? (
              <>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'white', borderRadius: 2 }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="contained" 
                  sx={{ bgcolor: 'white', color: 'black', borderRadius: 2, '&:hover': { bgcolor: grey[300] } }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button 
                  component={Link} 
                  to="/profile" 
                  sx={{ color: 'white', minWidth: 'auto', p: 1 }}
                >
                  <Person />
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  sx={{ 
                    bgcolor: red[700], 
                    fontWeight: 'bold',
                    borderRadius: 2,
                    '&:hover': { bgcolor: red[900] } 
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;