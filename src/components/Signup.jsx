import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Box, 
  Container, 
  Alert,
  Grid
} from '@mui/material';
import { PersonAddOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    Username: "",
    Password: "",
    Re_enterpassword: "",
    
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const addHandler = (e) => {
    if(e) e.preventDefault();

    if (!user.Username || !user.Password || !user.Re_enterpassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (user.Password !== user.Re_enterpassword) {
      setError("Passwords do not match.");
      return;
    }

    axios.post("http://localhost:3000/signup", user)
      .then((res) => {
        alert("Signup successful!");
        navigate('/login'); // Usually best to redirect to login after signup
      })
      .catch((err) => {
        console.error("Signup error:", err);
        setError("Signup failed. Username might already be taken.");
      });
  };

  return (
    <Box 
      sx={{ 
        minHeight: '95vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
        py: 4
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
          {/* Signup Icon */}
          <Box sx={{ bgcolor: 'black', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <PersonAddOutlined sx={{ color: 'white' }} />
          </Box>
          
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join Modarc to start your premium experience.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={addHandler} sx={{ width: '100%' }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="Username"
                  variant="outlined"
                  value={user.Username}
                  onChange={inputHandler}
                  margin="dense"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="Password"
                  type="password"
                  variant="outlined"
                  value={user.Password}
                  onChange={inputHandler}
                  margin="dense"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Re-enter Password"
                  name="Re_enterpassword"
                  type="password"
                  variant="outlined"
                  value={user.Re_enterpassword}
                  onChange={inputHandler}
                  margin="dense"
                />
              </Grid>

              <Grid item xs={12}>
                
              </Grid>
            </Grid>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ 
                mt: 4, 
                mb: 2, 
                bgcolor: 'black', 
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#333' } 
              }}
            >
              Sign Up
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;