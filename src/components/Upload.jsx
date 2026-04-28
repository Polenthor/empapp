import React, { useState } from "react";
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    Paper, 
    IconButton,
    Grid,
    Alert,
    Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// 1. IMPORT YOUR CUSTOM API INSTANCE
import api from "../api/axios"; 

const Upload = () => {
    const [name, setName] = useState("");
    const [fileList, setFileList] = useState([]); // Array of { file, price, stock, previewUrl }
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const newFiles = selectedFiles.map((file) => ({
            file: file,
            price: "",
            stock: "",
            previewUrl: URL.createObjectURL(file)
        }));

        setFileList((prev) => [...prev, ...newFiles]);
        setMessage({ type: "", text: "" });
    };

    const handlePriceChange = (index, value) => {
        const updatedList = [...fileList];
        updatedList[index].price = value;
        setFileList(updatedList);
    };

    const handleStockChange = (index, value) => {
        const updatedList = [...fileList];
        updatedList[index].stock = value;
        setFileList(updatedList);
    };

    const removeFile = (index) => {
        const updatedList = [...fileList];
        URL.revokeObjectURL(updatedList[index].previewUrl); 
        updatedList.splice(index, 1);
        setFileList(updatedList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || fileList.length === 0) {
            setMessage({ type: "error", text: "Please enter a product name and select at least one image." });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);

        fileList.forEach((item) => {
            formData.append("images", item.file);
            formData.append("prices", item.price);
            formData.append("stocks", item.stock);
        });

        try {
            // 2. USE THE 'api' INSTANCE
            await api.post("/addm", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            setMessage({ type: "success", text: "Product variations uploaded successfully!" });
            setName("");
            setFileList([]);
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Upload failed. Check backend field mapping." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper elevation={0} sx={{ p: 5, border: '1px solid #eee', borderRadius: 0 }}>
                <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: 1, mb: 1 }}>
                    INVENTORY UPLOAD
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
                    Configure product variations with unique pricing and stock levels.
                </Typography>

                {message.text && (
                    <Alert severity={message.type} sx={{ mb: 4, borderRadius: 0 }}>
                        {message.text}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Main Product Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 6 }}
                    />

                    <Box
                        sx={{
                            border: "1px dashed #000",
                            p: 5,
                            textAlign: "center",
                            bgcolor: "#fafafa",
                            cursor: "pointer",
                            mb: 6,
                            transition: "0.2s",
                            "&:hover": { bgcolor: "#f5f5f5" }
                        }}
                        component="label"
                    >
                        <input type="file" multiple hidden onChange={handleFileChange} accept="image/*" />
                        <CloudUploadIcon sx={{ fontSize: 40, color: "black", mb: 2 }} />
                        <Typography variant="subtitle2" fontWeight="bold">SELECT ASSETS</Typography>
                        <Typography variant="caption" color="text.secondary">Drop multiple images here</Typography>
                    </Box>

                    <Stack spacing={3}>
                        {fileList.map((item, index) => (
                            <Paper 
                                key={index} 
                                variant="outlined" 
                                sx={{ p: 2, display: "flex", alignItems: "center", gap: 3, borderRadius: 0 }}
                            >
                                <img
                                    src={item.previewUrl}
                                    alt="preview"
                                    style={{ width: 100, height: 100, objectFit: "cover" }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Price (₹)"
                                                type="number"
                                                variant="standard"
                                                value={item.price}
                                                onChange={(e) => handlePriceChange(index, e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Stock Count"
                                                type="number"
                                                variant="standard"
                                                value={item.stock}
                                                onChange={(e) => handleStockChange(index, e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <IconButton color="error" onClick={() => removeFile(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Paper>
                        ))}
                    </Stack>

                    {fileList.length > 0 && (
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{ 
                                mt: 6, 
                                py: 2, 
                                fontWeight: "bold", 
                                bgcolor: "black", 
                                borderRadius: 0,
                                letterSpacing: 2,
                                "&:hover": { bgcolor: "#333" } 
                            }}
                        >
                            {loading ? "UPLOADING..." : "PUBLISH TO STORE"}
                        </Button>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default Upload;