import React from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Delete, AddShoppingCart, Close, Favorite } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Wishlist = ({ onClose }) => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <Box sx={{ width: 400, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            My Wishlist
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Favorite sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add products you love to your wishlist
          </Typography>
          <Button variant="contained" onClick={onClose}>
            Browse Products
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: 400, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            My Wishlist ({wishlist.length} items)
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>

      {/* Wishlist Items */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <List>
          {wishlist.map((item) => (
            <ListItem key={item.id} sx={{ px: 0, mb: 2 }}>
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {/* Product Image */}
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: 'grey.200',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Typography variant="caption" color="grey.500">
                        Image
                      </Typography>
                    </Box>

                    {/* Product Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight="bold" noWrap>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        By {item.artisan}
                      </Typography>
                      <Typography variant="body2" color="primary.main" fontWeight="bold">
                        {item.price}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddShoppingCart />}
                      onClick={() => handleAddToCart(item)}
                      sx={{ flex: 1 }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer Actions */}
      <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Button 
          variant="outlined" 
          fullWidth
          onClick={() => {
            wishlist.forEach(item => addToCart(item));
            onClose();
          }}
          sx={{ mb: 1 }}
        >
          Add All to Cart
        </Button>
        <Button 
          variant="text" 
          fullWidth
          color="error"
          onClick={() => {
            wishlist.forEach(item => removeFromWishlist(item.id));
          }}
        >
          Clear Wishlist
        </Button>
      </Box>
    </Box>
  );
};

export default Wishlist;