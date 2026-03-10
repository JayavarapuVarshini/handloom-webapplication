import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import { useProducts } from '../context/ProductContext'; 
import { 
Grid, 
Card, 
CardContent, 
CardMedia, 
Typography, 
Button, 
Box, 
Chip, 
Paper, 
Table, 
TableBody, 
TableCell, 
TableContainer, 
TableHead, 
TableRow, 
Avatar, 
LinearProgress, 
AppBar, 
Toolbar, 
Badge, 
IconButton, 
Dialog, 
DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Snackbar, 
  Alert, 
  Tabs, 
  Tab, 
  Fab, 
  Tooltip, 
  Rating, 
  Divider, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton, 
  alpha, 
  useTheme, 
  CardActionArea, 
  ListItemAvatar, 
} from '@mui/material'; 
import {  
  TrendingUp,  
  Share,  
  Visibility,  
  People,  
  Inventory,  
  NewReleases, 
  Home, 
  Logout, 
  Person, 
  Notifications, 
  Campaign, 
  Analytics, 
  Email, 
  Facebook, 
  Instagram, 
  Twitter, 
  Add, 
  TrendingDown, 
  Star, 
  StarBorder, 
  Schedule, 
  Insights, 
  ShoppingCart, 
  AttachMoney, 
  Groups, 
  ContentCopy, 
  CheckCircle, 
  BarChart, 
  PieChart, 
Dashboard, 
Menu as MenuIcon, 
ContentPaste, 
GroupWork, 
Settings, 
Report, 
Link as LinkIcon, 
CalendarMonth, 
TrendingFlat, 
Public, 
SmartDisplay, 
} from '@mui/icons-material'; 
// Light orange color palette 
const LIGHT_ORANGE_PALETTE = { 
primary: '#FF8C00', 
primaryLight: '#FFA733', 
primaryDark: '#CC7000', 
secondary: '#FF6B35', 
accent: '#FF5722', 
background: '#FFFFFF', 
card: '#FFFFFF', 
text: '#2D3748', 
textSecondary: '#718096', 
border: '#E2E8F0', 
}; 
// Custom component for animated stat cards 
const StatCard = ({ title, value, icon, color, trend, change, onClick }) => ( 
  <Card  
    sx={{  
      background: `linear-gradient(135deg, ${color} 0%, 
${LIGHT_ORANGE_PALETTE.primaryDark} 100%)`, 
      color: 'white', 
      cursor: onClick ? 'pointer' : 'default', 
      transition: 'all 0.3s ease', 
      transform: 'translateY(0)', 
      boxShadow: `0 8px 25px ${alpha(color, 0.3)}`, 
      border: `1px solid ${alpha(color, 0.2)}`, 
      '&:hover': onClick ? { 
        transform: 'translateY(-8px)', 
        boxShadow: `0 16px 40px ${alpha(color, 0.4)}`, 
      } : {}, 
      position: 'relative', 
      overflow: 'hidden', 
      minHeight: 140, 
      display: 'flex', 
      alignItems: 'center', 
      borderRadius: 3, 
    }} 
    onClick={onClick} 
  > 
    <Box sx={{  
      position: 'absolute',  
      top: -20,  
      right: -20,  
      opacity: 0.15, 
      transform: 'rotate(25deg)' 
    }}> 
      {React.cloneElement(icon, { sx: { fontSize: 100 } })} 
    </Box> 
    <CardContent sx={{ width: '100%', position: 'relative' }}> 
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 
}}> 
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> 
          {React.cloneElement(icon, { sx: { color: 'white', fontSize: 20 } })} 
          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}> 
            {title} 
          </Typography> 
        </Box> 
        <Chip  
          label={trend}  
          size="small"  
          icon={change > 0 ? <TrendingUp /> : <TrendingDown />} 
          sx={{  
            bgcolor: 'rgba(255,255,255,0.25)',  
            color: 'white', 
            fontSize: '0.7rem', 
            fontWeight: 'bold', 
            backdropFilter: 'blur(10px)', 
          }} 
        /> 
      </Box> 
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0.5, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        {value}
      </Typography>
<Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 500 }}> 
{change > 0 ? '+' : ''}{change}% from last week 
</Typography> 
</CardContent> 
</Card> 
); 
const MarketingDashboard = () => { 
const { user, logout } = useAuth(); 
const {  
newProducts = [],  
approvedProducts = [],  
getUnreadNotifications = () => [], 
promoteProduct, 
trackProductView, 
} = useProducts(); 
const navigate = useNavigate(); 
const theme = useTheme(); 
const [activeTab, setActiveTab] = useState(0); 
const [campaignDialog, setCampaignDialog] = useState(false); 
const [shareDialog, setShareDialog] = useState(false); 
const [promoteDialog, setPromoteDialog] = useState(false); 
const [analyticsDialog, setAnalyticsDialog] = useState(false); 
const [newsletterDialog, setNewsletterDialog] = useState(false); 
const [contentCalendarDialog, setContentCalendarDialog] = useState(false); 
const [selectedProduct, setSelectedProduct] = useState(null); 
const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' 
}); 
const [campaignData, setCampaignData] = useState({ 
name: '', 
platform: 'all', 
budget: '', 
products: [], 
}); 
const [promoteData, setPromoteData] = useState({ 
budget: '', 
duration: 7, 
platforms: ['all'], 
}); 
const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false); 
const [productAnalytics, setProductAnalytics] = useState({}); 
const [socialMediaStats, setSocialMediaStats] = useState({}); 
const [audienceData, setAudienceData] = useState({}); 
// Enhanced marketing statistics 
const [marketingStats, setMarketingStats] = useState({ 
totalProducts: 0, 
newThisWeek: 0, 
activeCampaigns: 3, 
engagementRate: 4.2, 
conversionRate: 2.8, 
totalRevenue: 0, 
}); 
 
  // Mock campaign data 
  const [campaigns, setCampaigns] = useState([ 
    { 
      id: 1, 
      name: 'New Arrivals Launch', 
      platform: 'instagram', 
      status: 'active', 
      budget: 5000, 
      spent: 3200, 
      impressions: 125000, 
      engagement: 4200, 
      clicks: 1250, 
      products: 12, 
      startDate: '2024-01-10', 
      endDate: '2024-01-24' 
    }, 
    { 
      id: 2, 
      name: 'Artisan Spotlight', 
      platform: 'facebook', 
      status: 'active', 
      budget: 3000, 
      spent: 1800, 
      impressions: 89000, 
      engagement: 3100, 
      clicks: 980, 
      products: 8, 
      startDate: '2024-01-12', 
      endDate: '2024-01-26' 
    }, 
    { 
      id: 3, 
      name: 'Festival Collection', 
      platform: 'all', 
      status: 'planned', 
      budget: 8000, 
      spent: 0, 
      impressions: 0, 
      engagement: 0, 
      clicks: 0, 
      products: 15, 
      startDate: '2024-01-20', 
      endDate: '2024-02-05' 
    } 
  ]); 
 
  // Navigation items for sidebar with orange theme 
  const navItems = [ 
    { id: 0, label: 'Dashboard', icon: <Dashboard />, color: 
LIGHT_ORANGE_PALETTE.primary }, 
    { id: 1, label: 'Campaigns', icon: <Campaign />, color: 
LIGHT_ORANGE_PALETTE.secondary }, 
    { id: 2, label: 'Product Analytics', icon: <Analytics />, color: '#FF9800' }, 
    { id: 3, label: 'Audience Insights', icon: <Groups />, color: '#FF5722' }, 
    { id: 4, label: 'Content Calendar', icon: <ContentPaste />, color: '#E65100' }, 
    { id: 5, label: 'Social Media', icon: <GroupWork />, color: '#FF6D00' }, 
    { id: 6, label: 'Reports', icon: <Report />, color: '#FF8A65' }, 
    { id: 7, label: 'Settings', icon: <Settings />, color: '#FFB74D' }, 
  ]; 
 
  useEffect(() => { 
    // Calculate enhanced statistics 
    const totalRevenue = approvedProducts.reduce((sum, product) => { 
      return sum + (parseInt(product.price?.replace(/[^0-9]/g, '') || 0)); 
    }, 0); 
 
    setMarketingStats({ 
      totalProducts: approvedProducts.length, 
      newThisWeek: newProducts.length, 
      activeCampaigns: campaigns.filter(c => c.status === 'active').length, 
      engagementRate: 4.2, 
      conversionRate: 2.8, 
      totalRevenue: totalRevenue, 
    }); 
 
    // Initialize product analytics 
    const analytics = {}; 
    approvedProducts.forEach(product => { 
      analytics[product.id] = { 
        views: Math.floor(Math.random() * 1000), 
        shares: Math.floor(Math.random() * 100), 
        conversions: Math.floor(Math.random() * 50), 
        revenue: Math.floor(Math.random() * 5000), 
      }; 
    }); 
    setProductAnalytics(analytics); 
 
    // Initialize social media stats 
    setSocialMediaStats({ 
      instagram: { followers: 12500, engagement: 4.2, growth: 12 }, 
      facebook: { followers: 8900, engagement: 3.1, growth: 8 }, 
      twitter: { followers: 4200, engagement: 2.8, growth: 5 }, 
    }); 
 
    // Initialize audience data 
    setAudienceData({ 
      demographics: { 
        '18-24': 25, 
        '25-34': 45, 
        '35-44': 20, 
        '45+': 10, 
      }, 
      locations: { 
        'India': 65, 
        'USA': 15, 
        'UK': 8, 
        'Other': 12, 
      } 
    }); 
  }, [approvedProducts, newProducts, campaigns]); 
 
  const handleLogout = () => { 
    logout(); 
    navigate("/"); 
  }; 
 
  const handleCreateCampaign = () => { 
    if (!campaignData.name || !campaignData.budget) { 
      setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' }); 
      return; 
    } 
 
    const newCampaign = { 
      id: campaigns.length + 1, 
      ...campaignData, 
      status: 'planned', 
      spent: 0, 
      impressions: 0, 
      engagement: 0, 
      clicks: 0, 
      startDate: new Date().toISOString().split('T')[0], 
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] 
    }; 
 
    setCampaigns([...campaigns, newCampaign]); 
    setCampaignDialog(false); 
    setCampaignData({ name: '', platform: 'all', budget: '', products: [] }); 
    setSnackbar({ open: true, message: 'Campaign created successfully!', severity: 
'success' }); 
  }; 
