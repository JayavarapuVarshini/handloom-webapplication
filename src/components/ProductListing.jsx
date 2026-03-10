import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Rating,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

const products = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    description:
      "Handwoven Banarasi silk saree with intricate gold zari work, perfect for weddings and festive occasions.",
    price: "₹8,999",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.pexels.com/photos/15853773/pexels-photo-15853773/free-photo-of-a-woman-in-a-red-and-gold-saree-posing-in-front-of-a-building.jpeg",
    category: "Sarees",
    artisan: "Kashi Looms Collective",
    location: "Varanasi, Uttar Pradesh",
    deliveryTime: "5-7 days",
    isBestseller: true,
    isNewArrival: false,
  },
  {
    id: 2,
    name: "Handwoven Cotton Bedsheet",
    description:
      "Pure cotton double bedsheet with traditional geometric patterns, handwoven by local artisans.",
    price: "₹2,499",
    rating: 4.5,
    reviews: 89,
    image:
      "https://images.pexels.com/photos/6585762/pexels-photo-6585762.jpeg",
    category: "Home Decor",
    artisan: "Desert Weaves",
    location: "Jodhpur, Rajasthan",
    deliveryTime: "3-5 days",
    isBestseller: false,
    isNewArrival: true,
  },
  {
    id: 3,
    name: "Ikat Cotton Dupatta",
    description:
      "Handcrafted Ikat cotton dupatta with vibrant patterns, ideal for both casual and festive wear.",
    price: "₹1,799",
    rating: 4.2,
    reviews: 57,
    image:
      "https://images.pexels.com/photos/2772988/pexels-photo-2772988.jpeg",
    category: "Accessories",
    artisan: "Ikat Impressions",
    location: "Pochampally, Telangana",
    deliveryTime: "4-6 days",
    isBestseller: false,
    isNewArrival: true,
  },
  {
    id: 4,
    name: "Handloom Linen Saree",
    description:
      "Soft linen saree with subtle zari border, combining comfort with elegance for everyday wear.",
    price: "₹4,299",
    rating: 4.6,
    reviews: 76,
    image:
      "https://images.pexels.com/photos/15853772/pexels-photo-15853772/free-photo-of-a-woman-in-a-red-and-gold-sari-posing-in-front-of-a-building.jpeg",
    category: "Sarees",
    artisan: "Eastern Threads",
    location: "Bhubaneswar, Odisha",
    deliveryTime: "5-7 days",
    isBestseller: true,
    isNewArrival: false,
  },
  {
    id: 5,
    name: "Handwoven Woolen Shawl",
    description:
      "Warm woolen shawl with traditional patterns, handcrafted by artisans from the Himalayan region.",
    price: "₹3,999",
    rating: 4.7,
    reviews: 98,
    image:
      "https://images.pexels.com/photos/8697829/pexels-photo-8697829.jpeg",
    category: "Accessories",
    artisan: "Himalayan Looms",
    location: "Shimla, Himachal Pradesh",
    deliveryTime: "6-8 days",
    isBestseller: true,
    isNewArrival: true,
  },
  {
    id: 6,
    name: "Handloom Table Runner Set",
    description:
      "Handwoven table runner with matching placemats, featuring intricate patterns for elegant dining.",
    price: "₹1,599",
    rating: 4.1,
    reviews: 43,
    image:
      "https://images.pexels.com/photos/9957433/pexels-photo-9957433.jpeg",
    category: "Home Decor",
    artisan: "Weave & Dine",
    location: "Kochi, Kerala",
    deliveryTime: "3-5 days",
    isBestseller: false,
    isNewArrival: false,
  },
  {
    id: 7,
    name: "Block Print Cotton Kurta Fabric",
    description:
      "Unstitched cotton kurta fabric with hand block prints, perfect for custom ethnic wear.",
    price: "₹1,299",
    rating: 4.3,
    reviews: 65,
    image:
      "https://images.pexels.com/photos/6604444/pexels-photo-6604444.jpeg",
    category: "Fabrics",
    artisan: "BlockPrint Studio",
    location: "Jaipur, Rajasthan",
    deliveryTime: "4-6 days",
    isBestseller: false,
    isNewArrival: false,
  },
  {
    id: 8,
    name: "Handloom Cotton Curtain Set",
    description:
      "Set of two handwoven cotton curtains with minimalist design, ideal for modern homes.",
    price: "₹2,199",
    rating: 4.4,
    reviews: 52,
    image:
      "https://images.pexels.com/photos/6585766/pexels-photo-6585766.jpeg",
    category: "Home Decor",
    artisan: "Urban Loom",
    location: "Bengaluru, Karnataka",
    deliveryTime: "3-5 days",
    isBestseller: false,
    isNewArrival: true,
  },
  {
    id: 9,
    name: "Kalamkari Hand-Painted Dupatta",
    description:
      "Unique hand-painted Kalamkari dupatta with detailed mythological motifs, crafted on soft cotton.",
    price: "₹2,899",
    rating: 4.9,
    reviews: 112,
    image:
      "https://images.pexels.com/photos/15853771/pexels-photo-15853771/free-photo-of-a-woman-in-a-red-and-gold-sari-posing-in-front-of-a-building.jpeg",
    category: "Accessories",
    artisan: "Kalamkari Kalakaar",
    location: "Machilipatnam, Andhra Pradesh",
    deliveryTime: "6-9 days",
    isBestseller: true,
    isNewArrival: true,
  },
  {
    id: 10,
    name: "Handloom Yoga Mat",
    description:
      "Eco-friendly handwoven cotton yoga mat with natural colors and grip, perfect for daily practice.",
    price: "₹1,999",
    rating: 4.0,
    reviews: 34,
    image:
      "https://images.pexels.com/photos/8436580/pexels-photo-8436580.jpeg",
    category: "Others",
    artisan: "Mindful Weaves",
    location: "Pune, Maharashtra",
    deliveryTime: "4-6 days",
    isBestseller: false,
    isNewArrival: true,
  },
];

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          transition: "all 0.3s ease",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="260"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: "cover",
            filter: "saturate(1.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 1,
          }}
        >
          {product.isBestseller && (
            <Chip
              label="Bestseller"
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "#c62828",
                fontWeight: 600,
              }}
            />
          )}
          {product.isNewArrival && (
            <Chip
              label="New"
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "#2e7d32",
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <IconButton
          onClick={() => setIsFavorite(!isFavorite)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            minHeight: 56,
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: 60,
          }}
        >
          {product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {product.rating.toFixed(1)} ({product.reviews})
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            mt: 1.5,
            fontWeight: 700,
          }}
        >
          {product.price}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={product.category}
            size="small"
            sx={{
              backgroundColor: "#fbe9e7",
              color: "#d84315",
              mr: 1,
            }}
          />
          <Chip
            label={product.location}
            size="small"
            sx={{
              backgroundColor: "#e3f2fd",
              color: "#1565c0",
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          Delivered in {product.deliveryTime}
        </Typography>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Artisan: <span style={{ fontWeight: 700 }}>{product.artisan}</span>
        </Typography>
      </CardContent>

      <Box
        sx={{
          p: 2,
          pt: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FavoriteBorderIcon />}
          sx={{ borderRadius: 999 }}
        >
          Wishlist
        </Button>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          sx={{
            borderRadius: 999,
            background:
              "linear-gradient(135deg, #ff7043, #f4511e, #d84315)",
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

const categories = [
  "All",
  "Sarees",
  "Home Decor",
  "Accessories",
  "Fabrics",
  "Others",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest Arrivals" },
];

const ITEMS_PER_PAGE = 6;

const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartSnackbarOpen, setCartSnackbarOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceLowHigh":
        return (
          parseInt(a.price.replace(/[^\d]/g, "")) -
          parseInt(b.price.replace(/[^\d]/g, ""))
        );
      case "priceHighLow":
        return (
          parseInt(b.price.replace(/[^\d]/g, "")) -
          parseInt(a.price.replace(/[^\d]/g, ""))
        );
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
    setCartSnackbarOpen(true);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 4,
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            height: { xs: 220, md: 280 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(https://images.pexels.com/photos/15853773/pexels-photo-15853773/free-photo-of-a-woman-in-a-red-and-gold-saree-posing-in-front-of-a-building.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.4)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              color: "white",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: { xs: 3, md: 6 },
            }}
          >
            <Typography
              variant="overline"
              sx={{ letterSpacing: 3, opacity: 0.9 }}
            >
              ARTISAN MARKETPLACE
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              Discover Authentic Handloom Treasures
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 600,
                opacity: 0.9,
                fontSize: 16,
              }}
            >
              Shop directly from skilled artisans across India. Each handcrafted
              piece carries a story woven with tradition, culture, and care.
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              right: 20,
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              borderRadius: 999,
              px: 2,
              py: 0.5,
              backdropFilter: "blur(12px)",
            }}
          >
            <Typography variant="caption">
              Over 500+ products from 50+ artisan communities
            </Typography>
          </Box>
        </Box>

        <Card
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 3,
            boxShadow: "0 6px 25px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(to right, #ffffff, #fff8f2)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by product, artisan, location, or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SortIcon fontSize="small" />
                    <span>Sort By</span>
                  </Box>
                </InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>

        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Handpicked for You
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showing {sortedProducts.length} product
            {sortedProducts.length !== 1 ? "s" : ""} from artisans across India
          </Typography>
        </Box>

        {paginatedProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Try adjusting your search or filters to find more handloom
              products.
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("featured");
              }}
            >
              Clear Filters
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <div
                    onClick={() => handleQuickView(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <ProductCard product={product} />
                  </div>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </Button>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index + 1}
                      variant={
                        currentPage === index + 1 ? "contained" : "outlined"
                      }
                      onClick={() => setCurrentPage(index + 1)}
                      sx={{
                        minWidth: 40,
                        borderRadius: 999,
                        ...(currentPage === index + 1 && {
                          background:
                            "linear-gradient(135deg, #ff7043, #f4511e)",
                        }),
                      }}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </Box>

                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </Button>
              </Box>
            )}
          </>
        )}

        <Dialog
          open={!!quickViewProduct}
          onClose={handleCloseQuickView}
          maxWidth="md"
          fullWidth
        >
          {quickViewProduct && (
            <>
              <DialogTitle>
                {quickViewProduct.name}
                <Typography variant="subtitle2" color="text.secondary">
                  By {quickViewProduct.artisan} • {quickViewProduct.location}
                </Typography>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                      }}
                    >
                      <img
                        src={quickViewProduct.image}
                        alt={quickViewProduct.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {quickViewProduct.price}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating
                        value={quickViewProduct.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {quickViewProduct.rating.toFixed(1)} (
                        {quickViewProduct.reviews} reviews)
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 2, whiteSpace: "pre-line" }}
                    >
                      {quickViewProduct.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={quickViewProduct.category}
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={quickViewProduct.isBestseller ? "Bestseller" : ""}
                        color="error"
                        sx={{ mr: 1, display: quickViewProduct.isBestseller ? "inline-flex" : "none" }}
                      />
                      <Chip
                        label={quickViewProduct.isNewArrival ? "New Arrival" : ""}
                        color="success"
                        sx={{
                          display: quickViewProduct.isNewArrival
                            ? "inline-flex"
                            : "none",
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Estimated delivery:{" "}
                      <strong>{quickViewProduct.deliveryTime}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Artisan:{" "}
                      <strong>{quickViewProduct.artisan}</strong>
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(quickViewProduct)}
                      sx={{
                        mr: 2,
                        background:
                          "linear-gradient(135deg, #ff7043, #f4511e, #d84315)",
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FavoriteBorderIcon />}
                    >
                      Add to Wishlist
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseQuickView}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Snackbar
          open={cartSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setCartSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setCartSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product added to cart!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ProductListing;
