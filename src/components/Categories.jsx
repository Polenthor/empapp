import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c"
  },
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  },
  {
    name: "Kids",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"
  },
 
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    // 👉 navigate to product page with category
    navigate(`/imgd`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* 🔥 TITLE */}
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Shop by Categories
      </Typography>

      {/* 🔥 GRID */}
      <Grid container spacing={4}>
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                cursor: "pointer",
                borderRadius: "15px",
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)"
                }
              }}
              onClick={() => handleClick(cat.name)}
            >
              {/* IMAGE */}
              <CardMedia
                component="img"
                height="250"
                image={cat.image}
                alt={cat.name}
              />

              {/* TEXT */}
              <CardContent>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    {cat.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;