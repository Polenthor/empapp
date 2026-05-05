import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
  Menu,
  MenuItem
} from '@mui/material';

import {
  Person,
  Logout,
  Menu as MenuIcon,
  ShoppingCartCheckout
} from '@mui/icons-material';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { red, grey } from '@mui/material/colors';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const isJojoPage = location.pathname.startsWith("/jojo");

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate('/login');
  };

  // MENU HANDLERS
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 0 }}>

          {/* ================= LEFT: MENU + BRAND ================= */}
          <Box sx={{ display: 'flex', alignItems: 'center', }}>

            {/* MENU BUTTON (BEFORE MODARC) */}
            <Button
              onClick={openMenu}
              startIcon={<MenuIcon />}
              sx={{ color: 'white'}}
            ></Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem onClick={closeMenu}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Home
                </Link>
              </MenuItem>

              <MenuItem onClick={closeMenu}>
                <Link to="/collection" style={{ textDecoration: "none", color: "black" }}>
                  Collection
                </Link>
              </MenuItem>

              <MenuItem onClick={closeMenu}>
                <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
                  About Us
                </Link>
              </MenuItem>

              <MenuItem onClick={closeMenu}>
                <Link to="/categories" style={{ textDecoration: "none", color: "black" }}>
                  Categories
                </Link>
              </MenuItem>

              <MenuItem onClick={closeMenu}>
                <Link to="/contact" style={{ textDecoration: "none", color: "black" }}>
                  Contact
                </Link>
              </MenuItem>
            </Menu>

            {/* BRAND */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': { color: grey[400] }
              }}
            >
              MODARC
            </Typography>

          </Box>

          {/* ================= RIGHT SIDE ================= */}
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
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                    borderRadius: 2,
                    '&:hover': { bgcolor: grey[300] }
                  }}
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

                {user && (
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "white" }} startIcon={ShoppingCartCheckout}>
                      
                    </Button>
                  </Link>
                )}

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