const handlePromoteProduct = (product) => { 
setSelectedProduct(product); 
setPromoteDialog(true); 
}; 
const handleStartPromotion = () => { 
if (!promoteData.budget) { 
setSnackbar({ open: true, message: 'Please set a budget', severity: 'error' }); 
return; 
} 
if (promoteProduct) { 
promoteProduct(selectedProduct.id, promoteData); 
} 
setPromoteDialog(false); 
setPromoteData({ budget: '', duration: 7, platforms: ['all'] }); 
setSnackbar({  
open: true,  
message: `Promotion started for ${selectedProduct?.name}!`,  
severity: 'success'  
}); 
}; 
const handleShareProduct = (product) => { 
setSelectedProduct(product); 
setShareDialog(true); 
  }; 
 
  const handleViewAnalytics = (product) => { 
    setSelectedProduct(product); 
    setAnalyticsDialog(true); 
  }; 
 
  const copyShareLink = () => { 
    const link = `${window.location.origin}/products/${selectedProduct?.id}`; 
    navigator.clipboard.writeText(link); 
    setSnackbar({ open: true, message: 'Link copied to clipboard!', severity: 'success' }); 
  }; 
 
  const shareOnPlatform = (platform) => { 
    const message = `Check out this beautiful handloom product: 
${selectedProduct?.name}`; 
    const url = `${window.location.origin}/products/${selectedProduct?.id}`; 
     
    let shareUrl = ''; 
    switch (platform) { 
      case 'twitter': 
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`; 
        break; 
      case 'facebook': 
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; 
        break; 
      case 'instagram': 
        setSnackbar({ open: true, message: 'Copy the link to share on Instagram', severity: 
'info' }); 
        return; 
      case 'email': 
        shareUrl = `mailto:?subject=Check out this handloom 
product&body=${encodeURIComponent(message + ' ' + url)}`; 
        break; 
      default: 
        return; 
    } 
     
    window.open(shareUrl, '_blank'); 
    setShareDialog(false); 
  }; 
 
  const handleSendNewsletter = () => { 
    setNewsletterDialog(true); 
  }; 
 
  const handleGenerateReport = () => { 
    setSnackbar({ open: true, message: 'Report generation started! Download will begin shortly.', severity: 'info' }); 
  }; 
 
  const handleViewProduct = (product) => { 
    if (trackProductView) { 
      trackProductView(product.id); 
    } 
    navigate(`/products/${product.id}`); 
  }; 
 
  const handleCampaignAction = (campaignId, action) => { 
    setCampaigns(campaigns.map(campaign =>  
      campaign.id === campaignId  
        ? { ...campaign, status: action } 
        : campaign 
    )); 
    setSnackbar({ open: true, message: `Campaign ${action}!`, severity: 'success' }); 
  }; 
 
  const handleContentCalendar = () => { 
    setContentCalendarDialog(true); 
  }; 
 
  // Get top categories 
  const topCategories = Object.entries( 
    approvedProducts.reduce((acc, product) => { 
      acc[product.category] = (acc[product.category] || 0) + 1; 
      return acc; 
    }, {}) 
  ) 
    .sort(([,a], [,b]) => b - a) 
    .slice(0, 5); 
 
  // Get popular artisans 
  const popularArtisans = Object.entries( 
    approvedProducts.reduce((acc, product) => { 
      acc[product.artisan] = (acc[product.artisan] || 0) + 1; 
      return acc; 
    }, {}) 
  ) 
    .sort(([,a], [,b]) => b - a) 
    .slice(0, 5); 
 
  const unreadNotifications = getUnreadNotifications(); 
 
  const getPlatformIcon = (platform) => { 
    switch (platform) { 
      case 'facebook': return <Facebook />; 
      case 'instagram': return <Instagram />; 
      case 'twitter': return <Twitter />; 
      case 'all': return <Share />; 
      default: return <Campaign />; 
    } 
  }; 
 
  const getPlatformColor = (platform) => { 
    switch (platform) { 
      case 'facebook': return '#1877F2'; 
      case 'instagram': return '#E4405F'; 
      case 'twitter': return '#1DA1F2'; 
      case 'all': return LIGHT_ORANGE_PALETTE.primary; 
      default: return LIGHT_ORANGE_PALETTE.secondary; 
    } 
  }; 
 
  // Enhanced Quick Actions Component 
  const QuickActions = () => ( 
    <Card sx={{  
      mb: 3,  
      boxShadow: 3,  
      borderRadius: 3, 
      background: 'white', 
      border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
      '&:hover': { 
        boxShadow: 4, 
      } 
    }}> 
      <CardContent sx={{ p: 3 }}> 
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{  
          display: 'flex',  
          alignItems: 'center',  
          gap: 1, 
          color: LIGHT_ORANGE_PALETTE.primary, 
          mb: 3 
        }}> 
          <TrendingUp sx={{ fontSize: 28 }} />  
          Quick Actions 
        </Typography> 
        <Grid container spacing={2}> 
          <Grid item xs={6}> 
            <CardActionArea  
              onClick={() => setCampaignDialog(true)} 
              sx={{  
                borderRadius: 2, 
                '&:hover': { transform: 'translateY(-4px)' }, 
                transition: 'all 0.3s ease' 
              }} 
            > 
              <Card sx={{  
                textAlign: 'center',  
                p: 2,  
                background: 'white', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: `2px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.2)}`, 
                '&:hover': {  
                  borderColor: LIGHT_ORANGE_PALETTE.primary, 
                  boxShadow: `0 8px 25px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.15)}` 
                }, 
                transition: 'all 0.3s ease' 
              }}> 
                <Avatar sx={{  
                  bgcolor: LIGHT_ORANGE_PALETTE.primary,  
                  width: 50,  
                  height: 50,  
                  mx: 'auto',  
                  mb: 1, 
                  boxShadow: `0 4px 15px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.3)}` 
                }}> 
                  <Add /> 
                </Avatar> 
                <Typography variant="body2" fontWeight="medium" 
color={LIGHT_ORANGE_PALETTE.text}> 
                  New Campaign 
                </Typography> 
              </Card> 
            </CardActionArea> 
          </Grid> 
          <Grid item xs={6}> 
            <CardActionArea  
              onClick={handleSendNewsletter} 
              sx={{  
                borderRadius: 2, 
                '&:hover': { transform: 'translateY(-4px)' }, 
                transition: 'all 0.3s ease' 
              }} 
            > 
              <Card sx={{  
                textAlign: 'center',  
                p: 2,  
                background: 'white', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: `2px solid ${alpha(LIGHT_ORANGE_PALETTE.secondary, 0.2)}`, 
                '&:hover': {  
                  borderColor: LIGHT_ORANGE_PALETTE.secondary, 
                  boxShadow: `0 8px 25px ${alpha(LIGHT_ORANGE_PALETTE.secondary, 0.15)}` 
                } 
              }}> 
                <Avatar sx={{  
                  bgcolor: LIGHT_ORANGE_PALETTE.secondary,  
                  width: 50,  
                  height: 50,  
                  mx: 'auto',  
                  mb: 1, 
                  boxShadow: `0 4px 15px ${alpha(LIGHT_ORANGE_PALETTE.secondary, 0.3)}` 
                }}> 
                  <Email /> 
                </Avatar> 
                <Typography variant="body2" fontWeight="medium" 
color={LIGHT_ORANGE_PALETTE.text}> 
                  Newsletter 
                </Typography> 
              </Card> 
            </CardActionArea> 
          </Grid> 
          <Grid item xs={6}> 
            <CardActionArea  
              onClick={handleGenerateReport} 
              sx={{  
                borderRadius: 2, 
                '&:hover': { transform: 'translateY(-4px)' }, 
                transition: 'all 0.3s ease' 
              }} 
            > 
              <Card sx={{  
                textAlign: 'center',  
                p: 2,  
                background: 'white', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: `2px solid ${alpha('#FF9800', 0.2)}`, 
                '&:hover': {  
                  borderColor: '#FF9800', 
                  boxShadow: `0 8px 25px ${alpha('#FF9800', 0.15)}` 
                } 
              }}> 
                <Avatar sx={{  
                  bgcolor: '#FF9800',  
                  width: 50,  
                  height: 50,  
                  mx: 'auto',  
                  mb: 1, 
                  boxShadow: `0 4px 15px ${alpha('#FF9800', 0.3)}` 
                }}> 
                  <Analytics /> 
                </Avatar> 
                <Typography variant="body2" fontWeight="medium" 
color={LIGHT_ORANGE_PALETTE.text}> 
                  Generate Report 
                </Typography> 
              </Card> 
            </CardActionArea> 
          </Grid> 
          <Grid item xs={6}> 
            <CardActionArea  
              onClick={handleContentCalendar} 
              sx={{  
                borderRadius: 2, 
                '&:hover': { transform: 'translateY(-4px)' }, 
                transition: 'all 0.3s ease' 
              }} 
            > 
              <Card sx={{  
                textAlign: 'center',  
                p: 2,  
                background: 'white', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: `2px solid ${alpha('#E65100', 0.2)}`, 
                '&:hover': {  
                  borderColor: '#E65100', 
                  boxShadow: `0 8px 25px ${alpha('#E65100', 0.15)}` 
                } 
              }}> 
                <Avatar sx={{  
                  bgcolor: '#E65100',  
                  width: 50,  
                  height: 50,  
                  mx: 'auto',  
                  mb: 1, 
                  boxShadow: `0 4px 15px ${alpha('#E65100', 0.3)}` 
                }}> 
                  <CalendarMonth /> 
                </Avatar> 
                <Typography variant="body2" fontWeight="medium" 
color={LIGHT_ORANGE_PALETTE.text}> 
                  Content Calendar 
                </Typography> 
              </Card> 
            </CardActionArea> 
          </Grid> 
        </Grid> 
      </CardContent> 
    </Card> 
  ); 
 
  // Enhanced Top Categories Component 
  const TopCategories = () => ( 
    <Card sx={{  
      mb: 3,  
      boxShadow: 3,  
      borderRadius: 3, 
      background: 'white', 
      border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
      '&:hover': { 
        boxShadow: 4, 
      } 
    }}> 
      <CardContent sx={{ p: 3 }}> 
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{  
          display: 'flex',  
          alignItems: 'center',  
          gap: 1, 
          color: LIGHT_ORANGE_PALETTE.primary, 
          mb: 3 
        }}> 
          <PieChart sx={{ fontSize: 28 }} />  
          Top Categories 
        </Typography> 
        <Box sx={{ space: 2 }}> 
          {topCategories.map(([category, count], index) => ( 
            <Box key={category} sx={{ mb: 2.5 }}> 
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
mb: 1.5 }}> 
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}> 
                  <Avatar sx={{  
                    width: 32,  
                    height: 32,  
                    bgcolor: navItems[index]?.color || LIGHT_ORANGE_PALETTE.primary, 
                    fontSize: '0.8rem', 
                    fontWeight: 'bold', 
                    boxShadow: `0 2px 8px ${alpha(navItems[index]?.color || 
LIGHT_ORANGE_PALETTE.primary, 0.3)}` 
                  }}> 
                    {category.charAt(0)} 
                  </Avatar> 
                  <Box> 
                    <Typography variant="body2" fontWeight="medium" 
color={LIGHT_ORANGE_PALETTE.text}> 
                      {category} 
                    </Typography> 
                    <Typography variant="caption" 
color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                      {count} products 
                    </Typography> 
                  </Box> 
                </Box> 
                <Chip  
                  label={`${((count / marketingStats.totalProducts) * 100).toFixed(1)}%`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                    color: LIGHT_ORANGE_PALETTE.primary, 
                    fontWeight: 'bold', 
                    border: `1px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.3)}` 
                  }} 
                /> 
              </Box> 
              <LinearProgress  
                variant="determinate"  
                value={(count / marketingStats.totalProducts) * 100}  
                sx={{  
                  height: 8,  
                  borderRadius: 4, 
                  bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                  '& .MuiLinearProgress-bar': { 
                    background: `linear-gradient(90deg, ${navItems[index]?.color || 
LIGHT_ORANGE_PALETTE.primary}, ${alpha(navItems[index]?.color || 
LIGHT_ORANGE_PALETTE.primary, 0.7)})`, 
                    borderRadius: 4, 
                  } 
                }} 
              /> 
            </Box> 
          ))} 
        </Box> 
      </CardContent> 
    </Card> 
  ); 
 
  // Enhanced Top Artisans Component 
  const TopArtisans = () => ( 
    <Card sx={{  
      boxShadow: 3,  
      borderRadius: 3, 
      background: 'white', 
      border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
      '&:hover': { 
        boxShadow: 4, 
      } 
    }}> 
      <CardContent sx={{ p: 3 }}> 
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{  
          display: 'flex',  
          alignItems: 'center',  
          gap: 1, 
          color: LIGHT_ORANGE_PALETTE.primary, 
          mb: 3 
        }}> 
          <Groups sx={{ fontSize: 28 }} />  
          Top Artisans 
        </Typography> 
        <List sx={{ p: 0 }}> 
          {popularArtisans.map(([artisan, count], index) => ( 
            <ListItem  
              key={artisan}  
              sx={{  
                px: 0,  
                py: 1.5, 
                borderBottom: index < popularArtisans.length - 1 ? '1px solid' : 'none', 
                borderColor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                '&:hover': { 
                  bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.05), 
                  borderRadius: 1, 
                } 
              }} 
            > 
              <ListItemAvatar> 
                <Avatar  
                  sx={{  
                    bgcolor: navItems[index]?.color || LIGHT_ORANGE_PALETTE.primary, 
                    width: 40,  
                    height: 40, 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    boxShadow: `0 2px 8px ${alpha(navItems[index]?.color || 
LIGHT_ORANGE_PALETTE.primary, 0.3)}` 
                  }} 
                > 
                  {artisan?.charAt(0) || 'A'} 
                </Avatar> 
              </ListItemAvatar> 
              <ListItemText 
                primary={ 
                  <Typography variant="body1" fontWeight="medium" 
color={LIGHT_ORANGE_PALETTE.text}> 
                    {artisan} 
                  </Typography> 
                } 
                secondary={ 
                  <Typography variant="caption" 
color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                    {count} products • {Math.floor((count / marketingStats.totalProducts) * 100)}% 
of catalog 
                  </Typography> 
                } 
              /> 
              <Chip  
                label={`#${index + 1}`} 
                size="small" 
                sx={{ 
                  bgcolor: index < 3 ? alpha(navItems[index]?.color || 
LIGHT_ORANGE_PALETTE.primary, 0.1) : 'transparent', 
                  color: index < 3 ? navItems[index]?.color || LIGHT_ORANGE_PALETTE.primary : 
LIGHT_ORANGE_PALETTE.textSecondary, 
                  border: `1px solid ${alpha(navItems[index]?.color || 
LIGHT_ORANGE_PALETTE.primary, 0.3)}`, 
                  fontWeight: 'bold' 
                }} 
              /> 
            </ListItem> 
          ))} 
        </List> 
        {popularArtisans.length === 0 && ( 
          <Box sx={{ textAlign: 'center', py: 3 }}> 
            <Groups sx={{ fontSize: 48, color: LIGHT_ORANGE_PALETTE.textSecondary, mb: 1, 
opacity: 0.5 }} /> 
            <Typography variant="body2" color={LIGHT_ORANGE_PALETTE.textSecondary}> 
              No artisan data available 
            </Typography> 
          </Box> 
        )} 
      </CardContent> 
    </Card> 
  ); 
 
  // Campaigns Tab Content 
  const CampaignsTab = () => ( 
    <Card sx={{  
      boxShadow: 3,  
      borderRadius: 3, 
      background: 'white', 
      border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
      '&:hover': { 
        boxShadow: 4, 
      } 
    }}> 
      <CardContent> 
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 
}}> 
          <Typography variant="h5" fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}> 
            Marketing Campaigns 
          </Typography> 
          <Button  
            variant="contained"  
            startIcon={<Add />} 
            onClick={() => setCampaignDialog(true)} 
            sx={{ 
              background: `linear-gradient(135deg, ${LIGHT_ORANGE_PALETTE.primary} 0%, 
${LIGHT_ORANGE_PALETTE.secondary} 100%)`, 
              boxShadow: `0 4px 15px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.3)}`, 
              '&:hover': { 
                boxShadow: `0 6px 20px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.4)}`, 
                transform: 'translateY(-2px)' 
              }, 
              transition: 'all 0.3s ease' 
            }} 
          > 
            New Campaign 
          </Button> 
        </Box> 
         
        <Grid container spacing={3}> 
          {campaigns.map((campaign) => ( 
            <Grid item xs={12} md={6} lg={4} key={campaign.id}> 
              <Card sx={{  
                height: '100%', 
                background: 'white', 
                border: `2px solid ${alpha(getPlatformColor(campaign.platform), 0.2)}`, 
                boxShadow: `0 4px 15px ${alpha(getPlatformColor(campaign.platform), 0.1)}`, 
                '&:hover': {  
                  boxShadow: `0 8px 25px ${alpha(getPlatformColor(campaign.platform), 
0.15)}`, 
                  transform: 'translateY(-4px)' 
                }, 
                transition: 'all 0.3s ease' 
              }}> 
                <CardContent> 
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
mb: 2 }}> 
                    <Chip  
                      icon={getPlatformIcon(campaign.platform)} 
                      label={campaign.platform} 
                      size="small" 
                      sx={{  
                        bgcolor: getPlatformColor(campaign.platform),  
                        color: 'white', 
                        textTransform: 'capitalize', 
                        fontWeight: 'bold' 
                      }} 
                    /> 
                    <Chip  
                      label={campaign.status} 
                      sx={{ 
                        bgcolor: campaign.status === 'active' ? alpha('#4CAF50', 0.1) : 
alpha('#FF9800', 0.1), 
                        color: campaign.status === 'active' ? '#4CAF50' : '#FF9800', 
                        border: `1px solid ${campaign.status === 'active' ? '#4CAF50' : '#FF9800'}`, 
                        fontWeight: 'bold' 
                      }} 
                      size="small" 
                    /> 
                  </Box> 
                   
                  <Typography variant="h6" gutterBottom fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}> 
                    {campaign.name} 
                  </Typography> 
                   
                  <Box sx={{ space: 1.5, mb: 2 }}> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
                      <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.textSecondary}>Budget:</Typography> 
                      <Typography variant="body2" fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}>₹{campaign.budget}</Typography> 
                    </Box> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
                      <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.textSecondary}>Impressions:</Typography> 
                      <Typography variant="body2" fontWeight="bold" color={LIGHT_ORANGE_PALETTE.text}>
                        {campaign.impressions.toLocaleString()}
                      </Typography>
                    </Box> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
                      <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.textSecondary}>Engagement:</Typography> 
                      <Typography variant="body2" fontWeight="bold" color={LIGHT_ORANGE_PALETTE.text}>
                        {campaign.engagement.toLocaleString()}
                      </Typography>
                    </Box> 
                  </Box> 
 
                  <LinearProgress  
                    variant="determinate"  
                    value={(campaign.spent / campaign.budget) * 100} 
                    sx={{  
                      mb: 2,  
                      height: 8,  
                      borderRadius: 4, 
                      bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                      '& .MuiLinearProgress-bar': { 
                        background: `linear-gradient(90deg, 
${getPlatformColor(campaign.platform)}, 
${alpha(getPlatformColor(campaign.platform), 0.7)})`, 
                        borderRadius: 4, 
                      } 
                    }} 
                  /> 
 
                  <Box sx={{ display: 'flex', gap: 1 }}> 
                    <Button  
                      size="small"  
                      variant="outlined" 
                      fullWidth 
                      sx={{ 
                        borderColor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.5), 
                        color: LIGHT_ORANGE_PALETTE.primary, 
                        '&:hover': { 
                          borderColor: LIGHT_ORANGE_PALETTE.primary, 
                          bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1) 
                        } 
                      }} 
                      onClick={() => setSnackbar({ open: true, message: `Viewing 
${campaign.name} analytics`, severity: 'info' })} 
                    > 
                      Analytics 
                    </Button> 
                    {campaign.status === 'active' && ( 
                      <Button  
                        size="small"  
                        sx={{ 
                          borderColor: alpha('#f44336', 0.5), 
                          color: '#f44336', 
                          '&:hover': { 
                            borderColor: '#f44336', 
                            bgcolor: alpha('#f44336', 0.1) 
                          } 
                        }} 
                        variant="outlined" 
                        onClick={() => handleCampaignAction(campaign.id, 'paused')} 
                      > 
                        Pause 
                      </Button> 
                    )} 
                  </Box> 
                </CardContent> 
              </Card> 
            </Grid> 
          ))} 
        </Grid> 
      </CardContent> 
    </Card> 
  ); 
 
  // Product Analytics Tab Content 
  const ProductAnalyticsTab = () => ( 
    <Card sx={{  
      boxShadow: 3,  
      borderRadius: 3, 
      background: 'white', 
      border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
      '&:hover': { 
        boxShadow: 4, 
      } 
    }}> 
      <CardContent> 
        <Typography variant="h5" fontWeight="bold" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
          Product Performance Analytics 
        </Typography> 
        <Typography variant="body2" color={LIGHT_ORANGE_PALETTE.textSecondary} sx={{ 
mb: 3 }}> 
          Detailed analytics for all products in your catalog 
        </Typography> 
 
        <Grid container spacing={3}> 
          {approvedProducts.slice(0, 6).map((product) => ( 
            <Grid item xs={12} md={6} lg={4} key={product.id}> 
              <Card sx={{  
                height: '100%', 
                background: 'white', 
                border: `1px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.2)}`, 
                '&:hover': { 
                  boxShadow: `0 8px 25px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.15)}`, 
                  transform: 'translateY(-4px)' 
                }, 
                transition: 'all 0.3s ease' 
              }}> 
                <CardContent> 
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}> 
                    <CardMedia 
                      component="img" 
                      sx={{ width: 60, height: 60, borderRadius: 2, border: `2px solid 
${alpha(LIGHT_ORANGE_PALETTE.primary, 0.2)}` }} 
                      image={product.images?.[0] || '/api/placeholder/400/500'} 
                      alt={product.name} 
                    /> 
                    <Box sx={{ flex: 1 }}> 
                      <Typography variant="subtitle1" fontWeight="bold" noWrap 
color={LIGHT_ORANGE_PALETTE.text}> 
                        {product.name} 
                      </Typography> 
                      <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                        {product.category} 
                      </Typography> 
                    </Box> 
                  </Box> 
 
                  {productAnalytics[product.id] && ( 
                    <Grid container spacing={1} sx={{ mb: 2 }}> 
                      <Grid item xs={6}> 
                        <Box sx={{ textAlign: 'center' }}> 
                          <Typography variant="h6" color={LIGHT_ORANGE_PALETTE.primary} 
fontWeight="bold"> 
                            {productAnalytics[product.id].views} 
                          </Typography> 
                          <Typography variant="caption" 
color={LIGHT_ORANGE_PALETTE.textSecondary}>Views</Typography> 
                        </Box> 
                      </Grid> 
                      <Grid item xs={6}> 
                        <Box sx={{ textAlign: 'center' }}> 
                          <Typography variant="h6" color="#4CAF50" fontWeight="bold"> 
                            {productAnalytics[product.id].conversions} 
                          </Typography> 
                          <Typography variant="caption" 
color={LIGHT_ORANGE_PALETTE.textSecondary}>Sales</Typography> 
                        </Box> 
                      </Grid> 
                    </Grid> 
                  )} 
 
                  <Button  
                    fullWidth  
                    variant="outlined"  
                    size="small" 
                    sx={{ 
                      borderColor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.5), 
                      color: LIGHT_ORANGE_PALETTE.primary, 
                      '&:hover': { 
                        borderColor: LIGHT_ORANGE_PALETTE.primary, 
                        bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1) 
                      } 
                    }} 
                    onClick={() => handleViewAnalytics(product)} 
                  > 
                    View Details 
                  </Button> 
                </CardContent> 
              </Card> 
            </Grid> 
          ))} 
        </Grid> 
      </CardContent> 
    </Card> 
  ); 
 
  // Audience Insights Tab Content 
  const AudienceInsightsTab = () => ( 
    <Card sx={{  
      boxShadow: 3,  
      borderRadius: 3, 
      background: 'white', 
      border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
      '&:hover': { 
        boxShadow: 4, 
      } 
    }}> 
      <CardContent> 
        <Typography variant="h5" fontWeight="bold" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
          Audience Insights 
        </Typography> 
 
        <Grid container spacing={3}> 
          <Grid item xs={12} md={6}> 
            <Card sx={{ background: 'white', border: `1px solid 
${LIGHT_ORANGE_PALETTE.border}` }}> 
              <CardContent> 
                <Typography variant="h6" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}>Demographics</Typography> 
                {Object.entries(audienceData.demographics || {}).map(([age, percent]) => ( 
                  <Box key={age} sx={{ mb: 2 }}> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}> 
                      <Typography variant="body2" color={LIGHT_ORANGE_PALETTE.text}>{age} 
years</Typography> 
                      <Typography variant="body2" fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}>{percent}%</Typography> 
                    </Box> 
                    <LinearProgress  
                      variant="determinate"  
                      value={percent}  
                      sx={{  
                        height: 8,  
                        borderRadius: 4, 
                        bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                        '& .MuiLinearProgress-bar': { 
                          background: `linear-gradient(90deg, ${LIGHT_ORANGE_PALETTE.primary}, 
${LIGHT_ORANGE_PALETTE.secondary})`, 
                          borderRadius: 4, 
                        } 
                      }} 
                    /> 
                  </Box> 
                ))} 
              </CardContent> 
            </Card> 
          </Grid> 
          <Grid item xs={12} md={6}> 
            <Card sx={{ background: 'white', border: `1px solid 
${LIGHT_ORANGE_PALETTE.border}` }}> 
              <CardContent> 
                <Typography variant="h6" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}>Geographic Distribution</Typography> 
                {Object.entries(audienceData.locations || {}).map(([location, percent]) => ( 
                  <Box key={location} sx={{ mb: 2 }}> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}> 
                      <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.text}>{location}</Typography> 
                      <Typography variant="body2" fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}>{percent}%</Typography> 
                    </Box> 
                    <LinearProgress  
                      variant="determinate"  
                      value={percent}  
                      sx={{  
                        height: 8,  
                        borderRadius: 4, 
                        bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                        '& .MuiLinearProgress-bar': { 
                          background: `linear-gradient(90deg, 
${LIGHT_ORANGE_PALETTE.secondary}, ${LIGHT_ORANGE_PALETTE.accent})`, 
                          borderRadius: 4, 
                        } 
                      }} 
                    /> 
                  </Box> 
                ))} 
              </CardContent> 
            </Card> 
          </Grid> 
        </Grid> 
      </CardContent> 
    </Card> 
  ); 
 
  // Social Media Tab Content 
  const SocialMediaTab = () => ( 
    <Card sx={{  
      boxShadow: 3,  
      borderRadius: 3, 
      background: 'white', 
      border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
      '&:hover': { 
        boxShadow: 4, 
      } 
    }}> 
      <CardContent> 
        <Typography variant="h5" fontWeight="bold" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
          Social Media Performance 
        </Typography> 
 
        <Grid container spacing={3}> 
          {Object.entries(socialMediaStats).map(([platform, stats]) => ( 
            <Grid item xs={12} md={4} key={platform}> 
              <Card sx={{  
                textAlign: 'center',  
                p: 3, 
                background: 'white', 
                border: `2px solid ${alpha(getPlatformColor(platform), 0.2)}`, 
                boxShadow: `0 4px 15px ${alpha(getPlatformColor(platform), 0.1)}`, 
              }}> 
                <Avatar sx={{  
                  bgcolor: getPlatformColor(platform),  
                  width: 60,  
                  height: 60,  
                  mx: 'auto',  
                  mb: 2, 
                  boxShadow: `0 4px 15px ${alpha(getPlatformColor(platform), 0.3)}` 
                }}> 
                  {getPlatformIcon(platform)} 
                </Avatar> 
                <Typography variant="h6" textTransform="capitalize" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
                  {platform} 
                </Typography> 
                <Typography variant="h4" fontWeight="bold" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
                  {stats.followers?.toLocaleString()} 
                </Typography> 
                <Typography variant="body2" color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                  Followers 
                </Typography> 
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}> 
                  <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.text}>Engagement</Typography> 
                  <Typography variant="body2" fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}>{stats.engagement}%</Typography> 
                </Box> 
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
                  <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.text}>Growth</Typography> 
                  <Typography variant="body2" fontWeight="bold" color="#4CAF50"> 
                    +{stats.growth}% 
                  </Typography> 
                </Box> 
              </Card> 
            </Grid> 
          ))} 
        </Grid> 
      </CardContent> 
    </Card> 
  ); 
 
  return ( 
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: "100vh", color: 
LIGHT_ORANGE_PALETTE.text }}> 
      {/* Mobile Drawer */} 
      <Drawer 
        variant="temporary" 
        open={mobileDrawerOpen} 
        onClose={() => setMobileDrawerOpen(false)} 
        sx={{ 
          display: { xs: 'block', md: 'none' }, 
          '& .MuiDrawer-paper': {  
            width: 280, 
            bgcolor: 'white', 
            backgroundImage: 'none', 
            borderRight: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
          }, 
        }} 
      > 
        <Box sx={{  
          p: 2,  
          borderBottom: '1px solid',  
          borderColor: LIGHT_ORANGE_PALETTE.border,  
          background: `linear-gradient(135deg, ${LIGHT_ORANGE_PALETTE.primary} 0%, 
${LIGHT_ORANGE_PALETTE.secondary} 100%)`, 
          color: 'white' 
        }}> 
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}> 
            Marketing Hub 
          </Typography> 
          <Typography variant="body2"> 
            Handloom Analytics 
          </Typography> 
        </Box> 
        <List sx={{ px: 1, pt: 2 }}> 
          {navItems.map((item) => ( 
            <ListItem key={item.id} disablePadding> 
              <ListItemButton 
                selected={activeTab === item.id} 
                onClick={() => { 
                  setActiveTab(item.id); 
                  setMobileDrawerOpen(false); 
                }} 
                sx={{ 
                  borderRadius: 2, 
                  mb: 0.5, 
                  '&.Mui-selected': { 
                    bgcolor: item.color, 
                    color: 'white', 
                    '&:hover': { 
                      bgcolor: alpha(item.color, 0.9), 
                    }, 
                  }, 
                }} 
              > 
                <ListItemIcon sx={{ color: activeTab === item.id ? 'white' : 
LIGHT_ORANGE_PALETTE.text }}> 
                  {item.icon} 
                </ListItemIcon> 
                <ListItemText primary={item.label} /> 
              </ListItemButton> 
            </ListItem> 
          ))} 
        </List> 
      </Drawer> 
 
      {/* Desktop Sidebar */} 
      <Drawer 
        variant="permanent" 
        sx={{ 
          display: { xs: 'none', md: 'block' }, 
          width: 280, 
          flexShrink: 0, 
          '& .MuiDrawer-paper': { 
            width: 280, 
            boxSizing: 'border-box', 
            bgcolor: 'white', 
            borderRight: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
            backgroundImage: 'none' 
          }, 
        }} 
      > 
        <Box sx={{  
          p: 3,  
          borderBottom: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
          background: `linear-gradient(135deg, ${LIGHT_ORANGE_PALETTE.primary} 0%, 
${LIGHT_ORANGE_PALETTE.secondary} 100%)`, 
          color: 'white' 
        }}> 
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}> 
            Marketing Hub 
          </Typography> 
          <Typography variant="body2" sx={{ opacity: 0.9 }}> 
            Handloom Analytics 
          </Typography> 
        </Box> 
         
        <List sx={{ px: 2, pt: 2 }}> 
          {navItems.map((item) => ( 
            <ListItem key={item.id} disablePadding> 
              <ListItemButton 
                selected={activeTab === item.id} 
                onClick={() => setActiveTab(item.id)} 
                sx={{ 
                  borderRadius: 2, 
                  mb: 1, 
                  '&.Mui-selected': { 
                    bgcolor: item.color, 
                    color: 'white', 
                    boxShadow: `0 4px 12px ${alpha(item.color, 0.3)}`, 
                    '&:hover': { 
                      bgcolor: alpha(item.color, 0.9), 
                    }, 
                  }, 
                  '&:hover': { 
                    bgcolor: alpha(item.color, 0.1), 
                  } 
                }} 
              > 
                <ListItemIcon sx={{ color: activeTab === item.id ? 'white' : 
LIGHT_ORANGE_PALETTE.text }}> 
                  {item.icon} 
                </ListItemIcon> 
                <ListItemText  
                  primary={item.label}  
                  primaryTypographyProps={{ 
                    fontWeight: activeTab === item.id ? 'bold' : 'normal' 
                  }} 
                /> 
              </ListItemButton> 
            </ListItem> 
          ))} 
        </List> 
 
        {/* Quick Stats in Sidebar */} 
        <Box sx={{ p: 2, mt: 2 }}> 
          <Card sx={{  
            bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.05),  
            p: 2,  
            boxShadow: 1, 
            border: `1px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.2)}`, 
          }}> 
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.primary}> 
              Quick Stats 
            </Typography> 
            <Box sx={{ space: 1.5 }}> 
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                <Typography variant="caption" color={LIGHT_ORANGE_PALETTE.text}>Active 
Campaigns</Typography> 
                <Chip  
                  label={marketingStats.activeCampaigns}  
                  size="small"  
                  sx={{ 
                    bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                    color: LIGHT_ORANGE_PALETTE.primary, 
                    fontWeight: 'bold' 
                  }} 
                /> 
              </Box> 
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                <Typography variant="caption" color={LIGHT_ORANGE_PALETTE.text}>New 
Products</Typography> 
                <Chip  
                  label={marketingStats.newThisWeek}  
                  size="small"  
                  sx={{ 
                    bgcolor: alpha('#4CAF50', 0.1), 
                    color: '#4CAF50', 
                    fontWeight: 'bold' 
                  }} 
                /> 
              </Box> 
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                <Typography variant="caption" 
color={LIGHT_ORANGE_PALETTE.text}>Engagement Rate</Typography> 
                <Chip  
                  label={`${marketingStats.engagementRate}%`}  
                  size="small"  
                  sx={{ 
                    bgcolor: alpha('#FF9800', 0.1), 
                    color: '#FF9800', 
                    fontWeight: 'bold' 
                  }} 
                /> 
              </Box> 
            </Box> 
          </Card> 
        </Box> 
      </Drawer> 
 
      {/* Main Content */} 
      <Box sx={{  
        flexGrow: 1,  
        display: 'flex',  
        flexDirection: 'column', 
        minHeight: '100vh', 
        width: { xs: '100%', md: `calc(100% - 280px)` } 
      }}> 
        {/* Header */} 
        <AppBar position="static" sx={{  
          bgcolor: 'white',  
          color: LIGHT_ORANGE_PALETTE.text,  
          boxShadow: 2, 
          borderBottom: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
        }}> 
          <Toolbar> 
            <IconButton 
              edge="start" 
              sx={{ mr: 2, display: { md: 'none' }, color: LIGHT_ORANGE_PALETTE.text }} 
              onClick={() => setMobileDrawerOpen(true)} 
            > 
              <MenuIcon /> 
            </IconButton> 
             
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}> 
              <Analytics sx={{ mr: 2, fontSize: 32, color: LIGHT_ORANGE_PALETTE.primary }} /> 
              <Box> 
                <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1.2 }}> 
                  Marketing Command Center 
                </Typography> 
                <Typography variant="caption" 
