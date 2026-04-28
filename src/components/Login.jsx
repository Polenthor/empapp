import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Container, 
  Paper,
  Alert,
  Stack
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

// 1. IMPORT YOUR CENTRALIZED API INSTANCE
import api from '../api/axios'; 

const Login = () => {
  const [user, setUser] = useState({ Username: "", Password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const loginHandler = async (e) => {
    console.log("Sending to backend:", user);
    if (e) e.preventDefault(); // Prevents page reload if wrapped in a form

    if (!user.Username || !user.Password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    // 2. USE THE 'api' INSTANCE 
    // Recommended: Use a POST route for login for better security
    api.post("/login", user)
      .then((res) => {
        // Store user info (token or user object) in localStorage
        localStorage.setItem("loggedUser", JSON.stringify(res.data));
        alert("Login successful!");
        navigate('/imgd');
      })
      .catch((err) => {
        console.error("Login error:", err);
        const errMsg = err.response?.data?.message || "Invalid username or password.";
        setError(errMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
        py: 4
      }}
    >
      <Container maxWidth="xs">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 5, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 0,
            border: '1px solid #eee'
          }}
        >
          {/* Brand Icon */}
          <Box sx={{ bgcolor: 'black', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <LockOutlined sx={{ color: 'white' }} />
          </Box>
          
          <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: 1, mb: 1 }}>
            MODARC LOGIN
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 5, textAlign: 'center' }}>
            Enter your credentials to access the dashboard.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 0 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={loginHandler} sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Username"
                name="Username"
                variant="standard"
                value={user.Username}
                onChange={inputHandler}
                autoComplete="username"
              />
              
              <TextField
                fullWidth
                label="Password"
                name="Password"
                type="password"
                variant="standard"
                value={user.Password}
                onChange={inputHandler}
                autoComplete="current-password"
              />
            </Stack>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 6, 
                mb: 2, 
                bgcolor: 'black', 
                py: 1.5,
                borderRadius: 0,
                fontWeight: 'bold',
                letterSpacing: 1,
                '&:hover': { bgcolor: '#333' } 
              }}
            >
              {loading ? "VERIFYING..." : "SIGN IN"}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                New to Modarc?{' '}
                <Link to="/signup" style={{ color: 'black', fontWeight: '900', textDecoration: 'underline' }}>
                  CREATE ACCOUNT
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