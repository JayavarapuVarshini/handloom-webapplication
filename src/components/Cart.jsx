import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Cart = ({ onClose, onProceedToCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  // Fixed: Added safe check for cartItems
  const cartItemsSafe = cartItems || [];

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  return (
    <Box sx={{ width: 400, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Shopping Cart ({cartItemsSafe.length})
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      {/* Cart Items */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', my: 2 }}>
        {cartItemsSafe.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Add some products to get started
            </Typography>
          </Box>
        ) : (
          <List>
            {cartItemsSafe.map((item) => (
              <ListItem key={item.id} divider>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <img 
                    src={item.images?.[0]} 
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
                    <Typography variant="subtitle1" noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Button 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleRemoveItem(item.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Footer */}
      {cartItemsSafe.length > 0 && (
        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="primary.main">
              ₹{getCartTotal()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onProceedToCheckout}
            sx={{ mb: 1 }}
          >
            Proceed to Checkout
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;