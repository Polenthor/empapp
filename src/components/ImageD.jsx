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
import { useNavigate } from "react-router-dom";

const ImageD = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    api.get("/products")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ OPEN MODAL
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

  // ✅ ADD TO CART
  const handleAddToCart = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
      alert("Login required");
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

      alert("Added to cart ✅");
    } catch (err) {
      console.error(err);
      alert("Cart failed");
    }
  };

  // ✅ RAZORPAY PAYMENT
  const handlePayment = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
      alert("Login required");
      navigate("/login");
      return;
    }

    const amount = selectedItem.price;

    try {
      // 1️⃣ Create order
      const { data: order } = await api.post("/payment/create-order", {
        amount
      });

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "MODARC",
        description: selectedItem.name,
        order_id: order.id,

        handler: async function (response) {
          try {
            await api.post("/payment/verify", {
              ...response,
              userId: loggedUser._id,
              products: [selectedItem],
              amount
            });

            alert("Payment Successful 🎉");
          } catch (err) {
            console.error(err);
            alert("Verification failed");
          }
        },

        prefill: {
          name: loggedUser.Username
        },

        theme: {
          color: "#000"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  // ✅ FORMAT PRICE
  const formatRupee = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount || 0);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" sx={{ mb: 5 }}>
        Store Gallery
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) =>
          product.image.map((img, index) => (
            <Grid key={index}>
              <Card onClick={() => handleOpenDetails(product, img)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={img.url}
                />
                <CardContent>
                  <Typography>{product.name}</Typography>
                  <Typography color="green">
                    {formatRupee(img.price)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* MODAL */}
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
                <Grid>
                  <img
                    src={selectedItem.url}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid>
                  <Typography variant="h5">
                    {selectedItem.name}
                  </Typography>

                  <Typography variant="h6" color="green">
                    {formatRupee(selectedItem.price)}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={handleAddToCart}
                    >
                      
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={<FlashOnIcon />}
                      onClick={handlePayment}
                      sx={{ backgroundColor: "#fb641b" }}
                    >
                      Buy Now
                    </Button>
                  </Stack>
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