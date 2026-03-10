import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Rating,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = location.state?.product;

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" gutterBottom>
          Product not found
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  // 🔹 Debug logs you mentioned:
  console.log("Product Detail - Artisan Data:", product.artisan);
  console.log("Artisan Type:", typeof product.artisan);

  // 🔹 Normalize price for cart (we can keep the formatted version for UI)
  const getNumericPrice = () => {
    const raw = product.price;
    if (typeof raw === "number") return raw;
    if (typeof raw === "string") {
      const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
      return isNaN(n) ? 0 : n;
    }
    if (typeof raw === "object" && raw !== null) {
      const fromObj =
        raw.amount ??
        raw.value ??
        raw.price ??
        null;
      if (typeof fromObj === "number") return fromObj;
      if (typeof fromObj === "string") {
        const n = parseInt(fromObj.replace(/[^\d]/g, ""), 10);
        return isNaN(n) ? 0 : n;
      }
    }
    return 0;
  };

  const handleAddToCart = () => {
    const numericPrice = getNumericPrice();

    addToCart({
      id: product.id,
      name: product.name,
      // store as number – CartContext can handle number or string
      price: numericPrice,
      image: product.image || product.images?.[0],
      artisan: product.artisan,
      category: product.category,
    });
  };

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={product.image || product.images?.[0]}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {product.rating && (
                <>
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {product.rating.toFixed(1)} ({product.reviews || 0} reviews)
                  </Typography>
                </>
              )}
            </Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#e65100", mb: 2 }}
            >
              {typeof product.price === "string"
                ? product.price
                : `₹${getNumericPrice()}`}
            </Typography>

            <Box sx={{ mb: 2 }}>
              {product.category && (
                <Chip
                  label={product.category}
                  sx={{ mr: 1, mb: 1 }}
                />
              )}
              {product.location && (
                <Chip
                  label={product.location}
                  sx={{ mr: 1, mb: 1 }}
                />
              )}
            </Box>

            {product.description && (
              <Typography variant="body1" sx={{ mb: 3 }}>
                {product.description}
              </Typography>
            )}

            <Typography variant="body2" sx={{ mb: 1 }}>
              Artisan:{" "}
              <strong>
                {typeof product.artisan === "object"
                  ? product.artisan.name || JSON.stringify(product.artisan)
                  : product.artisan || "Unknown"}
              </strong>
            </Typography>

            {product.deliveryTime && (
              <Typography variant="body2" sx={{ mb: 3 }}>
                Estimated Delivery:{" "}
                <strong>{product.deliveryTime}</strong>
              </Typography>
            )}

            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                background:
                  "linear-gradient(135deg, #ff7043, #f4511e, #d84315)",
              }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