color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                  {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'} 
                </Typography> 
              </Box> 
            </Box> 
             
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> 
              <Tooltip title="Notifications"> 
                <IconButton sx={{ color: LIGHT_ORANGE_PALETTE.text }}> 
                  <Badge badgeContent={unreadNotifications.length} color="error"> 
                    <Notifications /> 
                  </Badge> 
                </IconButton> 
              </Tooltip> 
 
              <Avatar sx={{ width: 36, height: 36, bgcolor: LIGHT_ORANGE_PALETTE.primary }}> 
                <Person /> 
              </Avatar> 
               
              <Tooltip title="Home"> 
                <IconButton component={Link} to="/" sx={{ color: LIGHT_ORANGE_PALETTE.text 
}}> 
                  <Home /> 
                </IconButton> 
              </Tooltip> 
               
              <Tooltip title="Logout"> 
                <IconButton onClick={handleLogout} sx={{ color: LIGHT_ORANGE_PALETTE.text 
}}> 
                  <Logout /> 
                </IconButton> 
              </Tooltip> 
            </Box> 
          </Toolbar> 
        </AppBar> 
 
        <Box sx={{ p: 3 }}> 
          {/* Enhanced Header */} 
          <Box sx={{ mb: 4 }}> 
            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{  
              background: `linear-gradient(135deg, ${LIGHT_ORANGE_PALETTE.primary} 0%, 
${LIGHT_ORANGE_PALETTE.secondary} 100%)`, 
              backgroundClip: 'text', 
              WebkitBackgroundClip: 'text', 
              color: 'transparent', 
            }}> 
              {navItems.find(item => item.id === activeTab)?.label || 'Marketing Dashboard'} 
            </Typography> 
            <Typography variant="h6" color={LIGHT_ORANGE_PALETTE.textSecondary}> 
              Monitor performance, launch campaigns, and grow your handloom business 
            </Typography> 
          </Box> 
 
          {/* Enhanced Statistics */} 
          <Grid container spacing={3} sx={{ mb: 4 }}> 
            <Grid item xs={12} sm={6} md={3}> 
              <StatCard 
                title="Total Products" 
                value={marketingStats.totalProducts} 
                icon={<Inventory />} 
                color={LIGHT_ORANGE_PALETTE.primary} 
                trend="High" 
                change={12} 
                onClick={() => setActiveTab(2)} 
              /> 
            </Grid> 
            <Grid item xs={12} sm={6} md={3}> 
              <StatCard 
                title="New This Week" 
                value={marketingStats.newThisWeek} 
                icon={<NewReleases />} 
                color={LIGHT_ORANGE_PALETTE.secondary} 
                trend="Growing" 
                change={8} 
                onClick={() => setActiveTab(2)} 
              /> 
            </Grid> 
            <Grid item xs={12} sm={6} md={3}> 
              <StatCard 
                title="Active Campaigns" 
                value={marketingStats.activeCampaigns} 
                icon={<Campaign />} 
                color="#FF9800" 
                trend="Active" 
                change={5} 
                onClick={() => setActiveTab(1)} 
              /> 
            </Grid> 
            <Grid item xs={12} sm={6} md={3}> 
              <StatCard 
                title="Total Revenue" 
                value={`₹${(marketingStats.totalRevenue / 1000).toFixed(0)}K`} 
                icon={<AttachMoney />} 
                color="#FF5722" 
                trend="Excellent" 
                change={15} 
              /> 
            </Grid> 
          </Grid> 
 
          {/* Main Content Area */} 
          {activeTab === 0 && ( 
            <Grid container spacing={3}> 
              {/* New Products Section */} 
              <Grid item xs={12} lg={8}> 
                <Card sx={{  
                  boxShadow: 3,  
                  borderRadius: 3, 
                  background: 'white', 
                  border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
                  '&:hover': { 
                    boxShadow: 4, 
                  } 
                }}> 
                  <CardContent> 
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
mb: 3 }}> 
                      <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                        <NewReleases sx={{ fontSize: 32, color: LIGHT_ORANGE_PALETTE.primary, 
mr: 2 }} /> 
                        <Box> 
                          <Typography variant="h5" fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}> 
                            New Arrivals - Ready for Promotion 
                          </Typography> 
                          <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                            {newProducts.length} products waiting for marketing attention 
                          </Typography> 
                        </Box> 
                      </Box> 
                      <Chip  
                        label={`${newProducts.length} new`} 
                        sx={{ 
                          bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                          color: LIGHT_ORANGE_PALETTE.primary, 
                          fontWeight: 'bold', 
                          border: `1px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.3)}` 
                        }} 
                      /> 
                    </Box> 
                     
                    {newProducts.length > 0 ? ( 
                      <Grid container spacing={2}> 
                        {newProducts.map((product) => ( 
                          <Grid item xs={12} key={product.id}> 
                            <Card  
                              sx={{  
                                p: 2,  
                                transition: 'all 0.3s ease', 
                                background: 'white', 
                                border: `1px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.2)}`, 
                                '&:hover': { 
                                  boxShadow: `0 8px 25px ${alpha(LIGHT_ORANGE_PALETTE.primary, 
0.15)}`, 
                                  borderColor: LIGHT_ORANGE_PALETTE.primary, 
                                  transform: 'translateY(-2px)' 
                                } 
                              }} 
                            > 
                              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}> 
                                <CardMedia 
                                  component="img" 
                                  sx={{  
                                    width: 80,  
                                    height: 80,  
                                    borderRadius: 2,  
                                    objectFit: 'cover', 
                                    border: `2px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.2)}` 
                                  }} 
                                  image={product.images?.[0] || '/api/placeholder/400/500'} 
                                  alt={product.name} 
                                /> 
                                <Box sx={{ flexGrow: 1 }}> 
                                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 
LIGHT_ORANGE_PALETTE.text }}> 
                                    {product.name} 
                                  </Typography> 
                                  <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.textSecondary} sx={{ mb: 1 }}> 
                                    {product.description?.substring(0, 120)}... 
                                  </Typography> 
                                  <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}> 
                                    <Chip  
                                      label={product.category}  
                                      size="small"  
                                      sx={{ 
                                        bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                                        color: LIGHT_ORANGE_PALETTE.primary, 
                                        border: `1px solid ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.3)}` 
                                      }} 
                                    /> 
                                    <Chip  
                                      label="NEW"  
                                      size="small"  
                                      sx={{ 
                                        bgcolor: alpha('#4CAF50', 0.1), 
                                        color: '#4CAF50', 
                                        border: `1px solid ${alpha('#4CAF50', 0.3)}` 
                                      }} 
                                    /> 
                                    <Chip  
                                      label={product.artisan}  
                                      size="small"  
                                      sx={{ 
                                        bgcolor: 'transparent', 
                                        color: LIGHT_ORANGE_PALETTE.textSecondary, 
                                        border: `1px solid ${alpha(LIGHT_ORANGE_PALETTE.textSecondary, 
0.3)}` 
                                      }} 
                                    /> 
                                    <Rating value={4} size="small" readOnly /> 
                                  </Box> 
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                                    <Typography variant="h6" color={LIGHT_ORANGE_PALETTE.primary} 
fontWeight="bold"> 
                                      {product.price} 
                                    </Typography> 
                                    <Typography variant="caption" 
