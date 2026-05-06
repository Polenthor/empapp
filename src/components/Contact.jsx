import React, { useState } from "react";
import api from "../api/axios"; // ✅ IMPORTANT

import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent
} from "@mui/material";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // ✅ SEND TO BACKEND
      await api.post("/contact", form);

      alert("Message sent successfully 🎉");

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      console.error("Error:", err);
      alert("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      {/* HEADER */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold">
          Contact Us
        </Typography>

        <Typography color="text.secondary" mt={1}>
          We’d love to hear from you!
        </Typography>
      </Box>

      <Grid container spacing={4}>

        {/* FORM */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Send a Message
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                margin="normal"
                value={form.name}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                value={form.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Message"
                name="message"
                margin="normal"
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: "black" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </Grid>

        {/* INFO */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Get in Touch
              </Typography>

              <Typography color="text.secondary" mb={2}>
                Have questions about our products or your order? Reach out to us anytime.
              </Typography>

              <Typography><b>Email:</b> supportmodarc@gmail.com</Typography>
              <Typography><b>Phone:</b> +91 99956 93792</Typography>
              <Typography><b>Address:</b> Malappuram, Kerala, India</Typography>

              <Box mt={3}>
                <Typography variant="body2" color="text.secondary">
                  Our team usually responds within 24 hours.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Contact;