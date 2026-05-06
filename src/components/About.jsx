import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Avatar
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      
      {/* 🔥 HEADER */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold">
          About MODARC
        </Typography>

        <Typography variant="h6" color="text.secondary" mt={2}>
          Redefining online shopping with simplicity, speed, and trust.
        </Typography>
      </Box>

      {/* 🔥 ABOUT TEXT */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="about"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Who We Are
          </Typography>

          <Typography color="text.secondary">
            MODARC is a modern e-commerce platform designed to deliver a smooth
            and reliable shopping experience. We aim to provide high-quality
            products with a seamless user interface and secure payment system.
          </Typography>

          <Typography color="text.secondary" mt={2}>
            Our mission is to make online shopping simple, fast, and accessible
            for everyone. Whether you're browsing products or making payments,
            MODARC ensures a hassle-free experience.
          </Typography>
        </Grid>
      </Grid>

      {/* 🔥 FEATURES */}
      <Box mt={10}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={5}>
          Why Choose Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 2 }}>
                <ShoppingCartIcon />
              </Avatar>

              <CardContent>
                <Typography variant="h6">Easy Shopping</Typography>
                <Typography color="text.secondary">
                  Simple UI with smooth browsing and quick checkout.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 2 }}>
                <SecurityIcon />
              </Avatar>

              <CardContent>
                <Typography variant="h6">Secure Payments</Typography>
                <Typography color="text.secondary">
                  Powered by Razorpay with full encryption and safety.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 2 }}>
                <LocalShippingIcon />
              </Avatar>

              <CardContent>
                <Typography variant="h6">Fast Delivery</Typography>
                <Typography color="text.secondary">
                  Quick and reliable delivery for all your orders.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* 🔥 FOOTER TEXT */}
      <Box mt={10} textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          Our Vision
        </Typography>

        <Typography color="text.secondary" mt={2}>
          To become a trusted e-commerce platform that delivers value,
          convenience, and satisfaction to every customer.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;