color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                                      Added this week 
                                    </Typography> 
                                  </Box> 
                                </Box> 
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}> 
                                  <Tooltip title="Promote Product"> 
                                    <Button  
                                      size="small"  
                                      startIcon={<TrendingUp />}  
                                      variant="contained"  
                                      sx={{ 
                                        background: `linear-gradient(135deg, 
${LIGHT_ORANGE_PALETTE.primary} 0%, ${LIGHT_ORANGE_PALETTE.secondary} 
100%)`, 
                                        boxShadow: `0 4px 15px ${alpha(LIGHT_ORANGE_PALETTE.primary, 
0.3)}`, 
                                        '&:hover': { 
                                          boxShadow: `0 6px 20px 
${alpha(LIGHT_ORANGE_PALETTE.primary, 0.4)}`, 
                                          transform: 'translateY(-2px)' 
                                        }, 
                                        transition: 'all 0.3s ease' 
                                      }} 
                                      onClick={() => handlePromoteProduct(product)} 
                                    > 
                                      Promote 
                                    </Button> 
                                  </Tooltip> 
                                  <Tooltip title="Share Product"> 
                                    <Button  
                                      size="small"  
                                      startIcon={<Share />}  
                                      variant="outlined" 
                                      sx={{ 
                                        borderColor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.5), 
                                        color: LIGHT_ORANGE_PALETTE.primary, 
                                        '&:hover': { 
                                          borderColor: LIGHT_ORANGE_PALETTE.primary, 
                                          bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1) 
                                        } 
                                      }} 
                                      onClick={() => handleShareProduct(product)} 
                                    > 
                                      Share 
                                    </Button> 
                                  </Tooltip> 
                                  <Tooltip title="View Analytics"> 
                                    <Button  
                                      size="small"  
                                      startIcon={<Insights />}  
                                      sx={{ 
                                        color: LIGHT_ORANGE_PALETTE.textSecondary, 
                                        '&:hover': { 
                                          color: LIGHT_ORANGE_PALETTE.primary, 
                                          bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1) 
                                        } 
                                      }} 
                                      onClick={() => handleViewAnalytics(product)} 
                                    > 
                                      Analytics 
                                    </Button> 
                                  </Tooltip> 
                                </Box> 
                              </Box> 
                            </Card> 
                          </Grid> 
                        ))} 
                      </Grid> 
                    ) : ( 
                      <Box sx={{ textAlign: 'center', py: 6 }}> 
                        <NewReleases sx={{ fontSize: 64, color: 
LIGHT_ORANGE_PALETTE.textSecondary, mb: 2, opacity: 0.5 }} /> 
                        <Typography variant="h6" color={LIGHT_ORANGE_PALETTE.textSecondary} 
gutterBottom> 
                          No new products this week 
                        </Typography> 
                        <Typography variant="body2" 
color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                          Newly approved products will appear here for marketing campaigns 
                        </Typography> 
                      </Box> 
                    )} 
                  </CardContent> 
                </Card> 
 
                {/* Campaign Performance */} 
                <Card sx={{  
                  mt: 3,  
                  boxShadow: 3,  
                  borderRadius: 3, 
                  background: 'white', 
                  border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
                  '&:hover': { 
                    boxShadow: 4, 
                  } 
                }}> 
                  <CardContent> 
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{  
                      display: 'flex',  
                      alignItems: 'center',  
                      gap: 1, 
                      color: LIGHT_ORANGE_PALETTE.text 
                    }}> 
                      <BarChart /> Campaign Performance 
                    </Typography> 
                    <TableContainer> 
                      <Table> 
                        <TableHead> 
                          <TableRow> 
                            <TableCell sx={{ color: LIGHT_ORANGE_PALETTE.text, fontWeight: 'bold' 
}}>Campaign</TableCell> 
                            <TableCell sx={{ color: LIGHT_ORANGE_PALETTE.text, fontWeight: 'bold' 
}}>Platform</TableCell> 
                            <TableCell sx={{ color: LIGHT_ORANGE_PALETTE.text, fontWeight: 'bold' 
}}>Status</TableCell> 
                            <TableCell sx={{ color: LIGHT_ORANGE_PALETTE.text, fontWeight: 'bold' 
}}>Spent/Budget</TableCell> 
                            <TableCell sx={{ color: LIGHT_ORANGE_PALETTE.text, fontWeight: 'bold' 
}}>Impressions</TableCell> 
                            <TableCell sx={{ color: LIGHT_ORANGE_PALETTE.text, fontWeight: 'bold' 
}}>Engagement</TableCell> 
                            <TableCell sx={{ color: LIGHT_ORANGE_PALETTE.text, fontWeight: 'bold' 
}}>Actions</TableCell> 
                          </TableRow> 
                        </TableHead> 
                        <TableBody> 
                          {campaigns.map((campaign) => ( 
                            <TableRow  
                              key={campaign.id}  
                              hover 
                              sx={{  
                                '&:hover': { 
                                  bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.05) 
                                } 
                              }} 
                            > 
                              <TableCell> 
                                <Typography fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}>{campaign.name}</Typography> 
                              </TableCell> 
                              <TableCell> 
                                <Chip  
                                  icon={getPlatformIcon(campaign.platform)} 
                                  label={campaign.platform} 
                                  size="small" 
                                  sx={{  
                                    bgcolor: getPlatformColor(campaign.platform),  
                                    color: 'white', 
                                    fontWeight: 'bold' 
                                  }} 
                                /> 
                              </TableCell> 
                              <TableCell> 
                                <Chip  
                                  label={campaign.status} 
                                  sx={{ 
                                    bgcolor: campaign.status === 'active' ? alpha('#4CAF50', 0.1) : 
alpha('#FF9800', 0.1), 
                                    color: campaign.status === 'active' ? '#4CAF50' : '#FF9800', 
                                    border: `1px solid ${campaign.status === 'active' ? '#4CAF50' : 
'#FF9800'}`, 
                                    fontWeight: 'bold' 
                                  }} 
                                  size="small" 
                                /> 
                              </TableCell> 
                              <TableCell> 
                                <Box> 
                                  <Typography variant="body2" color={LIGHT_ORANGE_PALETTE.text}> 
                                    ₹{campaign.spent} / ₹{campaign.budget} 
                                  </Typography> 
                                  <LinearProgress  
                                    variant="determinate"  
                                    value={(campaign.spent / campaign.budget) * 100} 
                                    sx={{  
                                      mt: 0.5,  
                                      height: 6,  
                                      borderRadius: 3, 
                                      bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1), 
                                      '& .MuiLinearProgress-bar': { 
                                        background: `linear-gradient(90deg, 
${getPlatformColor(campaign.platform)}, 
${alpha(getPlatformColor(campaign.platform), 0.7)})`, 
                                        borderRadius: 3, 
                                      } 
                                    }} 
                                  /> 
                                </Box> 
                              </TableCell> 
                              <TableCell> 
                                <Typography variant="body2" color={LIGHT_ORANGE_PALETTE.text}> 
                                  {campaign.impressions.toLocaleString()} 
                                </Typography> 
                              </TableCell> 
                              <TableCell> 
                                <Typography variant="body2" color={LIGHT_ORANGE_PALETTE.text}> 
                                  {campaign.engagement.toLocaleString()} 
                                </Typography> 
                              </TableCell> 
                              <TableCell> 
                                <Box sx={{ display: 'flex', gap: 0.5 }}> 
                                  <Button  
                                    size="small"  
                                    startIcon={<Analytics />} 
                                    sx={{ 
                                      color: LIGHT_ORANGE_PALETTE.primary, 
                                      '&:hover': { 
                                        bgcolor: alpha(LIGHT_ORANGE_PALETTE.primary, 0.1) 
                                      } 
                                    }} 
                                    onClick={() => setSnackbar({ open: true, message: `Viewing 
${campaign.name} analytics`, severity: 'info' })} 
                                  > 
                                    View 
                                  </Button> 
                                  {campaign.status === 'active' && ( 
                                    <Button  
                                      size="small"  
                                      sx={{ 
                                        color: '#f44336', 
                                        '&:hover': { 
                                          bgcolor: alpha('#f44336', 0.1) 
                                        } 
                                      }} 
                                      onClick={() => handleCampaignAction(campaign.id, 'paused')} 
                                    > 
                                      Pause 
                                    </Button> 
                                  )} 
                                  {campaign.status === 'planned' && ( 
                                    <Button  
                                      size="small"  
                                      sx={{ 
                                        color: '#4CAF50', 
                                        '&:hover': { 
                                          bgcolor: alpha('#4CAF50', 0.1) 
                                        } 
                                      }} 
                                      onClick={() => handleCampaignAction(campaign.id, 'active')} 
                                    > 
                                      Start 
                                    </Button> 
                                  )} 
                                </Box> 
                              </TableCell> 
                            </TableRow> 
                          ))} 
                        </TableBody> 
                      </Table> 
                    </TableContainer> 
                  </CardContent> 
                </Card> 
              </Grid> 
 
              {/* Analytics Sidebar */} 
              <Grid item xs={12} lg={4}> 
                <QuickActions /> 
                <TopCategories /> 
                <TopArtisans /> 
              </Grid> 
            </Grid> 
          )} 
 
          {/* Campaigns Tab */} 
          {activeTab === 1 && <CampaignsTab />} 
 
          {/* Product Analytics Tab */} 
          {activeTab === 2 && <ProductAnalyticsTab />} 
 
          {/* Audience Insights Tab */} 
          {activeTab === 3 && <AudienceInsightsTab />} 
 
          {/* Content Calendar Tab */} 
          {activeTab === 4 && ( 
            <Card sx={{  
              boxShadow: 3,  
              borderRadius: 3, 
              background: 'white', 
              border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
              '&:hover': { 
                boxShadow: 4, 
              } 
            }}> 
              <CardContent> 
                <Typography variant="h5" fontWeight="bold" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
                  Content Calendar 
                </Typography> 
                <Typography color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                  Schedule and manage your content across all platforms 
                </Typography> 
                {/* Content calendar implementation would go here */} 
              </CardContent> 
            </Card> 
          )} 
 
          {/* Social Media Tab */} 
          {activeTab === 5 && <SocialMediaTab />} 
 
          {/* Reports Tab */} 
          {activeTab === 6 && ( 
            <Card sx={{  
              boxShadow: 3,  
              borderRadius: 3, 
              background: 'white', 
              border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
              '&:hover': { 
                boxShadow: 4, 
              } 
            }}> 
              <CardContent> 
                <Typography variant="h5" fontWeight="bold" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
                  Marketing Reports 
                </Typography> 
                <Typography color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                  Generate and download comprehensive marketing reports 
                </Typography> 
                {/* Reports implementation would go here */} 
              </CardContent> 
            </Card> 
          )} 
 
          {/* Settings Tab */} 
          {activeTab === 7 && ( 
            <Card sx={{  
              boxShadow: 3,  
              borderRadius: 3, 
              background: 'white', 
              border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
              '&:hover': { 
                boxShadow: 4, 
              } 
            }}> 
              <CardContent> 
                <Typography variant="h5" fontWeight="bold" gutterBottom 
color={LIGHT_ORANGE_PALETTE.text}> 
                  Marketing Settings 
                </Typography> 
                <Typography color={LIGHT_ORANGE_PALETTE.textSecondary}> 
                  Configure your marketing preferences and integrations 
                </Typography> 
                {/* Settings implementation would go here */} 
              </CardContent> 
            </Card> 
          )} 
        </Box> 
      </Box> 
 
      {/* Create Campaign Dialog */} 
      <Dialog  
        open={campaignDialog}  
        onClose={() => setCampaignDialog(false)}  
        maxWidth="sm"  
        fullWidth 
        PaperProps={{ 
          sx: { 
            background: 'white', 
            border: `1px solid ${LIGHT_ORANGE_PALETTE.border}`, 
            boxShadow: `0 8px 40px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.2)}` 
          } 
        }} 
      > 
        <DialogTitle> 
          <Typography variant="h6" fontWeight="bold" 
