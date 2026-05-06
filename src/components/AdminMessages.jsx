import React, { useEffect, useState } from "react";
import api from "../api/axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Divider,
  Button
} from "@mui/material";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchMessages = async () => {
    try {
      const res = await api.get("/admin/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ================= DELETE =================
  const deleteMessage = async (id) => {
    try {
      await api.delete(`/admin/message/${id}`);

      // remove from UI instantly
      setMessages((prev) => prev.filter((msg) => msg._id !== id));

    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  // ================= UI =================
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Customer Messages
      </Typography>

      <Stack spacing={3}>
        {messages.length === 0 ? (
          <Typography>No messages found</Typography>
        ) : (
          messages.map((msg) => (
            <Card key={msg._id}>
              <CardContent>

                <Typography variant="h6">
                  {msg.name}
                </Typography>

                <Typography color="text.secondary">
                  {msg.email}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography>
                  {msg.message}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {new Date(msg.createdAt).toLocaleString()}
                </Typography>

                {/* ✅ DELETE BUTTON */}
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => deleteMessage(msg._id)}
                >
                  Delete
                </Button>

              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
};

export default AdminMessages;