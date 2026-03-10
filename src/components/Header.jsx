import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Badge,
  IconButton,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Favorite,
  Person,
  Home,
  Logout,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = ({ searchTerm, setSearchTerm, onCartClick, onWishlistClick }) => {
  const { user: _user, logout } = useAuth();
  const { getCartItemsCount, wishlist } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white", color: "text.primary", boxShadow: 1, zIndex: 1300 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "primary.main", fontWeight: "bold" }}>
          Global Loom Collective
        </Typography>
        
        {/* Search Bar */}
        <TextField
          size="small"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2, width: 300, display: { xs: 'none', md: 'block' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Cart Icon */}
          <IconButton onClick={onCartClick}>
            <Badge badgeContent={getCartItemsCount()} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Wishlist Icon */}
          <IconButton onClick={onWishlistClick}>
            <Badge badgeContent={wishlist.length} color="error">
              <Favorite />
            </Badge>
          </IconButton>

          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            <Person />
          </Avatar>
          
          <Button 
            color="inherit" 
            startIcon={<Home />} 
            component={Link} 
            to="/"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            startIcon={<Logout />} 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;