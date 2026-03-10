import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Divider,
  Alert,
} from '@mui/material';
import { ArrowBack, Payment, LocalShipping } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Checkout = ({ onBack }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    // Address
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',

    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    else if (!/^\d{6}$/.test(formData.zipCode)) newErrors.zipCode = 'ZIP code must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (formData.paymentMethod === 'cod') {
      return true; // No validation needed for Cash on Delivery
    }

    if (formData.paymentMethod === 'card') {
      const newErrors = {};
      
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Expiry date must be in MM/YY format';
      
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';
      
      if (!formData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    // Add UPI validation if needed
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handlePlaceOrder = () => {
    if (validateStep2()) {
      // In a real app, you would process the payment and order here
      setStep(3);
      clearCart();
    }
  };

  const subtotal = getCartTotal();
  const shipping = 50.00; // Changed to rupees
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (step === 3) {
    return (
      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ color: 'success.main', mb: 3 }}>
            <Payment sx={{ fontSize: 64 }} />
          </Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="success.main">
            Order Placed Successfully!
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Thank you for your purchase
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your order has been confirmed and will be shipped within {cartItems[0]?.deliveryTime || '5-7 days'}
          </Typography>
          <Button variant="contained" size="large" onClick={onBack}>
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button startIcon={<ArrowBack />} onClick={handleBack}>
            Back
          </Button>
          <Typography variant="h5" fontWeight="bold" sx={{ flex: 1, textAlign: 'center' }}>
            Checkout
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Step {step} of 2
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {/* Left Column - Form */}
          <Grid item xs={12} md={8}>
            {step === 1 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalShipping /> Shipping Address
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        multiline
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange('address')}
                        error={!!errors.address}
                        helperText={errors.address}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange('city')}
                        error={!!errors.city}
                        helperText={errors.city}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.state}>
                        <InputLabel>State</InputLabel>
                        <Select
                          value={formData.state}
                          label="State"
                          onChange={handleInputChange('state')}
                          required
                        >
                          <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                          <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                          <MenuItem value="Karnataka">Karnataka</MenuItem>
                          <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                          <MenuItem value="West Bengal">West Bengal</MenuItem>
                          <MenuItem value="Gujarat">Gujarat</MenuItem>
                          <MenuItem value="Delhi">Delhi</MenuItem>
                          <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                          <MenuItem value="Kerala">Kerala</MenuItem>
                        </Select>
                        {errors.state && (
                          <Typography variant="caption" color="error">
                            {errors.state}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange('zipCode')}
                        error={!!errors.zipCode}
                        helperText={errors.zipCode}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Country"
                        value={formData.country}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
            {step === 2 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Payment /> Payment Method
                  </Typography>
                  <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onChange={handleInputChange('paymentMethod')}
                    >
                      <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                      <FormControlLabel value="upi" control={<Radio />} label="UPI Payment" />
                      <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                    </RadioGroup>
                  </FormControl>
                  {formData.paymentMethod === 'card' && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange('cardNumber')}
                          error={!!errors.cardNumber}
                          helperText={errors.cardNumber}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange('expiryDate')}
                          error={!!errors.expiryDate}
                          helperText={errors.expiryDate}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="CVV"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange('cvv')}
                          error={!!errors.cvv}
                          helperText={errors.cvv}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Name on Card"
                          value={formData.nameOnCard}
                          onChange={handleInputChange('nameOnCard')}
                          error={!!errors.nameOnCard}
                          helperText={errors.nameOnCard}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {formData.paymentMethod === 'cod' && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Pay when your order is delivered. Additional ₹20 cash handling charge may apply.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                {/* Order Items */}
                <Box sx={{ mb: 2 }}>
                  {cartItems.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {item.name} × {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                {/* Totals */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">₹{subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping:</Typography>
                  <Typography variant="body2">₹{shipping.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Tax:</Typography>
                  <Typography variant="body2">₹{tax.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">Total:</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    ₹{total.toFixed(2)}
                  </Typography>
                </Box>
                {/* Action Button */}
                {step === 1 && (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleNext}
                  >
                    Continue to Payment
                  </Button>
                )}
                {step === 2 && (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Checkout;