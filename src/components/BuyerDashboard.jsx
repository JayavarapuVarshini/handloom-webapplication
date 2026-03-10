import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Badge,
  Rating,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  ShoppingBag,
  Favorite,
  Dashboard,
  Home,
  Logout,
  Person,
  Search,
  ShoppingCart,
  Receipt,
  NewReleases,
  Whatshot,
  ExpandMore,
  FilterList,
  Star,
  CheckCircle,
  LocalShipping,
  AssignmentTurnedIn,
  Delete,
  Add,
  Remove,
} from "@mui/icons-material";

// Import required components
import ProductDetail from "./ProductDetail";
import Checkout from "./Checkout";

// Add this function to BuyerDashboard
const generateProductImage = (productId, productName) => {
  const colors = ['#ff6b35', '#ff8e53', '#f4511e', '#ff9800', '#ffb74d', '#ff5722'];
  const color = colors[productId % colors.length];

  const svg = `
    <svg width="400" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${productId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff8e53;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad${productId})"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
        ${productName}
      </text>
      <text x="50%" y="65%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" opacity="0.8">
        Handloom Product
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Sample product data - Updated to rupees
const handloomProducts = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    price: 2845,
    originalPrice: 3999,
    artisan: {
      name: "Weavers Collective",
      location: "Varanasi, Uttar Pradesh",
      experience: "3rd Generation",
      story: "Our family has been weaving Banarasi silk sarees for over 75 years, preserving the traditional techniques passed down through generations.",
      rating: 4.9,
      productsCount: 124,
      verified: true,
    },
    rating: 4.8,
    reviews: 124,
    description: "Authentic Banarasi silk saree with intricate zari work and traditional patterns. Handwoven by skilled artisans from Varanasi.",
    features: ["Pure Silk", "Zari Work", "Handwoven", "Traditional Design"],
    images: ["/5.webp"],
    category: "Sarees",
    inStock: true,
    deliveryTime: "5-7 days",
    isNew: true,
    dateAdded: new Date('2024-01-15')
  },
  {
    id: 2,
    name: "Cotton Dress Material",
    price: 999,
    originalPrice: 1199,
    artisan: {
      name: "Traditional Textiles",
      location: "Jaipur, Rajasthan",
      experience: "2nd Generation",
      story: "Specializing in traditional block prints and natural dyes for over 50 years.",
      rating: 4.5,
      productsCount: 89,
      verified: true,
    },
    rating: 4.5,
    reviews: 89,
    description: "Soft and breathable cotton dress material with traditional block prints. Perfect for summer wear.",
    features: ["100% Cotton", "Hand Block Print", "Breathable", "Eco-friendly"],
    images: ["/2.webp"],
    category: "Dress Materials",
    inStock: true,
    deliveryTime: "3-5 days",
    isNew: true,
    dateAdded: new Date('2024-01-10')
  },
  {
    id: 3,
    name: "Embroidered Jacket",
    price: 799,
    originalPrice: 899,
    artisan: {
      name: "Craft Masters",
      location: "Lucknow, Uttar Pradesh",
      experience: "4th Generation",
      story: "Masters of chikankari and zardozi embroidery techniques with centuries-old heritage.",
      rating: 4.9,
      productsCount: 67,
      verified: true,
    },
    rating: 4.9,
    reviews: 67,
    description: "Elegant embroidered jacket with traditional mirror work and intricate thread embroidery.",
    features: ["Hand Embroidery", "Mirror Work", "Premium Fabric", "Traditional Motifs"],
    images: ["/3.webp"],
    category: "Jackets",
    inStock: true,
    deliveryTime: "7-10 days",
    isNew: false,
    dateAdded: new Date('2024-01-05')
  },
  {
    id: 4,
    name: "Handwoven Stole",
    price: 749,
    originalPrice: 999,
    artisan: {
      name: "Heritage Weavers",
      location: "Kolkata, West Bengal",
      experience: "3rd Generation",
      story: "Preserving the art of handloom weaving with traditional techniques and modern designs.",
      rating: 4.7,
      productsCount: 203,
      verified: true,
    },
    rating: 4.7,
    reviews: 203,
    description: "Lightweight handwoven stole with traditional patterns. Perfect accessory for any outfit.",
    features: ["Handwoven", "Lightweight", "Multi-purpose", "Traditional Patterns"],
    images: ["/4.webp"],
    category: "Accessories",
    inStock: true,
    deliveryTime: "2-4 days",
    isNew: true,
    dateAdded: new Date('2024-01-18')
  },
  {
    id: 5,
    name: "Traditional Kurta Set",
    price: 1299,
    originalPrice: 2999,
    artisan: {
      name: "Ethnic Creations",
      location: "Delhi, India",
      experience: "2nd Generation",
      story: "Creating contemporary ethnic wear while honoring traditional craftsmanship.",
      rating: 4.6,
      productsCount: 156,
      verified: true,
    },
    rating: 4.6,
    reviews: 156,
    description: "Complete traditional kurta set with matching bottoms and dupatta. Elegant and comfortable.",
    features: ["Complete Set", "Comfort Fit", "Traditional Design", "Premium Cotton"],
    images: ["/1.avif"],
    category: "Kurtas",
    inStock: true,
    deliveryTime: "4-6 days",
    isNew: false,
    dateAdded: new Date('2024-01-08')
  },
  {
    id: 6,
    name: "Silk Scarf with Prints",
    price: 400,
    originalPrice: 600,
    artisan: {
      name: "Silk Artisans",
      location: "Mysore, Karnataka",
      experience: "5th Generation",
      story: "Renowned for Mysore silk and traditional printing techniques since 1920.",
      rating: 4.4,
      productsCount: 92,
      verified: true,
    },
    rating: 4.4,
    reviews: 92,
    description: "Luxurious silk scarf with traditional hand-block prints. Adds elegance to any ensemble.",
    features: ["Pure Silk", "Hand Block Print", "Luxurious", "Versatile"],
    images: ["/6.webp"],
    category: "Accessories",
    inStock: true,
    deliveryTime: "3-5 days",
    isNew: true,
    dateAdded: new Date('2024-01-20')
  }
];

// Review Dialog Component
const ReviewDialog = ({ open, onClose, product, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitReview({
        productId: product.id,
        productName: product.name,
        rating,
        comment,
        date: new Date().toISOString()
      });
      setRating(0);
      setComment('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Write a Review for {product?.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body1" gutterBottom>
            How would you rate this product?
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
            sx={{ fontSize: '2.5rem', my: 2 }}
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Review (Optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={rating === 0}
          sx={{ bgcolor: 'orange.main' }}
        >
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Enhanced Product Listing with Filters
const ProductListing = ({ products, onProductClick, searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    rating: 0,
    sortBy: 'featured'
  });

  const categories = [...new Set(products.map(p => p.category))];
  const maxPrice = Math.max(...products.map(p => p.price));

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.rating;
      
      return matchesCategory && matchesPrice && matchesRating;
    });

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default:
        // featured - no sorting
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, maxPrice],
      rating: 0,
      sortBy: 'featured'
    });
  };

  return (
    <Box>
      {/* Filters Section */}
      <Card sx={{ mb: 3, bgcolor: 'orange.50' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FilterList sx={{ mr: 1, color: 'orange.main' }} />
            <Typography variant="h6">Filters</Typography>
            <Button 
              onClick={clearFilters} 
              size="small" 
              sx={{ ml: 'auto', color: 'orange.main' }}
            >
              Clear All
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="Sort By"
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                </Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={maxPrice}
                  sx={{ color: 'orange.main' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Minimum Rating: {filters.rating > 0 ? `${filters.rating}+ Stars` : 'Any'}
                </Typography>
                <Slider
                  value={filters.rating}
                  onChange={(e, newValue) => handleFilterChange('rating', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  step={1}
                  marks
                  sx={{ color: 'orange.main' }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                },
                border: '1px solid',
                borderColor: 'orange.100'
              }}
              onClick={() => onProductClick(product)}
            >
              {product.isNew && (
                <Chip
                  label="NEW"
                  color="success"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1
                  }}
                />
              )}

              <CardMedia
                component="img"
                height="200"
                image={product.images?.[0] || generateProductImage(product.id, product.name)}
                alt={product.name}
                sx={{
                  objectFit: 'contain',
                  width: '100%',
                  height: 200,
                  backgroundColor: 'grey.50'
                }}
                onError={(e) => {
                  e.target.src = generateProductImage(product.id, product.name);
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  By {typeof product.artisan === 'string' ? product.artisan : product.artisan?.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.reviews || 0})
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h6" color="orange.main" fontWeight="bold">
                    ₹{product.price}
                  </Typography>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      ₹{product.originalPrice}
                    </Typography>
                  )}
                </Box>

                <Chip
                  label={product.category}
                  size="small"
                  sx={{ 
                    bgcolor: 'orange.100', 
                    color: 'orange.800',
                    border: '1px solid',
                    borderColor: 'orange.200'
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your filters
          </Typography>
          <Button 
            onClick={clearFilters} 
            variant="outlined" 
            sx={{ mt: 2, color: 'orange.main', borderColor: 'orange.main' }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

// Enhanced Order History Component
const OrderHistory = () => {
  const { orders, addReview } = useCart();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample orders data if empty
  const sampleOrders = [
    {
      id: 'ORD-001',
      date: new Date('2024-01-15'),
      status: 'delivered',
      total: 2845,
      items: [
        {
          id: 1,
          name: "Banarasi Silk Saree",
          price: 2845,
          quantity: 1,
          artisan: "Weavers Collective",
          image: "/5.webp"
        }
      ],
      trackingNumber: 'TRK-789456123'
    },
    {
      id: 'ORD-002',
      date: new Date('2024-01-10'),
      status: 'shipped',
      total: 1998,
      items: [
        {
          id: 2,
          name: "Cotton Dress Material",
          price: 999,
          quantity: 2,
          artisan: "Traditional Textiles",
          image: "/2.webp"
        }
      ],
      trackingNumber: 'TRK-123456789'
    }
  ];

  const displayOrders = orders && orders.length > 0 ? orders : sampleOrders;

  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setReviewDialogOpen(true);
  };

  const handleSubmitReview = (review) => {
    if (addReview) {
      addReview(review);
    }
    // In a real app, you would save this to your backend
    console.log('Review submitted:', review);
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <AssignmentTurnedIn />;
      case 'shipped': return <LocalShipping />;
      case 'processing': return <CheckCircle />;
      default: return <ShoppingBag />;
    }
  };

  if (!displayOrders || displayOrders.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No orders yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start shopping to see your orders here
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: 'orange.main' }}>
        Order History
      </Typography>
      
      {displayOrders.map((order) => (
        <Accordion key={order.id} sx={{ mb: 2, border: '1px solid', borderColor: 'orange.100' }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">Order #{order.id}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip
                  icon={getOrderStatusIcon(order.status)}
                  label={order.status.toUpperCase()}
                  color={getOrderStatusColor(order.status)}
                  variant="filled"
                />
                <Typography variant="h6" sx={{ mt: 1, color: 'orange.main' }}>
                  ₹{order.total}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stepper orientation="vertical">
              <Step active={true}>
                <StepLabel>Order Placed</StepLabel>
                <StepContent>
                  <Typography>Your order has been confirmed</Typography>
                  <Typography variant="caption">
                    {new Date(order.date).toLocaleString()}
                  </Typography>
                </StepContent>
              </Step>
              <Step active={order.status !== 'processing'}>
                <StepLabel>Shipped</StepLabel>
                <StepContent>
                  <Typography>Your order is on the way</Typography>
                  {order.trackingNumber && (
                    <Typography variant="caption">
                      Tracking: {order.trackingNumber}
                    </Typography>
                  )}
                </StepContent>
              </Step>
              <Step active={order.status === 'delivered'}>
                <StepLabel>Delivered</StepLabel>
                <StepContent>
                  <Typography>Your order has been delivered</Typography>
                </StepContent>
              </Step>
            </Stepper>

            <List>
              {order.items && order.items.map((item) => (
                <ListItem key={item.id} divider>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <img 
                      src={item.image || generateProductImage(item.id, item.name)} 
                      alt={item.name}
                      style={{ 
                        width: 60, 
                        height: 60, 
                        objectFit: 'cover',
                        borderRadius: 4,
                        marginRight: 16
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity} × ₹{item.price}
                      </Typography>
                      <Typography variant="body2">
                        Artisan: {typeof item.artisan === 'string' ? item.artisan : item.artisan?.name}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ color: 'orange.main' }}>
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Box>
                  
                  {order.status === 'delivered' && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Star />}
                      onClick={() => handleOpenReview(item)}
                      sx={{ 
                        ml: 2,
                        color: 'orange.main',
                        borderColor: 'orange.main',
                        '&:hover': {
                          bgcolor: 'orange.50',
                          borderColor: 'orange.dark'
                        }
                      }}
                    >
                      Review
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
              <Typography variant="h6">Total: ₹{order.total}</Typography>
              <Button 
                variant="contained" 
                sx={{ bgcolor: 'orange.main' }}
                onClick={() => window.print()}
              >
                Download Invoice
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <ReviewDialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        product={selectedProduct}
        onSubmitReview={handleSubmitReview}
      />
    </Box>
  );
};

// Cart Component with fixed price calculation
const Cart = ({ onClose, onProceedToCheckout }) => {
  const { cartItems = [], removeFromCart, updateQuantity, clearCart } = useCart();

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Ensure price is a number
      const price = typeof item.price === 'number' ? item.price : 
                   typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Box sx={{ width: 400, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Shopping Cart</Typography>
        <IconButton onClick={onClose}>
          <ShoppingCart />
        </IconButton>
      </Box>
      
      {!cartItems || cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add some products to get started
          </Typography>
          <Button 
            variant="contained" 
            onClick={onClose}
            sx={{ bgcolor: 'orange.main' }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id} divider>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <img 
                      src={item.image || generateProductImage(item.id, item.name)} 
                      alt={item.name}
                      style={{ 
                        width: 60, 
                        height: 60, 
                        objectFit: 'cover',
                        borderRadius: 4,
                        marginRight: 12
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" noWrap>{item.name}</Typography>
                      <Typography variant="body2" color="orange.main" fontWeight="bold">
                        ₹{typeof item.price === 'number' ? item.price : 
                           typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : 0}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity && updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          sx={{ 
                            border: '1px solid', 
                            borderColor: 'grey.300',
                            width: 30,
                            height: 30
                          }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                          sx={{ 
                            border: '1px solid', 
                            borderColor: 'grey.300',
                            width: 30,
                            height: 30
                          }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => removeFromCart && removeFromCart(item.id)}
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
          
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="orange.main" fontWeight="bold">
                ₹{getCartTotal()}
              </Typography>
            </Box>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={onProceedToCheckout}
              sx={{ 
                bgcolor: 'orange.main',
                mb: 1
              }}
            >
              Checkout ({getCartItemsCount()} items)
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={clearCart}
              sx={{ 
                color: 'error.main',
                borderColor: 'error.main'
              }}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

// Wishlist Component
const Wishlist = ({ onClose }) => {
  const { wishlist = [], removeFromWishlist, addToCart } = useCart();

  return (
    <Box sx={{ width: 400, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Wishlist</Typography>
        <IconButton onClick={onClose}>
          <Favorite />
        </IconButton>
      </Box>
      
      {!wishlist || wishlist.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Favorite sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Your wishlist is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Save your favorite products here
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <List>
            {wishlist.map((item) => (
              <ListItem key={item.id} divider>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <img 
                    src={item.image || generateProductImage(item.id, item.name)} 
                    alt={item.name}
                    style={{ 
                      width: 60, 
                      height: 60, 
                      objectFit: 'cover',
                      borderRadius: 4,
                      marginRight: 12
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" noWrap>{item.name}</Typography>
                    <Typography variant="body2" color="orange.main" fontWeight="bold">
                      ₹{typeof item.price === 'number' ? item.price : 
                         typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : 0}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => addToCart && addToCart(item)}
                      sx={{ 
                        bgcolor: 'orange.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'orange.dark'
                        }
                      }}
                    >
                      <Add />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => removeFromWishlist && removeFromWishlist(item.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, logout } = useAuth();
  const { getCartItemsCount, wishlist = [], orders = [] } = useCart();
  const { approvedProducts = [], newProducts = [] } = useProducts();

  const navigate = useNavigate();

  // FIXED: Safe function call with fallback
  const cartItemsCount = typeof getCartItemsCount === 'function' ? getCartItemsCount() : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>
  );

  // Use approvedProducts from context OR fallback to handloomProducts
  const allProducts = approvedProducts.length > 0 ? approvedProducts : handloomProducts;

  // Filter products based on search term
  const filteredProducts = allProducts.filter(product => {
    const artisanName = typeof product.artisan === 'string' ? product.artisan : product.artisan?.name;
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisanName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get new products - use from context OR calculate from allProducts
  const newProductsList = newProducts.length > 0 ? newProducts :
    allProducts.filter(product => product.isNew)
      .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'orange.50', minHeight: "100vh" }}>
      {/* Header - Fixed position */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: "white", 
          color: "text.primary", 
          boxShadow: 2,
          background: 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 50%, #f4511e 100%)',
          zIndex: 1300 
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              color: "white", 
              fontWeight: "bold",
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Global Loom Collective
          </Typography>

          {/* Search Bar */}
          <TextField
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              mr: 2, 
              width: 300, 
              display: { xs: 'none', md: 'block' },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                borderRadius: 2
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Cart Icon - FIXED: Using safe cartItemsCount */}
            <IconButton onClick={() => setShowCart(true)} sx={{ color: 'white' }}>
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {/* Wishlist Icon */}
            <IconButton onClick={() => setShowWishlist(true)} sx={{ color: 'white' }}>
              <Badge badgeContent={wishlist.length} color="error">
                <Favorite />
              </Badge>
            </IconButton>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'white', color: 'orange.main' }}>
              <Person />
            </Avatar>

            <Button
              color="inherit"
              startIcon={<Home />}
              component={Link}
              to="/"
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                color: 'white'
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ color: 'white' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add padding to account for fixed header */}
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Welcome Section */}
          <Card sx={{ 
            mb: 4, 
            background: "linear-gradient(135deg, #ff6b35 0%, #ff8e53 50%, #f4511e 100%)", 
            color: "white",
            boxShadow: 3
          }}>
            <CardContent>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Welcome, {user?.name}! 👋
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Discover authentic handloom products from skilled artisans
              </Typography>
            </CardContent>
          </Card>

          {/* New Products Section */}
          {newProductsList.length > 0 && activeTab === 0 && !selectedProduct && !showCheckout && (
            <Card sx={{ 
              mb: 4, 
              border: '2px solid', 
              borderColor: 'orange.main',
              boxShadow: 2
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <NewReleases sx={{ fontSize: 32, color: 'orange.main', mr: 2 }} />
                  <Typography variant="h5" fontWeight="bold" color="orange.main">
                    New Arrivals 🎉
                  </Typography>
                  <Chip
                    label="Just Added"
                    sx={{ 
                      ml: 2,
                      bgcolor: 'orange.100',
                      color: 'orange.800'
                    }}
                  />
                </Box>

                <Grid container spacing={3}>
                  {newProductsList.slice(0, 4).map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': { 
                            transform: 'translateY(-4px)',
                            boxShadow: 4
                          },
                          border: '1px solid',
                          borderColor: 'orange.100'
                        }}
                        onClick={() => handleProductClick(product)}
                      >
                        {/* New Badge */}
                        <Chip
                          label="NEW"
                          color="success"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1
                          }}
                        />

                        <CardMedia
                          component="img"
                          height="200"
                          image={product.images?.[0] || generateProductImage(product.id, product.name)}
                          alt={product.name}
                          sx={{
                            objectFit: 'contain',
                            width: '100%',
                            height: 200,
                            backgroundColor: 'grey.50'
                          }}
                          onError={(e) => {
                            e.target.src = generateProductImage(product.id, product.name);
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom noWrap>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            By {typeof product.artisan === 'string' ? product.artisan : product.artisan?.name}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating value={product.rating} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({product.reviews || 0})
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" color="orange.main" fontWeight="bold">
                              ₹{product.price}
                            </Typography>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                ₹{product.originalPrice}
                              </Typography>
                            )}
                          </Box>

                          <Chip
                            label={product.category}
                            size="small"
                            sx={{ 
                              bgcolor: 'orange.100', 
                              color: 'orange.800',
                              border: '1px solid',
                              borderColor: 'orange.200'
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {newProductsList.length > 4 && (
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Whatshot />}
                      onClick={() => setActiveTab(1)}
                      sx={{ 
                        color: 'orange.main',
                        borderColor: 'orange.main',
                        '&:hover': {
                          bgcolor: 'orange.50',
                          borderColor: 'orange.dark'
                        }
                      }}
                    >
                      View All New Products ({newProductsList.length})
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onBack={handleBackToProducts}
            />
          ) : showCheckout ? (
            <Checkout onBack={() => setShowCheckout(false)} />
          ) : (
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ p: 0 }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  sx={{ 
                    px: 3,
                    '& .MuiTab-root': {
                      color: 'text.secondary',
                      '&.Mui-selected': {
                        color: 'orange.main',
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'orange.main',
                    }
                  }}
                >
                  <Tab icon={<Dashboard />} label="All Products" />
                  <Tab icon={<NewReleases />} label="New Arrivals" />
                  <Tab icon={<Favorite />} label="Categories" />
                  <Tab icon={<Receipt />} label="My Orders" />
                  <Tab icon={<Person />} label="My Profile" />
                </Tabs>
                <TabPanel value={activeTab} index={0}>
                  <ProductListing
                    products={filteredProducts}
                    onProductClick={handleProductClick}
                    searchTerm={searchTerm}
                  />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                  <Box sx={{ px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <NewReleases sx={{ fontSize: 32, color: 'orange.main', mr: 2 }} />
                      <Typography variant="h4" fontWeight="bold" color="orange.main">
                        New Arrivals
                      </Typography>
                      <Chip
                        label={`${newProductsList.length} products`}
                        sx={{ 
                          ml: 2,
                          bgcolor: 'orange.100',
                          color: 'orange.800'
                        }}
                      />
                    </Box>

                    {newProductsList.length > 0 ? (
                      <ProductListing
                        products={newProductsList}
                        onProductClick={handleProductClick}
                        searchTerm={searchTerm}
                      />
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 6 }}>
                        <NewReleases sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          No new products available
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Check back later for new handloom arrivals
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                  <Box sx={{ px: 3, textAlign: 'center', py: 6 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" color="orange.main">
                      Browse by Categories
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
                      {['Sarees', 'Kurtas', 'Dress Materials', 'Accessories', 'Jackets'].map(category => (
                        <Grid item xs={6} sm={4} md={2.4} key={category}>
                          <Card
                            sx={{
                              cursor: 'pointer',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              '&:hover': { 
                                transform: 'translateY(-4px)',
                                boxShadow: 4
                              },
                              background: `linear-gradient(135deg, ${['#ff6b35', '#ff8e53', '#f4511e', '#ff9800', '#ffb74d'][Math.floor(Math.random() * 5)]} 0%, #ffb74d 100%)`,
                              color: 'white',
                              height: 120,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onClick={() => setSearchTerm(category)}
                          >
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                              <Typography variant="h6" fontWeight="bold">{category}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value={activeTab} index={3}>
                  <OrderHistory />
                </TabPanel>
                <TabPanel value={activeTab} index={4}>
                  <Box sx={{ px: 3 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" color="orange.main">
                      My Profile
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Card sx={{ border: '1px solid', borderColor: 'orange.100' }}>
                          <CardContent sx={{ textAlign: 'center', p: 4 }}>
                            <Avatar
                              sx={{
                                width: 80,
                                height: 80,
                                mx: 'auto',
                                mb: 2,
                                bgcolor: 'orange.main',
                                fontSize: '2rem'
                              }}
                            >
                              {user?.name?.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" gutterBottom>
                              {user?.name}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                              {user?.email}
                            </Typography>
                            <Chip 
                              label="Buyer" 
                              sx={{ 
                                mt: 1,
                                bgcolor: 'orange.100',
                                color: 'orange.800'
                              }} 
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Card sx={{ border: '1px solid', borderColor: 'orange.100' }}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Account Summary
                            </Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ borderColor: 'orange.200' }}>
                                  <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" color="orange.main">
                                      {cartItemsCount}
                                    </Typography>
                                    <Typography variant="body2">
                                      Items in Cart
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ borderColor: 'orange.200' }}>
                                  <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" sx={{ color: 'orange.600' }}>
                                      {wishlist.length}
                                    </Typography>
                                    <Typography variant="body2">
                                      Wishlist Items
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ borderColor: 'orange.200' }}>
                                  <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" sx={{ color: 'orange.700' }}>
                                      {orders.length}
                                    </Typography>
                                    <Typography variant="body2">
                                      Total Orders
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ borderColor: 'orange.200' }}>
                                  <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" sx={{ color: 'orange.800' }}>
                                      ₹{orders.reduce((total, order) => total + (order.total || 0), 0).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2">
                                      Total Spent
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={showCart}
        onClose={() => setShowCart(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 }
          }
        }}
      >
        <Cart
          onClose={() => setShowCart(false)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer
        anchor="right"
        open={showWishlist}
        onClose={() => setShowWishlist(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 }
          }
        }}
      >
        <Wishlist onClose={() => setShowWishlist(false)} />
      </Drawer>
    </Box>
  );
};

export default BuyerDashboard;