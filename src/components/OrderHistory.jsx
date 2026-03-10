import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import { Visibility, LocalShipping, ShoppingBag } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const OrderHistory = () => {
  const { orders } = useCart();

  const getStatusColor = (status) => {
    const statusColors = {
      confirmed: 'success',
      shipped: 'primary',
      delivered: 'secondary',
      cancelled: 'error'
    };
    return statusColors[status] || 'default';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (orders.length === 0) {
    return (
      <Box sx={{ px: 3, textAlign: 'center', py: 6 }}>
        <LocalShipping sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No orders yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Your order history will appear here once you place an order
        </Typography>
        <Button variant="contained" startIcon={<ShoppingBag />}>
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Order History
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        View your past orders and track their status
      </Typography>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Items</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Tracking</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {order.trackingNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button 
                    size="small" 
                    startIcon={<Visibility />}
                    variant="outlined"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Example */}
      {orders.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Order Details
            </Typography>
            {orders.slice(0, 1).map((order) => (
              <Box key={order.id}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      Shipping Address
                    </Typography>
                    <Typography variant="body2">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                      {order.shippingAddress.country}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      📞 {order.shippingAddress.phone}<br />
                      📧 {order.shippingAddress.email}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      Order Items
                    </Typography>
                    {order.items.map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: index < order.items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            By {item.artisan} • Qty: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Payment Method:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {order.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                         order.paymentMethod === 'upi' ? 'UPI Payment' : 
                         'Cash on Delivery'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Order Statistics */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {orders.length}
              </Typography>
              <Typography variant="body2">
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {orders.filter(order => order.status === 'delivered').length}
              </Typography>
              <Typography variant="body2">
                Delivered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {orders.filter(order => order.status === 'shipped').length}
              </Typography>
              <Typography variant="body2">
                In Transit
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                ${orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Total Spent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderHistory;