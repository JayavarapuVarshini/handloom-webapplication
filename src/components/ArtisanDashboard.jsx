import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Badge,
  Avatar,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  LinearProgress,
  Tooltip,
  CardMedia,
  Menu,
  Pagination,
  Stack,
  CardActionArea,
  useTheme,
  useMediaQuery,
  Drawer
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  CloudUpload,
  Add,
  Home,
  Logout,
  Person,
  Notifications,
  Pending,
  CheckCircle,
  Cancel,
  Search,
  Edit,
  Visibility,
  Delete,
  Download,
  TrendingUp,
  ShoppingCart,
  Category,
  Store,
  Email,
  Settings,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  FilterList,
  Upload,
  DateRange,
  LocalShipping,
  Payment,
  Reviews,
  Star,
  StarBorder,
  MoreVert,
  CalendarToday,
  AttachMoney,
  Inventory2,
  WorkspacePremium
} from "@mui/icons-material";

// Custom CSS styles with Orange Theme
const styles = `
.hl-artisan-root {
  font-family: 'Inter', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #ffcc80 100%);
  min-height: 100vh;
}

.hl-artisan-main {
  transition: all 0.3s ease;
}

.hl-stats-grid .MuiCard-root {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
}

.hl-stats-grid .MuiCard-root::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff6b35, #ff8e53, #ffab40);
}

.hl-stats-grid .MuiCard-root:nth-child(2)::before {
  background: linear-gradient(90deg, #ff8e53, #ffab40, #ffb74d);
}

.hl-stats-grid .MuiCard-root:nth-child(3)::before {
  background: linear-gradient(90deg, #ffab40, #ffb74d, #ffcc80);
}

.hl-stats-grid .MuiCard-root:nth-child(4)::before {
  background: linear-gradient(90deg, #ffb74d, #ffcc80, #ffe0b2);
}

.hl-stats-grid .MuiCard-root:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(255, 107, 53, 0.2);
}

.hl-card-title {
  font-size: 2rem !important;
  font-weight: 700 !important;
  background: linear-gradient(135deg, #ff6b35, #ff8e53, #ffab40);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hl-sidebar {
  background: linear-gradient(180deg, #ff6b35 0%, #ff8e53 50%, #ffab40 100%);
  color: white;
  border-radius: 0 20px 20px 0;
}

.hl-sidebar-item {
  border-radius: 12px !important;
  margin: 4px 12px !important;
  transition: all 0.3s ease !important;
}

.hl-sidebar-item:hover {
  background: rgba(255,255,255,0.15) !important;
  transform: translateX(8px);
}

.hl-sidebar-item.active {
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 142, 83, 0.4)) !important;
  border-left: 4px solid #ffffff;
}

.hl-data-table {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.1);
  background: white;
}

.hl-data-table .MuiTableHead-root {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
}

.hl-data-table .MuiTableRow-head .MuiTableCell-head {
  font-weight: 600;
  color: white;
  border-bottom: none;
  font-size: 0.875rem;
}

.hl-product-image {
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid #fff3e0;
  transition: transform 0.3s ease;
}

.hl-product-image:hover {
  transform: scale(1.05);
}

.hl-status-chip {
  font-weight: 600 !important;
  text-transform: capitalize;
  border-radius: 20px;
  padding: 4px 12px;
}

.hl-action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.hl-quick-action-card {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 45%, #ffab40 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.hl-quick-action-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
}

.hl-quick-action-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 30px rgba(255, 107, 53, 0.3);
}

.hl-upload-area {
  border: 3px dashed #ff6b35;
  border-radius: 16px;
  padding: 40px 20px;
  text-align: center;
  background: rgba(255, 107, 53, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.hl-upload-area:hover {
  background: rgba(255, 107, 53, 0.1);
  border-color: #ff8e53;
}

.hl-upload-area.drag-over {
  background: rgba(255, 107, 53, 0.2);
  border-color: #ff6b35;
  transform: scale(1.02);
}

.hl-metric-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.08);
  border: 1px solid #ffe0b2;
  transition: all 0.3s ease;
}

.hl-metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.15);
}

.hl-metric-value {
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  background: linear-gradient(135deg, #ff6b35, #ff8e53, #ffab40);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hl-chart-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.08);
  border: 1px solid #ffe0b2;
}

.hl-search-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(255, 107, 53, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #ffe0b2;
}

.hl-search-box:focus-within {
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.2);
  border-color: #ff6b35;
}

.hl-filter-chip {
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ff6b35, #ff8e53);
  color: white;
}

.hl-filter-chip:hover {
  transform: scale(1.05);
}

.hl-notification-item {
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin-bottom: 8px;
}

.hl-notification-item.unread {
  border-left-color: #ff6b35;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.05), transparent);
}

.hl-notification-item:hover {
  background: #fff3e0;
  transform: translateX(4px);
}

.hl-welcome-card {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 45%, #ffab40 100%);
  color: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.hl-welcome-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  transform: rotate(30deg);
}

.hl-performance-chart {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  border-radius: 16px;
  color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.hl-performance-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z'/%3E%3C/g%3E%3C/svg%3E");
}

/* Enhanced Form Styles */
.hl-product-form {
  padding: 8px !important;
}

.hl-form-section {
  margin-bottom: 24px;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  border-left: 4px solid #ff6b35;
}

.hl-form-section-title {
  font-weight: 600 !important;
  margin-bottom: 16px !important;
  color: #ff6b35;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hl-image-previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.hl-image-preview {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
}

.hl-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hl-image-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 107, 53, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.hl-image-remove:hover {
  background: #ff3d00;
  transform: scale(1.1);
}

.hl-feature-item {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}

.hl-feature-input {
  flex: 1;
}

@media (max-width: 768px) {
  .hl-artisan-main {
    margin-left: 0 !important;
    padding: 16px !important;
  }
  
  .hl-stats-grid .MuiGrid-item {
    margin-bottom: 16px;
  }
  
  .hl-sidebar {
    border-radius: 0;
  }
  
  .hl-image-previews {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Animation classes */
.hl-fade-in {
  animation: fadeIn 0.6s ease-in;
}

.hl-slide-up {
  animation: slideUp 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
.hl-custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.hl-custom-scrollbar::-webkit-scrollbar-track {
  background: #fff3e0;
  border-radius: 10px;
}

.hl-custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ff6b35, #ff8e53);
  border-radius: 10px;
}

.hl-custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #ff5722, #ff8e53);
}
`;

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user, logout } = useAuth();
  const {
    artisanProducts,
    artisanPendingProducts,
    notifications,
    submitProduct,
    updateProduct,
    deleteProduct,
    markNotificationAsRead,
    getUnreadNotifications
  } = useProducts();

  const navigate = useNavigate();

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    features: [''],
    materials: '',
    dimensions: '',
    careInstructions: '',
    stock: '',
    deliveryTime: '7-10 days',
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  // Add CSS to head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Enhanced image upload with validation
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    processImageFiles(files);
  };

  const processImageFiles = (files) => {
    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setSnackbar({ open: true, message: 'Please upload only JPEG, PNG, or WebP images', severity: 'error' });
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setSnackbar({ open: true, message: 'Images must be less than 5MB', severity: 'error' });
      return;
    }

    // Limit to 5 images
    if (imagePreviews.length + files.length > 5) {
      setSnackbar({ open: true, message: 'Maximum 5 images allowed', severity: 'error' });
      return;
    }

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);

    // Store files for submission
    setNewProduct(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  // Drag and drop handlers
  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    processImageFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const removeImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedImages = newProduct.images.filter((_, i) => i !== index);

    setImagePreviews(updatedPreviews);
    setNewProduct(prev => ({ ...prev, images: updatedImages }));
  };

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      // Basic validation
      if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
        setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' });
        return;
      }
      if (newProduct.images.length === 0) {
        setSnackbar({ open: true, message: 'Please add at least one product image', severity: 'error' });
        return;
      }

      // In a real app, you would upload images to a server and get URLs
      const imageUrls = newProduct.images.map((file, index) =>
        file instanceof File ? URL.createObjectURL(file) : `/api/placeholder/400/500?${index}`
      );

      const productData = {
        ...newProduct,
        price: `₹${newProduct.price}`,
        rating: 0,
        reviews: 0,
        images: imageUrls,
        inStock: true,
        artisan: user.name,
        status: 'pending',
        submittedDate: new Date().toISOString(),
        id: editingProduct ? editingProduct.id : Date.now().toString()
      };

      if (editingProduct) {
        updateProduct(productData);
        setSnackbar({ open: true, message: 'Product updated successfully!', severity: 'success' });
      } else {
        submitProduct(productData);
        setSnackbar({ open: true, message: 'Product submitted for admin approval!', severity: 'success' });
      }

      setShowAddProduct(false);
      resetForm();
    } catch {
      setSnackbar({ open: true, message: 'Failed to submit product', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      features: [''],
      materials: '',
      dimensions: '',
      careInstructions: '',
      stock: '',
      deliveryTime: '7-10 days',
      images: []
    });
    setImagePreviews([]);
    setEditingProduct(null);
    setDragOver(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.replace('₹', ''),
      category: product.category,
      features: product.features || [''],
      materials: product.materials || '',
      dimensions: product.dimensions || '',
      careInstructions: product.careInstructions || '',
      stock: product.stock,
      deliveryTime: product.deliveryTime || '7-10 days',
      images: []
    });
    setImagePreviews(product.images || []);
    setShowAddProduct(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      setSnackbar({ open: true, message: 'Product deleted successfully', severity: 'success' });
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newProduct.features];
    updatedFeatures[index] = value;
    setNewProduct(prev => ({ ...prev, features: updatedFeatures }));
  };

  const addFeatureField = () => {
    setNewProduct(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeatureField = (index) => {
    if (newProduct.features.length > 1) {
      const updatedFeatures = newProduct.features.filter((_, i) => i !== index);
      setNewProduct(prev => ({ ...prev, features: updatedFeatures }));
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', label: 'Pending Review', icon: <Pending /> },
      approved: { color: 'success', label: 'Approved', icon: <CheckCircle /> },
      rejected: { color: 'error', label: 'Rejected', icon: <Cancel /> }
    };
    const config = statusConfig[status] || { color: 'default', label: status };
    return (
      <Chip 
        icon={config.icon} 
        label={config.label} 
        color={config.color} 
        size="small" 
        className="hl-status-chip"
      />
    );
  };

  // Filter products based on search and status
  const myProducts = artisanProducts ? artisanProducts(user?.name) : [];
  const myPendingProducts = artisanPendingProducts ? artisanPendingProducts(user?.name) : [];

  const filteredProducts = myProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate performance metrics
  const totalProducts = myProducts.length + myPendingProducts.length;
  const approvalRate = totalProducts > 0 ? Math.round((myProducts.length / totalProducts) * 100) : 0;
  const totalRevenue = myProducts.reduce((sum, product) => {
    const price = parseInt(product.price.replace('₹', '')) || 0;
    return sum + (price * (product.stock || 0));
  }, 0);

  // Mock sales data for charts
  const monthlySales = [
    { month: 'Jan', sales: 5, revenue: 12500 },
    { month: 'Feb', sales: 8, revenue: 20000 },
    { month: 'Mar', sales: 12, revenue: 30000 },
    { month: 'Apr', sales: 7, revenue: 17500 },
    { month: 'May', sales: 15, revenue: 37500 },
    { month: 'Jun', sales: 10, revenue: 25000 },
  ];

  const categoryDistribution = [
    { name: 'Sarees', count: 8, color: '#ff6b35' },
    { name: 'Kurtas', count: 6, color: '#ff8e53' },
    { name: 'Dress Materials', count: 4, color: '#ffab40' },
    { name: 'Accessories', count: 3, color: '#ffb74d' },
    { name: 'Home Decor', count: 2, color: '#ffcc80' },
  ];

  // Export functionality
  const exportProducts = () => {
    const csvData = myProducts.map(product => ({
      Name: product.name,
      Category: product.category,
      Price: product.price,
      Stock: product.stock,
      Status: product.status,
      'Submitted Date': product.submittedDate
    }));
    
    const headers = Object.keys(csvData[0] || {}).join(',');
    const rows = csvData.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    setSnackbar({ open: true, message: 'Products exported successfully', severity: 'success' });
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>
  );

  const unreadNotifications = getUnreadNotifications ? getUnreadNotifications() : [];

  // Enhanced Product Form Component - FIXED HEADING STRUCTURE
  const ProductForm = () => (
    <Dialog 
      open={showAddProduct} 
      onClose={() => {
        setShowAddProduct(false);
        resetForm();
      }}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, maxHeight: '90vh' } }}
    >
      {/* FIXED: Removed nested heading structure */}
      <DialogTitle sx={{ 
        pb: 1, 
        background: 'linear-gradient(135deg, #ff6b35, #ff8e53)', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" component="div" fontWeight="bold">
            {editingProduct ? 'Edit Your Creation' : 'Add New Creation'}
          </Typography>
          <Typography variant="body1" component="div" sx={{ opacity: 0.9, mt: 1 }}>
            {editingProduct ? 'Update your masterpiece details' : 'Share your handloom masterpiece with the world'}
          </Typography>
        </Box>
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 50%)',
          zIndex: 1
        }} />
      </DialogTitle>
      
      <DialogContent className="hl-product-form hl-custom-scrollbar">
        <Grid container spacing={3}>
          {/* Image Upload Section */}
          <Grid item xs={12}>
            <Box className="hl-form-section">
              <Typography variant="h6" component="h3" className="hl-form-section-title">
                <CloudUpload /> Product Images ({imagePreviews.length}/5)
              </Typography>
              
              <Box 
                className={`hl-upload-area ${dragOver ? 'drag-over' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('image-upload').click()}
              >
                <CloudUpload sx={{ fontSize: 64, color: '#ff6b35', mb: 2 }} />
                <Typography variant="h6" component="div" gutterBottom fontWeight="bold">
                  Drag & Drop Your Images
                </Typography>
                <Typography variant="body2" component="div" gutterBottom color="text.secondary">
                  or click to browse files from your computer
                </Typography>
                <Button 
                  variant="contained" 
                  component="label"
                  startIcon={<CloudUpload />}
                  onClick={(e) => e.stopPropagation()}
                  sx={{ 
                    mt: 2,
                    background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff8e53, #ffab40)'
                    }
                  }}
                >
                  Choose Images
                  <input
                    id="image-upload"
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
                <Typography variant="caption" component="div" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                  Supports: JPEG, PNG, WebP • Maximum 5 images • Max 5MB each
                </Typography>
              </Box>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" component="h4" gutterBottom fontWeight="bold">
                    Selected Images:
                  </Typography>
                  <Box className="hl-image-previews">
                    {imagePreviews.map((preview, index) => (
                      <Box key={index} className="hl-image-preview">
                        <img src={preview} alt={`Preview ${index + 1}`} />
                        <button 
                          className="hl-image-remove"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Basic Information Section */}
          <Grid item xs={12} md={6}>
            <Box className="hl-form-section">
              <Typography variant="h6" component="h3" className="hl-form-section-title">
                <Inventory /> Basic Information
              </Typography>
              
              <TextField
                fullWidth
                label="Product Name *"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Description *"
                multiline
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                required
                sx={{ mb: 2 }}
              />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price (₹) *"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    required
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Category *</InputLabel>
                    <Select
                      value={newProduct.category}
                      label="Category *"
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <MenuItem value="Sarees">Sarees</MenuItem>
                      <MenuItem value="Kurtas">Kurtas</MenuItem>
                      <MenuItem value="Dress Materials">Dress Materials</MenuItem>
                      <MenuItem value="Accessories">Accessories</MenuItem>
                      <MenuItem value="Jackets">Jackets</MenuItem>
                      <MenuItem value="Home Decor">Home Decor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={6}>
            <Box className="hl-form-section">
              <Typography variant="h6" component="h3" className="hl-form-section-title">
                <Category /> Product Details
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Materials Used"
                    value={newProduct.materials}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, materials: e.target.value }))}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Dimensions"
                    placeholder="e.g., 6m x 1.2m"
                    value={newProduct.dimensions}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, dimensions: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock Quantity *"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Features Section */}
          <Grid item xs={12}>
            <Box className="hl-form-section">
              <Typography variant="h6" component="h3" className="hl-form-section-title">
                <Star /> Features & Highlights
              </Typography>
              
              {newProduct.features.map((feature, index) => (
                <Box key={index} className="hl-feature-item">
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="hl-feature-input"
                  />
                  {newProduct.features.length > 1 && (
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => removeFeatureField(index)}
                      variant="outlined"
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              ))}
              
              <Button 
                size="small" 
                onClick={addFeatureField}
                startIcon={<Add />}
                sx={{ mt: 1 }}
              >
                Add Another Feature
              </Button>
            </Box>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Box className="hl-form-section">
              <Typography variant="h6" component="h3" className="hl-form-section-title">
                <LocalShipping /> Additional Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Care Instructions"
                    multiline
                    rows={2}
                    value={newProduct.careInstructions}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, careInstructions: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Delivery Time</InputLabel>
                    <Select
                      value={newProduct.deliveryTime}
                      label="Delivery Time"
                      onChange={(e) => setNewProduct(prev => ({ ...prev, deliveryTime: e.target.value }))}
                    >
                      <MenuItem value="3-5 days">3-5 days</MenuItem>
                      <MenuItem value="5-7 days">5-7 days</MenuItem>
                      <MenuItem value="7-10 days">7-10 days</MenuItem>
                      <MenuItem value="10-14 days">10-14 days</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button 
          onClick={() => {
            setShowAddProduct(false);
            resetForm();
          }}
          disabled={loading}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleAddProduct}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{ 
            borderRadius: 2, 
            px: 4,
            background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
            '&:hover': {
              background: 'linear-gradient(135deg, #ff8e53, #ffab40)'
            }
          }}
        >
          {loading ? 'Submitting...' : (editingProduct ? 'Update Creation' : 'Submit for Approval')}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const drawer = (
    <Box className="hl-sidebar" sx={{ height: '100%', py: 2 }}>
      <Box sx={{ px: 2, mb: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            border: '3px solid rgba(255, 255, 255, 0.5)',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          {user?.name?.charAt(0)}
        </Avatar>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
          {user?.name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Verified Artisan
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
      
      <List>
        {[
          { text: 'Dashboard', icon: <Dashboard />, active: activeTab === 0 },
          { text: 'My Products', icon: <Inventory />, active: activeTab === 1 },
          { text: 'Pending Approval', icon: <Pending />, active: activeTab === 2 },
          { text: 'Performance', icon: <TrendingUp />, active: activeTab === 3 },
          { text: 'Orders', icon: <ShoppingCart />, active: activeTab === 4 },
          { text: 'Profile', icon: <Person />, active: activeTab === 5 },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              className={`hl-sidebar-item ${item.active ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(index);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ px: 2, mt: 'auto', pt: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <Button
          variant="contained"
          fullWidth
          startIcon={<Add />}
          onClick={() => {
            resetForm();
            setShowAddProduct(true);
            setMobileOpen(false);
          }}
          sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            py: 1.5,
            fontWeight: 'bold',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2))',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(255,255,255,0.2)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Add New Product
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }} className="hl-artisan-root">
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 1300, 
          bgcolor: "white", 
          color: "text.primary",
          boxShadow: '0 2px 10px rgba(255, 107, 53, 0.1)',
          background: 'linear-gradient(135deg, white 0%, #fff3e0 100%)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Avatar sx={{ 
              width: 40, 
              height: 40, 
              background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
              display: { xs: 'none', sm: 'flex' } 
            }}>
              <WorkspacePremium />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ 
                background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Global Loom Collective
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Artisan Portal
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Search Products">
              <IconButton sx={{ color: '#ff6b35' }}>
                <Search />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton 
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
                color={unreadNotifications.length > 0 ? 'primary' : 'default'}
                sx={{ color: '#ff6b35' }}
              >
                <Badge badgeContent={unreadNotifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account">
              <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
                <Avatar sx={{ 
                  width: 36, 
                  height: 36, 
                  background: 'linear-gradient(135deg, #ff6b35, #ff8e53)'
                }}>
                  {user?.name?.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: 280 }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              position: 'fixed',
              height: '100vh',
              top: 64
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { md: `calc(100% - 280px)` },
          mt: '64px'
        }} 
        className="hl-artisan-main"
      >
        {/* Welcome Section */}
        <Card className="hl-welcome-card hl-slide-up">
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  Welcome back, {user?.name}! 🎨
                </Typography>
                <Typography variant="h6" component="p" sx={{ opacity: 0.9, mb: 2, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  Your creative journey continues. Manage your handloom masterpieces and grow your business.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label={`${totalProducts} Total Creations`} 
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} 
                  />
                  <Chip 
                    label={`${approvalRate}% Success Rate`} 
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} 
                  />
                  <Chip 
                    label={`₹${totalRevenue.toLocaleString()} Portfolio Value`} 
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} 
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    border: '4px solid rgba(255,255,255,0.3)',
                    fontSize: '3rem',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<Add />}
                  onClick={() => {
                    resetForm();
                    setShowAddProduct(true);
                  }}
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#ff6b35', 
                    fontWeight: 'bold',
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    '&:hover': { 
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255,255,255,0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Add New Creation
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4, mt: 2 }} className="hl-stats-grid hl-fade-in">
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'rgba(255, 107, 53, 0.1)', width: 56, height: 56 }}>
                    <CheckCircle sx={{ color: '#ff6b35' }} />
                  </Avatar>
                  <Box>
                    <Typography className="hl-card-title">{myProducts.length}</Typography>
                    <Typography variant="body2" color="text.secondary">Approved Products</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={75} sx={{ mt: 2, height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'rgba(255, 152, 0, 0.1)', width: 56, height: 56 }}>
                    <Pending sx={{ color: '#FF9800' }} />
                  </Avatar>
                  <Box>
                    <Typography className="hl-card-title">{myPendingProducts.length}</Typography>
                    <Typography variant="body2" color="text.secondary">Pending Approval</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={myPendingProducts.length > 0 ? 40 : 0} color="warning" sx={{ mt: 2, height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'rgba(255, 171, 64, 0.1)', width: 56, height: 56 }}>
                    <TrendingUp sx={{ color: '#ffab40' }} />
                  </Avatar>
                  <Box>
                    <Typography className="hl-card-title">{approvalRate}%</Typography>
                    <Typography variant="body2" color="text.secondary">Approval Rate</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={approvalRate} sx={{ mt: 2, height: 6, borderRadius: 3, bgcolor: '#ffab40', '& .MuiLinearProgress-bar': { bgcolor: '#ff8e53' } }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'rgba(255, 183, 77, 0.1)', width: 56, height: 56 }}>
                    <AttachMoney sx={{ color: '#ffb74d' }} />
                  </Avatar>
                  <Box>
                    <Typography className="hl-card-title">₹{totalRevenue.toLocaleString()}</Typography>
                    <Typography variant="body2" color="text.secondary">Portfolio Value</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={65} sx={{ mt: 2, height: 6, borderRadius: 3, bgcolor: '#ffb74d', '& .MuiLinearProgress-bar': { bgcolor: '#ffab40' } }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Tabs */}
        <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(255, 107, 53, 0.1)' }}>
          <CardContent sx={{ p: 0 }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)} 
              sx={{ 
                px: 3, 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': { 
                  minHeight: 60,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: '#ff6b35'
                },
                '& .Mui-selected': {
                  color: '#ff6b35 !important'
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ff6b35'
                }
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<Dashboard />} label="Overview" />
              <Tab icon={<Inventory />} label="My Products" />
              <Tab icon={<Pending />} label="Pending Approval" />
              <Tab icon={<TrendingUp />} label="Performance" />
              <Tab icon={<ShoppingCart />} label="Orders" />
              <Tab icon={<Person />} label="Profile" />
            </Tabs>

            {/* Overview Tab */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ px: 3 }}>
                <Grid container spacing={3}>
                  {/* Quick Actions */}
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3, color: '#ff6b35' }}>
                      Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" onClick={() => {
                          resetForm();
                          setShowAddProduct(true);
                        }}>
                          <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Add sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" component="h3" fontWeight="bold">
                                  Add New Product
                                </Typography>
                                <Typography variant="body2" component="p" sx={{ opacity: 0.9 }}>
                                  Submit your latest creation
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" sx={{ background: "linear-gradient(135deg, #ff8e53 0%, #ffab40 100%)" }} onClick={() => setActiveTab(1)}>
                          <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Inventory sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" component="h3" fontWeight="bold">
                                  Manage Products
                                </Typography>
                                <Typography variant="body2" component="p" sx={{ opacity: 0.9 }}>
                                  {myProducts.length} approved items
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" sx={{ background: "linear-gradient(135deg, #ffab40 0%, #ffb74d 100%)" }} onClick={() => setActiveTab(2)}>
                          <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Pending sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" component="h3" fontWeight="bold">
                                  Review Status
                                </Typography>
                                <Typography variant="body2" component="p" sx={{ opacity: 0.9 }}>
                                  {myPendingProducts.length} pending
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" sx={{ background: "linear-gradient(135deg, #ffb74d 0%, #ffcc80 100%)" }} onClick={exportProducts}>
                          <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Download sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" component="h3" fontWeight="bold">
                                  Export Data
                                </Typography>
                                <Typography variant="body2" component="p" sx={{ opacity: 0.9 }}>
                                  Download product catalog
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    {/* Recent Products */}
                    <Card sx={{ mt: 3 }}>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold" sx={{ color: '#ff6b35' }}>
                          Recent Products
                        </Typography>
                        <List>
                          {myProducts.slice(0, 4).map((product) => (
                            <ListItem key={product.id} divider>
                              <ListItemIcon>
                                <img 
                                  src={product.images?.[0]} 
                                  alt={product.name}
                                  style={{ 
                                    width: 50, 
                                    height: 50, 
                                    objectFit: 'cover', 
                                    borderRadius: 8 
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={product.name}
                                secondary={
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                      {product.category} • {product.price}
                                    </Typography>
                                    {getStatusChip(product.status)}
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Right Sidebar - Performance */}
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ color: '#ff6b35' }}>
                      Performance Overview
                    </Typography>
                    
                    <Box className="hl-performance-chart" sx={{ mb: 3 }}>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                        Monthly Performance
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {monthlySales.map((month, index) => (
                          <Box key={month.month} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" component="span" fontWeight="500">
                                {month.month}
                              </Typography>
                              <Typography variant="body2" component="span" fontWeight="500">
                                {month.sales} sales
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={(month.sales / 15) * 100} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 4,
                                bgcolor: 'rgba(255,255,255,0.3)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: 'white'
                                }
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold" sx={{ color: '#ff6b35' }}>
                          Category Distribution
                        </Typography>
                        {categoryDistribution.map((category) => (
                          <Box key={category.name} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" component="span">{category.name}</Typography>
                              <Typography variant="body2" component="span" fontWeight="bold">{category.count} items</Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={(category.count / 23) * 100} 
                              sx={{ 
                                height: 6, 
                                borderRadius: 3,
                                bgcolor: 'grey.100',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: category.color
                                }
                              }}
                            />
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* My Products Tab */}
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ px: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" component="h2" fontWeight="bold" sx={{ color: '#ff6b35' }}>My Approved Products</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {filteredProducts.length} products • {approvalRate}% approval rate
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                      size="small"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="hl-search-box"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{ color: '#ff6b35' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={filterStatus}
                        label="Status"
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                    <Button 
                      variant="outlined" 
                      startIcon={<Download />}
                      onClick={exportProducts}
                      sx={{ borderRadius: 2, borderColor: '#ff6b35', color: '#ff6b35' }}
                    >
                      Export
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Add />}
                      onClick={() => {
                        resetForm();
                        setShowAddProduct(true);
                      }}
                      sx={{ 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff8e53, #ffab40)'
                        }
                      }}
                    >
                      Add Product
                    </Button>
                  </Box>
                </Box>

                {filteredProducts.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Inventory sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      {searchTerm || filterStatus !== 'all' ? 'No products match your search' : 'No approved products yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Submit your first product for approval
                    </Typography>
                    <Button 
                      variant="contained" 
                      onClick={() => {
                        resetForm();
                        setShowAddProduct(true);
                      }}
                      sx={{
                        background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff8e53, #ffab40)'
                        }
                      }}
                    >
                      Add Your First Product
                    </Button>
                  </Box>
                ) : (
                  <TableContainer component={Paper} className="hl-data-table">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Stock</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {product.images?.[0] && (
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.name}
                                    className="hl-product-image"
                                    style={{ 
                                      width: 50, 
                                      height: 50, 
                                    }}
                                  />
                                )}
                                <Box>
                                  <Typography fontWeight="bold">{product.name}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {product.description?.substring(0, 50)}...
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip label={product.category} size="small" className="hl-filter-chip" />
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight="bold" sx={{ color: '#ff6b35' }}>
                                {product.price}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'} 
                                color={product.stock > 0 ? 'success' : 'error'} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>{getStatusChip(product.status)}</TableCell>
                            <TableCell>
                              <Box className="hl-action-buttons">
                                <Button 
                                  size="small" 
                                  variant="outlined"
                                  startIcon={<Edit />}
                                  onClick={() => handleEditProduct(product)}
                                  sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  size="small" 
                                  color="info"
                                  startIcon={<Visibility />}
                                  onClick={() => navigate(`/product/${product.id}`)}
                                >
                                  View
                                </Button>
                                <Button 
                                  size="small" 
                                  color="error"
                                  startIcon={<Delete />}
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </TabPanel>

            {/* Pending Approval Tab */}
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ color: '#ff6b35' }}>
                  Products Pending Approval ({myPendingProducts.length})
                </Typography>
                
                {myPendingProducts.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No pending approvals
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      All your products have been reviewed
                    </Typography>
                  </Box>
                ) : (
                  <TableContainer component={Paper} className="hl-data-table">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Submitted Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                         {myPendingProducts.map((product) => (
                          <TableRow key={product.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {product.images?.[0] && (
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.name}
                                    className="hl-product-image"
                                    style={{ 
                                      width: 50, 
                                      height: 50, 
                                    }}
                                  />
                                )}
                                <Typography fontWeight="bold">{product.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip label={product.category} size="small" className="hl-filter-chip" />
                            </TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                              {product.submittedDate ? new Date(product.submittedDate).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell>{getStatusChip(product.status)}</TableCell>
                            <TableCell>
                              <Button 
                                size="small" 
                                variant="outlined"
                                startIcon={<Edit />}
                                onClick={() => handleEditProduct(product)}
                                sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </TabPanel>

            {/* Performance Tab */}
            <TabPanel value={activeTab} index={3}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ color: '#ff6b35' }}>
                  Performance Analytics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom>
                          Sales Performance
                        </Typography>
                        {/* Add charts here */}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom>
                          Approval Trends
                        </Typography>
                        {/* Add charts here */}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Profile Tab */}
            <TabPanel value={activeTab} index={5}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" sx={{ color: '#ff6b35' }}>
                  My Profile
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center', p: 4 }}>
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            mx: 'auto',
                            mb: 2,
                            background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                            fontSize: '2.5rem'
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
                          label="Verified Artisan" 
                          sx={{ 
                            mt: 1,
                            background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                            color: 'white'
                          }} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#ff6b35' }}>
                          Artisan Statistics
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ color: '#ff6b35' }}>
                                  {myProducts.length}
                                </Typography>
                                <Typography variant="body2">
                                  Approved Products
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ color: '#ff8e53' }}>
                                  {myPendingProducts.length}
                                </Typography>
                                <Typography variant="body2">
                                  Pending Approval
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ color: '#ffab40' }}>
                                  {approvalRate}%
                                </Typography>
                                <Typography variant="body2">
                                  Approval Rate
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ color: '#ffb74d' }}>
                                  {totalProducts}
                                </Typography>
                                <Typography variant="body2">
                                  Total Products
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
      </Box>

      {/* Enhanced Product Form */}
      <ProductForm />

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={() => setNotificationAnchor(null)}
        PaperProps={{ 
          sx: { 
            width: 360, 
            maxHeight: 400,
            borderRadius: 2,
            mt: 1
          } 
        }}
      >
        <MenuItem disabled sx={{ py: 1.5 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ff6b35' }}>
            Notifications ({unreadNotifications.length})
          </Typography>
        </MenuItem>
        <Divider />
        {notifications && notifications.length > 0 ? (
          <Box className="hl-custom-scrollbar" sx={{ maxHeight: 300, overflow: 'auto' }}>
            {notifications.slice(0, 6).map((notification) => (
              <MenuItem 
                key={notification.id}
                className={`hl-notification-item ${notification.unread ? 'unread' : ''}`}
                onClick={() => {
                  markNotificationAsRead && markNotificationAsRead(notification.id);
                  setNotificationAnchor(null);
                }}
                sx={{ py: 2 }}
              >
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {notification.unread && (
                      <Box sx={{ width: 8, height: 8, bgcolor: '#ff6b35', borderRadius: '50%' }} />
                    )}
                    <Typography variant="body2" fontWeight="medium">
                      {notification.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {notification.date ? new Date(notification.date).toLocaleDateString() : 'N/A'}
                  </Typography>
                  {notification.rejectionReason && (
                    <Alert severity="info" sx={{ mt: 1, fontSize: '0.75rem', py: 0.5 }}>
                      <strong>Admin Feedback:</strong> {notification.rejectionReason}
                    </Alert>
                  )}
                </Box>
              </MenuItem>
            ))}
          </Box>
        ) : (
          <MenuItem disabled sx={{ py: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
              No notifications
            </Typography>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => setActiveTab(6)} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Notifications fontSize="small" sx={{ color: '#ff6b35' }} />
          </ListItemIcon>
          View All Notifications
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        PaperProps={{ sx: { borderRadius: 2, mt: 1 } }}
      >
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon>
            <Person fontSize="small" sx={{ color: '#ff6b35' }} />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon>
            <Settings fontSize="small" sx={{ color: '#ff6b35' }} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#ff6b35' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArtisanDashboard;