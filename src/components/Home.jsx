import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import logo from "/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", color: "#000" }}>
      
      {/* Navbar */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 5,
        py: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          MODARC
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Button style={{color:"black"}}>Home</Button>
          <Button style={{color:"black"}}>Collection</Button>
          <Button style={{color:"black"}}>About Us</Button>
          <Button style={{color:"black"}}>Categories</Button>
          <Button style={{color:"black"}}>Contact</Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
           <span>👤</span>
          <Link to ='/upload'><span>🛍️</span></Link>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{
        textAlign: "center",
        mt: 10,
        px: 2
      }}>

 <img
        src={logo}
        alt="logo"
        style={{ width: '150px', borderRadius: '10%' }}
      /><br /><br />
        
        <Typography sx={{ letterSpacing: 3, fontSize: 14 }}>
          STYLE THAT SPEAKS
        </Typography>


        <Typography
          sx={{
            fontSize: { xs: 50, md: 100 },
            fontWeight: "bold",
            letterSpacing: 10,
            mt: 2
          }}
        >
          MODARC
        </Typography>

        <Typography sx={{ fontSize: 20, mt: 2 }}>
          Redefining Modern Fashion
        </Typography>

        <Typography sx={{ mt: 2, maxWidth: 500, mx: "auto", color: "#555" }}>
          Modarc is a premium clothing brand focused on minimalist design,
          bold identity, and everyday comfort.
        </Typography>

        {/* Buttons */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              px: 4,
              py: 1.5
            }}
          >
            EXPLORE COLLECTION
          </Button>

          <Link to ='/imgd'>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#000",
              color: "#000",
              px: 4,
              py: 1.5
            }}
          >
            SHOP NOW
          </Button></Link>
          
        </Box>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mt: 10, px: 5 }}>
        
        <Grid item xs={12} md={4} textAlign="center">
          <Typography fontSize={40}>👕</Typography>
          <Typography fontWeight="bold">PREMIUM QUALITY</Typography>
          <Typography color="#666">
            Finest fabrics for unmatched comfort and style.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Typography fontSize={40}>⭐</Typography>
          <Typography fontWeight="bold">MODERN DESIGNS</Typography>
          <Typography color="#666">
            Clean, minimal and timeless pieces.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Typography fontSize={40}>🛡️</Typography>
          <Typography fontWeight="bold">BUILT TO LAST</Typography>
          <Typography color="#666">
            Durable clothing made for everyday life.
          </Typography>
        </Grid>

      </Grid>

      {/* New Arrivals */}
      <Box sx={{ textAlign: "center", mt: 10, mb: 10 }}>
        <Typography sx={{ letterSpacing: 3 }}>
          — NEW ARRIVALS —
        </Typography>

        <Typography sx={{ mt: 2, color: "#666" }}>
          Discover our latest collection crafted for comfort, designed for style.
        </Typography>
      </Box>

    </Box>
  );
};

export default Home;