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
import { useNavigate, Link } from 'react-router-dom';

// 1. IMPORT YOUR CUSTOM API INSTANCE
import api from '../api/axios'; 

const Signup = () => {
  const [user, setUser] = useState({
    Username: "",
    Password: "",
    Re_enterpassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
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

    setLoading(true);

    // 2. USE THE 'api' INSTANCE INSTEAD OF AXIOS
    api.post("/signup", user)
      .then((res) => {
        alert("Signup successful! Please log in.");
        navigate('/login'); 
      })
      .catch((err) => {
        console.error("Signup error:", err);
        // Handling the error message more gracefully
        const errMsg = err.response?.data?.message || "Signup failed. Username might be taken.";
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
        backgroundColor: '#fff', // Switched to clean white to match Home/ImageD
        py: 4
      }}
    >
      <Container maxWidth="xs">
        <Paper 
          elevation={0} // Flat, modern look
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 0, // Sharp edges for premium feel
            border: '1px solid #eee' // Subtle border instead of heavy shadow
          }}
        >
          {/* Brand Icon */}
          <Box sx={{ bgcolor: 'black', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <PersonAddOutlined sx={{ color: 'white' }} />
          </Box>
          
          <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: 1, mb: 1 }}>
            JOIN MODARC
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Enter your details to create a premium account.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 0 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={addHandler} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="Username"
                  variant="standard" // Standard looks more "Fashion Brand" than Outlined
                  value={user.Username}
                  onChange={inputHandler}
                  autoComplete="username"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="Password"
                  type="password"
                  variant="standard"
                  value={user.Password}
                  onChange={inputHandler}
                  autoComplete="new-password"
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="Re_enterpassword"
                  type="password"
                  variant="standard"
                  value={user.Re_enterpassword}
                  onChange={inputHandler}
                  autoComplete="new-password"
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>

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
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already a member?{' '}
                <Link to="/login" style={{ color: 'black', fontWeight: '900', textDecoration: 'underline' }}>
                  SIGN IN
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