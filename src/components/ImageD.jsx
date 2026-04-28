import React, { useEffect, useState } from "react";
// 1. IMPORT YOUR CUSTOM API INSTANCE INSTEAD OF AXIOS
import api from "../api/axios"; 
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Divider,
  Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const ImageD = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // 2. UPDATE THE FETCH CALL
  useEffect(() => {
    // We only use the relative path "/products" because the baseURL is handled in api/axios.js
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleOpenDetails = (product, imgObj) => {
    setSelectedItem({
      name: product.name,
      url: imgObj.url,
      price: imgObj.price,
      stock: imgObj.stock,
      id: product._id
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleAuthRedirect = () => {
    const loggedUser = localStorage.getItem("loggedUser");
    
    if (!loggedUser) {
      alert("Please login to proceed with the purchase.");
      navigate('/login');
    } else {
      // Logic for adding to cart goes here
      alert("Item added to cart successfully!");
    }
  };

  const formatRupee = (amount) => 
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" fontWeight="800" sx={{ mb: 6, color: '#1a1a1a' }}>
        Store Gallery
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          product.image.map((imgObj, index) => (
            <Grid item key={`${product._id}-${index}`} xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 4,
                  position: 'relative',
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleOpenDetails(product, imgObj)}
              >
                {imgObj.stock <= 0 && (
                   <Box sx={{
                     position: 'absolute', top: 10, left: 10, zIndex: 2,
                     bgcolor: 'rgba(255,0,0,0.8)', color: 'white',
                     px: 1, borderRadius: 1, fontWeight: 'bold', fontSize: '0.75rem'
                   }}>
                     OUT OF STOCK
                   </Box>
                )}

                <CardMedia
                  component="img"
                  sx={{ height: 240, objectFit: "cover", opacity: imgObj.stock <= 0 ? 0.5 : 1 }}
                  image={imgObj.url}
                  alt={product.name}
                />
                
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="600" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="h5" fontWeight="700" color="success.main" sx={{ mt: 1 }}>
                    {formatRupee(imgObj.price)}
                  </Typography>
                  
                  <Typography variant="caption" sx={{ color: imgObj.stock < 5 && imgObj.stock > 0 ? 'orange' : 'text.secondary' }}>
                    {imgObj.stock <= 0 ? "Sold Out" : imgObj.stock < 5 ? `Only ${imgObj.stock} left!` : "In Stock"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ))}
      </Grid>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selectedItem && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ px: 4, pb: 4 }}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                  <Box 
                    component="img"
                    src={selectedItem.url} 
                    alt={selectedItem.name} 
                    sx={{ 
                      width: '100%', borderRadius: 4, 
                      filter: selectedItem.stock <= 0 ? 'grayscale(100%)' : 'none',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      aspectRatio: '1/1', objectFit: 'cover'
                    }} 
                  />
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip 
                      label={selectedItem.stock > 0 ? "In Stock" : "Out of Stock"} 
                      color={selectedItem.stock > 0 ? "success" : "error"} 
                      size="small" 
                    />
                  </Stack>

                  <Typography variant="h4" fontWeight="800" gutterBottom>
                    {selectedItem.name}
                  </Typography>
                  
                  <Typography variant="h3" fontWeight="700" color="success.main" sx={{ mb: 1 }}>
                    {formatRupee(selectedItem.price)}
                  </Typography>

                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    A premium addition to our collection. This {selectedItem.name} offers unmatched quality and style. 
                  </Typography>

                  {selectedItem.stock > 0 && selectedItem.stock < 5 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#ed6c02', mb: 2 }}>
                       <ErrorOutlineIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                       <Typography variant="body2" fontWeight="bold">
                         Hurry! Only {selectedItem.stock} items left in stock.
                       </Typography>
                    </Box>
                  )}

                  <Box sx={{ flexGrow: 1 }} />

                  <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      disabled={selectedItem.stock <= 0}
                      startIcon={<ShoppingCartIcon />}
                      sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' }, py: 1.5, borderRadius: 2 }}
                      onClick={handleAuthRedirect}
                    >
                      ADD TO CART
                    </Button>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      disabled={selectedItem.stock <= 0}
                      startIcon={<FlashOnIcon />}
                      sx={{ bgcolor: '#fb641b', '&:hover': { bgcolor: '#f4511e' }, py: 1.5, borderRadius: 2 }}
                      onClick={handleAuthRedirect}
                    >
                      {selectedItem.stock > 0 ? "BUY NOW" : "SOLD OUT"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ImageD;