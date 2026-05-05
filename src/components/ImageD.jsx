import React, { useEffect, useState } from "react";
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

  // ✅ FIXED: Safe API handling
  useEffect(() => {
    api.get("/products")
      .then((res) => {
        console.log("API DATA:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
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

  // ✅ CART WORKING
  const handleAuthRedirect = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
      alert("Please login to proceed with the purchase.");
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart/add", {
        userId: loggedUser._id,
        product: {
          productId: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          image: selectedItem.url
        }
      });

      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Cart error:", err);
      alert("Failed to add to cart");
    }
  };

  const formatRupee = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" fontWeight="800" sx={{ mb: 6 }}>
        Store Gallery
      </Typography>

      {/* ✅ FIXED GRID */}
      <Grid container spacing={4}>
        {products.map((product) =>
          product.image?.map((imgObj, index) => (
            <Grid key={`${product._id}-${index}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleOpenDetails(product, imgObj)}
              >
                {imgObj.stock <= 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      bgcolor: "red",
                      color: "#fff",
                      px: 1,
                      borderRadius: 1,
                      fontSize: 12,
                    }}
                  >
                    OUT OF STOCK
                  </Box>
                )}

                <CardMedia
                  component="img"
                  sx={{
                    height: 240,
                    objectFit: "cover",
                    opacity: imgObj.stock <= 0 ? 0.5 : 1,
                  }}
                  image={imgObj.url}
                  alt={product.name}
                />

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>

                  <Typography variant="h5" color="green">
                    {formatRupee(imgObj.price)}
                  </Typography>

                  <Typography variant="caption">
                    {imgObj.stock <= 0
                      ? "Sold Out"
                      : imgObj.stock < 5
                      ? `Only ${imgObj.stock} left!`
                      : "In Stock"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* ✅ MODAL */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {selectedItem && (
          <>
            <DialogTitle>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.name}
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h4">{selectedItem.name}</Typography>

                  <Typography variant="h5" color="green" sx={{ mt: 2 }}>
                    {formatRupee(selectedItem.price)}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      sx={{ bgcolor: "black" }}
                      onClick={handleAuthRedirect}
                    >
                      ADD TO CART
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<FlashOnIcon />}
                      sx={{ bgcolor: "orange" }}
                      onClick={handleAuthRedirect}
                    >
                      BUY NOW
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