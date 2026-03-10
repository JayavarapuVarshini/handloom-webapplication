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
  Checkbox,
  Drawer,
  Divider,
  Pagination,
  Stack,
  Alert,
  Snackbar,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Menu,
  MenuItem,
  Tooltip,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput
} from "@mui/material";
import {
  Dashboard,
  People,
  Inventory,
  Home,
  Logout,
  Person,
  Notifications,
  Pending,
  CheckCircle,
  Cancel,
  Visibility,
  ShoppingCart,
  TrendingUp,
  Category,
  Store,
  Email,
  Settings,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  FilterList,
  Download,
  Upload,
  Delete,
  Edit,
  Add,
  Search,
  MoreVert,
  DateRange,
  LocalShipping,
  Payment,
  Reviews
} from "@mui/icons-material";

// Custom CSS styles
const styles = `
.hl-admin-root {
  font-family: 'Inter', 'Roboto', sans-serif;
}

.hl-admin-main {
  transition: all 0.3s ease;
}

.hl-stats-grid .MuiCard-root {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.hl-stats-grid .MuiCard-root:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.hl-card-title {
  font-size: 1.75rem !important;
  font-weight: 700 !important;
  color: #2c3e50;
}

.hl-sidebar {
  background: linear-gradient(180deg, #ff6b35 0%, #ff8e53 100%);
  color: white;
}

.hl-sidebar-item {
  border-radius: 8px !important;
  margin: 4px 8px !important;
  transition: all 0.3s ease !important;
}

.hl-sidebar-item:hover {
  background: rgba(255,255,255,0.1) !important;
  transform: translateX(4px);
}

.hl-sidebar-item.active {
  background: rgba(255, 142, 83, 0.2) !important;
  border-left: 4px solid #ff8e53;
}

.hl-data-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.hl-data-table .MuiTableHead-root {
  background: #f8f9fa;
}

.hl-data-table .MuiTableRow-head .MuiTableCell-head {
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e9ecef;
}

.hl-product-image {
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #f8f9fa;
}

.hl-status-chip {
  font-weight: 600 !important;
  text-transform: capitalize;
}

.hl-action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.hl-quick-action-card {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hl-quick-action-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.hl-notification-item {
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
}

.hl-notification-item.unread {
  border-left-color: #ff8e53;
  background: #f8f9fa;
}

.hl-notification-item:hover {
  background: #e9ecef;
}

.hl-metric-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border: 1px solid #e9ecef;
}

.hl-metric-value {
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  background: linear-gradient(135deg, #ff6b35, #ff8e53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hl-chart-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border: 1px solid #e9ecef;
}

.hl-search-box {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.hl-filter-chip {
  border-radius: 20px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .hl-admin-main {
    margin-left: 0 !important;
    padding: 16px !important;
  }
  
  .hl-stats-grid .MuiGrid-item {
    margin-bottom: 16px;
  }
}
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductForView, setSelectedProductForView] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const { user, logout } = useAuth();
  const {
    products,
    pendingProducts,
    notifications,
    approveProduct,
    rejectProduct,
    markNotificationAsRead,
    getUnreadNotifications
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);
  const [bulkRejectReason, setBulkRejectReason] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const navigate = useNavigate();

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

  const handleApproveProduct = (productId) => {
    approveProduct(productId);
    setSnackbar({ open: true, message: 'Product approved successfully!', severity: 'success' });
  };

  const handleRejectProduct = (productId) => {
    if (!rejectionReason.trim()) {
      setSnackbar({ open: true, message: 'Please provide a rejection reason', severity: 'error' });
      return;
    }

    rejectProduct(productId, rejectionReason);
    setShowRejectDialog(false);
    setRejectionReason("");
    setSnackbar({ open: true, message: 'Product rejected successfully!', severity: 'success' });
  };

  const handleOpenRejectDialog = (product) => {
    setSelectedProduct(product);
    setShowRejectDialog(true);
  };

  const handleViewProductDetails = (product) => {
    setSelectedProductForView(product);
    setShowProductDetails(true);
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

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>
  );

  const unreadNotifications = getUnreadNotifications ? getUnreadNotifications() : [];

  // Statistics with mock data for demonstration
  const totalProducts = products?.length || 0;
  const pendingCount = pendingProducts?.length || 0;
  const totalArtisans = products ? [...new Set(products.map(p => p.artisan))].length : 0;
  const totalSales = 12450; // Mock data
  const conversionRate = 3.2; // Mock data
  const averageOrderValue = 89.99; // Mock data

  // Filtered pending products for search
  const filteredPending = pendingProducts?.filter(p =>
    !searchTerm || 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.artisan || '').toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filteredPending.length / rowsPerPage));
  const pagedPending = filteredPending.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
      setSelectAll(false);
    } else {
      const ids = filteredPending.map(p => p.id);
      setSelectedIds(ids);
      setSelectAll(true);
    }
  };

  const handleBulkApprove = () => {
    selectedIds.forEach(id => approveProduct(id));
    setSnackbar({ open: true, message: `${selectedIds.length} products approved`, severity: 'success' });
    setSelectedIds([]);
    setSelectAll(false);
  };

  const handleBulkRejectConfirm = () => {
    selectedIds.forEach(id => rejectProduct(id, bulkRejectReason));
    setSnackbar({ open: true, message: `${selectedIds.length} products rejected`, severity: 'success' });
    setSelectedIds([]);
    setSelectAll(false);
    setBulkRejectReason('');
    setBulkRejectOpen(false);
  };

  const handleMarkNotificationRead = (id) => {
    markNotificationAsRead && markNotificationAsRead(id);
  };

  // Mock data for charts and analytics
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 2780 },
    { month: 'May', sales: 1890 },
    { month: 'Jun', sales: 2390 },
  ];

  const categoryData = [
    { name: 'Textiles', value: 35 },
    { name: 'Pottery', value: 25 },
    { name: 'Jewelry', value: 20 },
    { name: 'Woodwork', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const recentActivities = [
    { id: 1, action: 'Product approved', target: 'Handwoven Basket', user: 'Admin', time: '2 min ago' },
    { id: 2, action: 'New artisan registered', target: 'Maria Gonzalez', user: 'System', time: '5 min ago' },
    { id: 3, action: 'Product rejected', target: 'Clay Pot Set', user: 'Admin', time: '1 hour ago' },
    { id: 4, action: 'Order completed', target: 'Order #12345', user: 'System', time: '2 hours ago' },
  ];

  const drawer = (
    <Box className="hl-sidebar" sx={{ height: '100%', py: 2 }}>
      <Box sx={{ px: 2, mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
          Global Loom Collective
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Admin Panel
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
      
      <List>
        {[
          { text: 'Dashboard', icon: <Dashboard />, active: activeTab === 0 },
          { text: 'Products', icon: <Inventory />, active: activeTab === 1 || activeTab === 2 },
          { text: 'Artisans', icon: <People />, active: activeTab === 3 },
          { text: 'Orders', icon: <ShoppingCart />, active: activeTab === 4 },
          { text: 'Analytics', icon: <TrendingUp />, active: activeTab === 5 },
          { text: 'Notifications', icon: <Notifications />, active: activeTab === 6 },
          { text: 'Settings', icon: <Settings />, active: activeTab === 7 },
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
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ px: 2, mt: 'auto', pt: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'orange.main' }}>
            {user?.name?.charAt(0) || <Person />}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
              {user?.name || 'Administrator'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Admin
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: "#fff4e6", minHeight: "100vh" }} className="hl-admin-root">
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 1300, 
          bgcolor: "white", 
          color: "text.primary",
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'orange.main', display: { xs: 'none', sm: 'flex' } }}>
              {user?.name?.charAt(0) || <Person />}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="orange.main">
                Global Loom Collective
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Admin Dashboard
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Search">
              <IconButton sx={{ color: 'orange.main' }}>
                <Search />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton 
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
                sx={{ color: unreadNotifications.length > 0 ? 'orange.main' : 'inherit' }}
              >
                <Badge badgeContent={unreadNotifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account">
              <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'orange.main' }}>
                  {user?.name?.charAt(0) || <Person />}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: 260 }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
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
              width: 260,
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
          width: { md: `calc(100% - 260px)` },
          mt: '64px'
        }} 
        className="hl-admin-main"
      >
        {/* Welcome Section */}
        <Card sx={{ mb: 4, background: "linear-gradient(135deg, #ff6b35 0%, #ff8e53 50%, #f4511e 100%)", color: "white" }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h3" gutterBottom fontWeight="bold">
                  Welcome back, {user?.name || 'Admin'}!
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  Here's what's happening with your platform today.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip label={`${pendingCount} pending approvals`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  <Chip label={`${totalProducts} total products`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  <Chip label={`${totalArtisans} active artisans`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                <Avatar sx={{ width: 120, height: 120, bgcolor: 'rgba(255,255,255,0.2)', mx: 'auto' }}>
                  <Person sx={{ fontSize: 60 }} />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }} className="hl-stats-grid">
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'orange.main', width: 56, height: 56 }}><Inventory /></Avatar>
                  <Box>
                    <Typography className="hl-card-title">{totalProducts}</Typography>
                    <Typography variant="body2" color="text.secondary">Total Products</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={75} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}><Pending /></Avatar>
                  <Box>
                    <Typography className="hl-card-title">{pendingCount}</Typography>
                    <Typography variant="body2" color="text.secondary">Pending Approvals</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={pendingCount > 0 ? 40 : 0} color="warning" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}><People /></Avatar>
                  <Box>
                    <Typography className="hl-card-title">{totalArtisans}</Typography>
                    <Typography variant="body2" color="text.secondary">Active Artisans</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={60} color="success" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'orange.main', width: 56, height: 56 }}><ShoppingCart /></Avatar>
                  <Box>
                    <Typography className="hl-card-title">${totalSales.toLocaleString()}</Typography>
                    <Typography variant="body2" color="text.secondary">Total Sales</Typography>
                  </Box>
                </Stack>
                <LinearProgress variant="determinate" value={85} color="info" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Tabs */}
        <Card>
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
                  color: 'text.secondary',
                  '&.Mui-selected': { color: 'orange.main' }
                },
                '& .MuiTabs-indicator': { backgroundColor: 'orange.main' }
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<Dashboard />} label="Overview" />
              <Tab icon={<Pending />} label="Pending Approvals" />
              <Tab icon={<Inventory />} label="All Products" />
              <Tab icon={<People />} label="Artisans" />
              <Tab icon={<ShoppingCart />} label="Orders" />
              <Tab icon={<TrendingUp />} label="Analytics" />
              <Tab icon={<Notifications />} label="Notifications" />
              <Tab icon={<Settings />} label="Settings" />
            </Tabs>

            {/* Overview Tab */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ px: 3 }}>
                <Grid container spacing={3}>
                  {/* Quick Actions */}
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" onClick={() => setActiveTab(1)}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Pending sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" fontWeight="bold">
                                  Review Products
                                </Typography>
                                <Typography variant="body2">
                                  {pendingCount} items pending approval
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" sx={{ background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <People sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" fontWeight="bold">
                                  Manage Artisans
                                </Typography>
                                <Typography variant="body2">
                                  {totalArtisans} active artisans
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" sx={{ background: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)" }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <TrendingUp sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" fontWeight="bold">
                                  View Analytics
                                </Typography>
                                <Typography variant="body2">
                                  Platform performance insights
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card className="hl-quick-action-card" sx={{ background: "linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)" }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Settings sx={{ fontSize: 40 }} />
                              <Box>
                                <Typography variant="h6" fontWeight="bold">
                                  Settings
                                </Typography>
                                <Typography variant="body2">
                                  Configure platform settings
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    {/* Recent Activity */}
                    <Card sx={{ mt: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          Recent Activity
                        </Typography>
                        <List>
                          {recentActivities.map((activity) => (
                            <ListItem key={activity.id} divider>
                              <ListItemIcon>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'orange.main' }}>
                                  {activity.user.charAt(0)}
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary={activity.action}
                                secondary={`${activity.target} • ${activity.time}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Right Sidebar - Metrics */}
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Platform Metrics
                    </Typography>
                    
                    <Box className="hl-metric-card" sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Conversion Rate
                      </Typography>
                      <Typography className="hl-metric-value">
                        {conversionRate}%
                      </Typography>
                      <LinearProgress variant="determinate" value={conversionRate * 10} sx={{ mt: 1 }} />
                    </Box>

                    <Box className="hl-metric-card" sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Average Order Value
                      </Typography>
                      <Typography className="hl-metric-value">
                        ${averageOrderValue}
                      </Typography>
                      <LinearProgress variant="determinate" value={75} color="success" sx={{ mt: 1 }} />
                    </Box>

                    <Box className="hl-metric-card">
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Customer Satisfaction
                      </Typography>
                      <Typography className="hl-metric-value">
                        4.8/5
                      </Typography>
                      <LinearProgress variant="determinate" value={96} color="secondary" sx={{ mt: 1 }} />
                    </Box>

                    {/* Category Distribution */}
                    <Card sx={{ mt: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          Product Categories
                        </Typography>
                        {categoryData.map((category) => (
                          <Box key={category.name} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">{category.name}</Typography>
                              <Typography variant="body2" fontWeight="bold">{category.value}%</Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={category.value} 
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Pending Approvals Tab */}
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ px: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Products Pending Approval</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pendingCount} products waiting for review
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      size="small"
                      placeholder="Search products or artisans..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="hl-search-box"
                      InputProps={{
                        startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                    />
                    <Button startIcon={<FilterList />} variant="outlined">
                      Filter
                    </Button>
                    {selectedIds.length > 0 && (
                      <>
                        <Button 
                          startIcon={<CheckCircle />} 
                          variant="contained" 
                          color="success"
                          onClick={handleBulkApprove}
                        >
                          Approve ({selectedIds.length})
                        </Button>
                        <Button 
                          startIcon={<Cancel />} 
                          variant="outlined" 
                          color="error"
                          onClick={() => setBulkRejectOpen(true)}
                        >
                          Reject ({selectedIds.length})
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>

                {pendingProducts.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No pending approvals
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      All products have been reviewed
                    </Typography>
                  </Box>
                ) : (
                  <TableContainer component={Paper} className="hl-data-table">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectAll}
                              onChange={toggleSelectAll}
                              indeterminate={selectedIds.length > 0 && selectedIds.length < filteredPending.length}
                            />
                          </TableCell>
                          <TableCell>Product Details</TableCell>
                          <TableCell>Artisan</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Submitted</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pagedPending.map((product) => (
                          <TableRow key={product.id} hover selected={selectedIds.includes(product.id)}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedIds.includes(product.id)}
                                onChange={() => toggleSelect(product.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    bgcolor: 'orange.100',
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                  }}
                                >
                                  {product.images && product.images.length > 0 ? (
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="hl-product-image"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <Inventory sx={{ color: 'orange.main' }} />
                                  )}
                                </Box>
                                <Box>
                                  <Typography fontWeight="bold">{product.name}</Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                                    {product.description?.substring(0, 80)}...
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'orange.main' }}>
                                  {product.artisan?.charAt(0)}
                                </Avatar>
                                <Typography fontWeight="bold">{product.artisan}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip label={product.category} size="small" className="hl-filter-chip" sx={{ bgcolor: 'orange.100', color: 'orange.800', border: '1px solid', borderColor: 'orange.200' }} />
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight="bold" color="primary.main">
                                {product.price}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {product.submittedDate ? new Date(product.submittedDate).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell>
                              <Box className="hl-action-buttons">
                                <Tooltip title="Approve">
                                  <IconButton 
                                    color="success" 
                                    onClick={() => handleApproveProduct(product.id)}
                                    size="small"
                                  >
                                    <CheckCircle />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject">
                                  <IconButton 
                                    color="error" 
                                    onClick={() => handleOpenRejectDialog(product)}
                                    size="small"
                                  >
                                    <Cancel />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="View Details">
                                  <IconButton 
                                    onClick={() => handleViewProductDetails(product)}
                                    size="small"
                                    sx={{ color: 'orange.main' }}
                                  >
                                    <Visibility />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                
                {pageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination 
                      count={pageCount} 
                      page={page} 
                      onChange={(e, value) => setPage(value)}
                      sx={{
                        '& .MuiPaginationItem-root.Mui-selected': {
                          bgcolor: 'orange.main',
                          color: 'white'
                        }
                      }}
                    />
                  </Box>
                )}
              </Box>
            </TabPanel>

            {/* All Products Tab */}
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ px: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    All Products ({totalProducts})
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Date Range</InputLabel>
                      <Select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        label="Date Range"
                      >
                        <MenuItem value="all">All Time</MenuItem>
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="week">This Week</MenuItem>
                        <MenuItem value="month">This Month</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <Button startIcon={<Download />} variant="outlined">
                      Export
                    </Button>
                  </Box>
                </Box>

                {products.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Inventory sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No products available
                    </Typography>
                  </Box>
                ) : (
                  <TableContainer component={Paper} className="hl-data-table">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Artisan</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Stock</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    bgcolor: 'orange.100',
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                  }}
                                >
                                  {product.images && product.images.length > 0 ? (
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="hl-product-image"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <Inventory sx={{ color: 'orange.main' }} />
                                  )}
                                </Box>
                                <Box>
                                  <Typography fontWeight="bold">{product.name}</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    SKU: {product.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'orange.main' }}>
                                  {product.artisan?.charAt(0)}
                                </Avatar>
                                <Typography>{product.artisan}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip label={product.category} size="small" className="hl-filter-chip" sx={{ bgcolor: 'orange.100', color: 'orange.800', border: '1px solid', borderColor: 'orange.200' }} />
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight="bold" color="orange.main">
                                {product.price}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {getStatusChip(product.status || 'approved')}
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'} 
                                color={product.stock > 0 ? 'success' : 'error'} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>
                              <Box className="hl-action-buttons">
                                <Tooltip title="Edit">
                                  <IconButton size="small" sx={{ color: 'orange.main' }}>
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="View">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleViewProductDetails(product)}
                                  >
                                    <Visibility />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="More">
                                  <IconButton size="small">
                                    <MoreVert />
                                  </IconButton>
                                </Tooltip>
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

            {/* Additional tab content for other tabs would go here... */}
            <TabPanel value={activeTab} index={3}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Artisans Management
                </Typography>
                {/* Artisans content would be implemented similarly */}
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Orders Management
                </Typography>
                {/* Orders content would be implemented similarly */}
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={5}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Analytics & Reports
                </Typography>
                {/* Analytics content would be implemented similarly */}
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={6}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Notifications Center
                </Typography>
                {/* Notifications content would be implemented similarly */}
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={7}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Platform Settings
                </Typography>
                {/* Settings content would be implemented similarly */}
              </Box>
            </TabPanel>
          </CardContent>
        </Card>
      </Box>

      {/* Product Details Dialog */}
      <Dialog
        open={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Product Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedProductForView && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={selectedProductForView.images?.[0] || '/api/placeholder/400/500'}
                    alt={selectedProductForView.name}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
                {selectedProductForView.images && selectedProductForView.images.length > 1 && (
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    {selectedProductForView.images.slice(1).map((image, index) => (
                      <Grid item xs={4} key={index}>
                        <Card sx={{ borderRadius: 1 }}>
                          <CardMedia
                            component="img"
                            height="80"
                            image={image}
                            alt={`${selectedProductForView.name} ${index + 2}`}
                            sx={{ objectFit: 'cover' }}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  {selectedProductForView.name}
                </Typography>
                <Typography variant="h5" color="orange.main" gutterBottom fontWeight="bold">
                  {selectedProductForView.price}
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  {selectedProductForView.description}
                </Typography>
               
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Category
                    </Typography>
                    <Chip label={selectedProductForView.category} sx={{ bgcolor: 'orange.100', color: 'orange.800', border: '1px solid', borderColor: 'orange.200' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Artisan
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedProductForView.artisan}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Product Information
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedProductForView.materials && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Materials
                        </Typography>
                        <Typography variant="body1">
                          {selectedProductForView.materials}
                        </Typography>
                      </Grid>
                    )}
                    {selectedProductForView.dimensions && (
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Dimensions
                        </Typography>
                        <Typography variant="body1">
                          {selectedProductForView.dimensions}
                        </Typography>
                      </Grid>
                    )}
                    {selectedProductForView.careInstructions && (
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Care Instructions
                        </Typography>
                        <Typography variant="body1">
                          {selectedProductForView.careInstructions}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>

                <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={`Stock: ${selectedProductForView.stock || '0'}`}
                    color={selectedProductForView.stock > 0 ? 'success' : 'error'}
                  />
                  <Chip
                    label={`Delivery: ${selectedProductForView.deliveryTime || 'N/A'}`}
                    variant="outlined"
                  />
                  {getStatusChip(selectedProductForView.status || 'approved')}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProductDetails(false)}>Close</Button>
          <Button variant="contained" onClick={() => setShowProductDetails(false)}>
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Product Dialog */}
      <Dialog
        open={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">Reject Product</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
                You are about to reject: <strong>{selectedProduct.name}</strong>
              </Alert>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Please provide a reason for rejection. This will be sent to the artisan.
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRejectDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => selectedProduct && handleRejectProduct(selectedProduct.id)}
          >
            Reject Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Reject Dialog */}
      <Dialog
        open={bulkRejectOpen}
        onClose={() => setBulkRejectOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">Bulk Reject Products</Typography>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
            You are about to reject {selectedIds.length} products
          </Alert>
          <Typography variant="body2" gutterBottom color="text.secondary">
            Please provide a reason for rejection. This will be sent to all affected artisans.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter rejection reason for all selected products..."
            value={bulkRejectReason}
            onChange={(e) => setBulkRejectReason(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkRejectOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleBulkRejectConfirm}
            disabled={!bulkRejectReason.trim()}
          >
            Reject {selectedIds.length} Products
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={() => setNotificationAnchor(null)}
        PaperProps={{ sx: { width: 360, maxHeight: 400 } }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle1" fontWeight="bold">
            Notifications
          </Typography>
        </MenuItem>
        {notifications && notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification) => (
            <MenuItem 
              key={notification.id}
              className={`hl-notification-item ${notification.unread ? 'unread' : ''}`}
              onClick={() => {
                handleMarkNotificationRead(notification.id);
                setNotificationAnchor(null);
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="body2" fontWeight="medium">
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => setActiveTab(6)}>
          <ListItemIcon>
            <Notifications fontSize="small" />
          </ListItemIcon>
          View All Notifications
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
      >
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;