import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Box, 
  Container, 
  InputAdornment, 
  IconButton,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ Username: "", Password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const loginHandler = (e) => {
    // Prevent page reload if called from a form
    if(e) e.preventDefault();

    if (!user.Username || !user.Password) {
      setError("Please enter both username and password.");
      return;
    }

    axios.get("http://localhost:3000/view")
      .then((res) => {
        const foundUser = res.data.find(
          (u) => u.Username === user.Username && u.Password === user.Password
        );

        if (foundUser) {
          localStorage.setItem("loggedUser", JSON.stringify(foundUser));
          navigate('/imgd');
        } else {
          setError("Invalid username or password.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Unable to connect to server. Please try again.");
      });
  };

  return (
    <Box 
      sx={{ 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)' 
      }}
    >
      <Container maxWidth="xs">
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 3
          }}
        >
          {/* Icon and Title */}
          <Box sx={{ bgcolor: 'black', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <LockOutlined sx={{ color: 'white' }} />
          </Box>
          
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please enter your details to sign in.
          </Typography>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={loginHandler} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Username"
              name="Username"
              variant="outlined"
              margin="normal"
              value={user.Username}
              onChange={inputHandler}
              autoComplete="username"
            />
            
            <TextField
              fullWidth
              label="Password"
              name="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={user.Password}
              onChange={inputHandler}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: 'black', 
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#333' } 
              }}
            >
              Sign In
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;