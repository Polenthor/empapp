import React, { useState } from "react";
import axios from "axios";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    IconButton,
    Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Upload = () => {
    const [name, setName] = useState("");
    const [fileList, setFileList] = useState([]); // Array of { file, price, stock, previewUrl }

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Create an object for each file including a preview URL, empty price, and empty stock
        const newFiles = selectedFiles.map((file) => ({
            file: file,
            price: "",
            stock: "",
            previewUrl: URL.createObjectURL(file)
        }));

        setFileList((prev) => [...prev, ...newFiles]);
    };

    // Update specific price in the array
    const handlePriceChange = (index, value) => {
        const updatedList = [...fileList];
        updatedList[index].price = value;
        setFileList(updatedList);
    };

    // --- ADDED: Update specific stock in the array ---
    const handleStockChange = (index, value) => {
        const updatedList = [...fileList];
        updatedList[index].stock = value;
        setFileList(updatedList);
    };

    // Remove a file from the list
    const removeFile = (index) => {
        const updatedList = [...fileList];
        URL.revokeObjectURL(updatedList[index].previewUrl); // Clean up memory
        updatedList.splice(index, 1);
        setFileList(updatedList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || fileList.length === 0) {
            alert("Please enter a product name and select at least one image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);

        // Append each file, price, and stock
        fileList.forEach((item) => {
            formData.append("images", item.file);
            formData.append("prices", item.price);
            formData.append("stocks", item.stock); // <--- Append stocks to FormData
        });

        try {
            const res = await axios.post("http://localhost:3000/addm", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res.data);
            alert("Product with multiple prices and stock uploaded successfully!");
            // Reset form
            setName("");
            setFileList([]);
        } catch (err) {
            console.error(err);
            alert("Upload failed. Make sure your backend matches the 'prices' and 'stocks' fields.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Upload New Product
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Add a product name and set individual prices and stock for each image.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Product Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 4 }}
                    />

                    <Box
                        sx={{
                            border: "2px dashed #ccc",
                            borderRadius: 2,
                            p: 3,
                            textAlign: "center",
                            bgcolor: "#fafafa",
                            cursor: "pointer",
                            mb: 4,
                            "&:hover": { bgcolor: "#f0f0f0" }
                        }}
                        component="label"
                    >
                        <input
                            type="file"
                            multiple
                            hidden
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <CloudUploadIcon sx={{ fontSize: 40, color: "#666", mb: 1 }} />
                        <Typography>Click to select images (Multiple allowed)</Typography>
                    </Box>

                    {/* List of selected images with inputs */}
                    <Grid container spacing={2}>
                        {fileList.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <Paper variant="outlined" sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                                    <img
                                        src={item.previewUrl}
                                        alt="preview"
                                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                                    />
                                    <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Price (₹)"
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => handlePriceChange(index, e.target.value)}
                                            placeholder="Price"
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Stock Qty"
                                            type="number"
                                            value={item.stock}
                                            onChange={(e) => handleStockChange(index, e.target.value)}
                                            placeholder="Stock"
                                        />
                                    </Box>
                                    <IconButton color="error" onClick={() => removeFile(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {fileList.length > 0 && (
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ mt: 4, py: 1.5, fontWeight: "bold", bgcolor: "#2e7d32" }}
                        >
                            Confirm & Upload Product
                        </Button>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default Upload;