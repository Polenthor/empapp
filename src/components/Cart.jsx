import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  Stack,
  CircularProgress
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch cart
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Increase quantity
  const increaseQty = async (product) => {
    await api.post("/cart/add", { product });
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Decrease quantity
  const decreaseQty = async (productId) => {
    await api.post("/cart/decrease", { productId });
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Remove item
  const removeItem = async (productId) => {
    await api.delete(`/cart/remove/${productId}`);
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Total
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 💳 PAYMENT
  const handlePayment = async () => {
    try {
      const res = await api.post("/payment/create-order", {
        amount: totalAmount,
      });

      const order = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "MODARC",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          await api.post("/payment/verify", response);
          alert("Payment Successful 🎉");
        },

        theme: { color: "#000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  // 💰 Format price
  const formatRupee = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  // ⏳ Loading
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 🪹 Empty cart
  if (!cart.items.length) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <ShoppingCartIcon sx={{ fontSize: 80, color: "#999" }} />
        <Typography variant="h5" sx={{ mt: 2 }}>
          Your cart is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="800" sx={{ mb: 4 }}>
        Your Cart
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {cart.items.map((item) => (
              <Card
                key={item.productId}
                sx={{
                  display: "flex",
                  borderRadius: 3,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{ width: 140 }}
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="600">
                    {item.name}
                  </Typography>

                  <Typography color="success.main" fontWeight="700">
                    {formatRupee(item.price)}
                  </Typography>

                  {/* Quantity controls */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <IconButton onClick={() => decreaseQty(item.productId)}>
                      <RemoveIcon />
                    </IconButton>

                    <Typography>{item.quantity}</Typography>

                    <IconButton onClick={() => increaseQty(item)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>

                {/* Delete */}
                <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
                  <IconButton
                    color="error"
                    onClick={() => removeItem(item.productId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* RIGHT SIDE - SUMMARY */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="700" gutterBottom>
              Order Summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              Items: {cart.items.length}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Total: <b>{formatRupee(totalAmount)}</b>
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "black",
                "&:hover": { bgcolor: "#333" },
                py: 1.5,
                borderRadius: 2,
              }}
              onClick={handlePayment}
            >
              Proceed to Pay
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;