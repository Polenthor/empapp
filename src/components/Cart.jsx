import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await api.get(`/cart/${user._id}`);
    setCart(res.data.items || []);
  };

  // ➕ Increase quantity
  const increaseQty = async (item) => {
    await api.post("/cart/add", {
      userId: user._id,
      product: {
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image
      }
    });
    fetchCart();
  };

  // ➖ Decrease quantity
  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    await api.post("/cart/decrease", {
      userId: user._id,
      productId: item.productId
    });

    fetchCart();
  };

  // ❌ Remove item
  const removeItem = async (productId) => {
    await api.delete(`/cart/remove/${user._id}/${productId}`);
    fetchCart();
  };

  // 💰 Total price
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="800" mb={4}>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty 🛒
        </Typography>
      ) : (
        <Grid container spacing={4}>
          
          {/* LEFT SIDE - ITEMS */}
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <Card
                key={item.productId}
                sx={{
                  display: "flex",
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: 3
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{ width: 150, objectFit: "cover" }}
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="600">
                    {item.name}
                  </Typography>

                  <Typography color="text.secondary">
                    ₹{item.price}
                  </Typography>

                  {/* Quantity Controls */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <IconButton onClick={() => decreaseQty(item)}>
                      <RemoveIcon />
                    </IconButton>

                    <Typography>{item.quantity}</Typography>

                    <IconButton onClick={() => increaseQty(item)}>
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Remove */}
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => removeItem(item.productId)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* RIGHT SIDE - SUMMARY */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                position: "sticky",
                top: 20
              }}
            >
              <Typography variant="h6" fontWeight="700" mb={2}>
                Order Summary
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Items</Typography>
                <Typography>{cart.length}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Total</Typography>
                <Typography fontWeight="700">₹{total}</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "black",
                  "&:hover": { bgcolor: "#333" },
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                Checkout
              </Button>
            </Paper>
          </Grid>

        </Grid>
      )}
    </Box>
  );
};

export default Cart;