import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedUser"));

      if (!user) return;

      const res = await api.get(`/cart/${user._id}`);
      setCart(res.data || { items: [] });

    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ================= ADD ITEM =================
  const increaseQty = async (item) => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

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

  // ================= REMOVE ITEM =================
  const removeItem = async (productId) => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    await api.delete(`/cart/remove/${user._id}/${productId}`);

    fetchCart();
  };

  // ================= TOTAL =================
  const totalAmount = (cart.items || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatRupee = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount);

  // ================= PAYMENT =================
  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
      alert("Login required");
      navigate("/login");
      return;
    }

    if (!cart.items.length) {
      alert("Cart is empty");
      return;
    }

    try {
      const { data: order } = await api.post("/payment/create-order", {
        amount: totalAmount
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "MODARC",
        description: "Cart Payment",
        order_id: order.id,

        handler: async function (response) {
          await api.post("/payment/verify", {
            ...response,
            userId: user._id,
            products: cart.items,
            amount: totalAmount
          });

          alert("Payment Successful 🎉");
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }
  };

  // ================= UI STATES =================
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cart.items.length) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <ShoppingCartIcon sx={{ fontSize: 80 }} />
        <Typography variant="h5">Your cart is empty</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold">
        Your Cart
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* LEFT */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {cart.items.map((item) => (
              <Card key={item.productId} sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{ width: 140 }}
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography>{item.name}</Typography>

                  <Typography color="green">
                    {formatRupee(item.price)}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                      <RemoveIcon />
                    </IconButton>

                    <Typography>{item.quantity}</Typography>

                    <IconButton onClick={() => increaseQty(item)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>

                <IconButton
                  color="error"
                  onClick={() => removeItem(item.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Summary</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              Total: <b>{formatRupee(totalAmount)}</b>
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: "black" }}
              onClick={handlePayment}
            >
              Pay Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;