color={LIGHT_ORANGE_PALETTE.text}>Create New Campaign</Typography> 
        </DialogTitle> 
        <DialogContent> 
          <Grid container spacing={2} sx={{ mt: 1 }}> 
            <Grid item xs={12}> 
              <TextField 
                fullWidth 
                label="Campaign Name" 
                value={campaignData.name} 
                onChange={(e) => setCampaignData({...campaignData, name: e.target.value})} 
              /> 
            </Grid> 
            <Grid item xs={12}> 
              <FormControl fullWidth> 
                <InputLabel>Platform</InputLabel> 
                <Select 
                  value={campaignData.platform} 
                  label="Platform" 
                  onChange={(e) => setCampaignData({...campaignData, platform: 
e.target.value})} 
                > 
                  <MenuItem value="all">All Platforms</MenuItem> 
                  <MenuItem value="facebook">Facebook</MenuItem> 
                  <MenuItem value="instagram">Instagram</MenuItem> 
                  <MenuItem value="twitter">Twitter</MenuItem> 
                </Select> 
              </FormControl> 
            </Grid> 
            <Grid item xs={12}> 
              <TextField 
                fullWidth 
                label="Budget (₹)" 
                type="number" 
                value={campaignData.budget} 
                onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})} 
              /> 
            </Grid> 
          </Grid> 
        </DialogContent> 
        <DialogActions> 
          <Button  
            onClick={() => setCampaignDialog(false)} 
            sx={{ color: LIGHT_ORANGE_PALETTE.textSecondary }} 
          > 
            Cancel 
          </Button> 
          <Button  
            variant="contained"  
            onClick={handleCreateCampaign} 
            sx={{ 
              background: `linear-gradient(135deg, ${LIGHT_ORANGE_PALETTE.primary} 0%, 
${LIGHT_ORANGE_PALETTE.secondary} 100%)`, 
              boxShadow: `0 4px 15px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.3)}`, 
              '&:hover': { 
                boxShadow: `0 6px 20px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.4)}`, 
              } 
            }} 
          > 
            Create Campaign 
          </Button> 
        </DialogActions> 
      </Dialog> 
 
      {/* Snackbar */} 
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({...snackbar, open: false})} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      > 
        <Alert  
          severity={snackbar.severity}  
          onClose={() => setSnackbar({...snackbar, open: false})} 
          sx={{  
            boxShadow: 3, 
          }} 
        > 
          {snackbar.message} 
        </Alert> 
      </Snackbar> 
 
      {/* Floating Action Button */} 
      <Fab 
        aria-label="add campaign" 
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24, 
          background: `linear-gradient(135deg, ${LIGHT_ORANGE_PALETTE.primary} 0%, 
${LIGHT_ORANGE_PALETTE.secondary} 100%)`, 
          boxShadow: `0 4px 20px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.3)}`, 
          '&:hover': { 
            boxShadow: `0 6px 25px ${alpha(LIGHT_ORANGE_PALETTE.primary, 0.4)}`, 
            transform: 'scale(1.1)' 
          }, 
          transition: 'all 0.3s ease' 
        }} 
        onClick={() => setCampaignDialog(true)} 
      > 
        <Add /> 
      </Fab> 
    </Box> 
  ); 
}; 
 
export default MarketingDashboard; 