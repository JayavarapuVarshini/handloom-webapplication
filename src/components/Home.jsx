import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Fade,
  Slide,
  Grow,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import {
  Storefront,
  Brush,
  Campaign,
  AdminPanelSettings,
  ArrowForward,
  Public,
  Groups,
  Nature,
  Login,
  PersonAdd,
  ShoppingBag,
  Palette,
  TrendingUp,
  Security,
} from "@mui/icons-material";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Your beautiful handloom background image
  const backgroundImage = "https://roohforspaces.sg/cdn/shop/articles/image-000_800x800.jpg?v=1711706974";

  const features = [
    {
      icon: <Public sx={{ fontSize: 52 }} />,
      title: "Global Marketplace",
      description: "Connect with artisans and buyers worldwide in our vibrant handloom marketplace. Reach customers across 50+ countries through our international platform.",
      color: "#8B4513",
      gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
      stats: "50+ Countries"
    },
    {
      icon: <Palette sx={{ fontSize: 52 }} />,
      title: "Authentic Handloom",
      description: "Discover genuine handcrafted textiles made with traditional techniques. Each piece tells a unique cultural story of heritage and craftsmanship.",
      color: "#B22222",
      gradient: "linear-gradient(135deg, #B22222 0%, #DC143C 100%)",
      stats: "1000+ Artisans"
    },
    {
      icon: <Groups sx={{ fontSize: 52 }} />,
      title: "Artisan Community",
      description: "Join thousands of skilled artisans and textile enthusiasts. Collaborate, learn, and grow together in our supportive community.",
      color: "#2E8B57",
      gradient: "linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)",
      stats: "10K+ Members"
    }
  ];

  const dashboards = [
    {
      title: "Buyer Dashboard",
      path: "/buyer",
      icon: <ShoppingBag sx={{ fontSize: 42 }} />,
      description: "Explore unique handloom collections and make purchases",
      color: "#8B4513",
      gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    },
    {
      title: "Artisan Dashboard",
      path: "/artisan",
      icon: <Brush sx={{ fontSize: 42 }} />,
      description: "Showcase your craft and manage your products",
      color: "#2E8B57",
      gradient: "linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)"
    },
    {
      title: "Marketing Dashboard",
      path: "/marketing",
      icon: <TrendingUp sx={{ fontSize: 42 }} />,
      description: "Promote products and analyze market trends",
      color: "#B22222",
      gradient: "linear-gradient(135deg, #B22222 0%, #DC143C 100%)"
    },
    {
      title: "Admin Dashboard",
      path: "/admin",
      icon: <Security sx={{ fontSize: 42 }} />,
      description: "Manage platform operations and user accounts",
      color: "#4B0082",
      gradient: "linear-gradient(135deg, #4B0082 0%, #8A2BE2 100%)"
    }
  ];

  // Navigation handlers
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleGetStarted = () => navigate("/register");
  const handleCreateAccount = () => navigate("/register");

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f4f0 0%, #e8e0d8 100%)",
    }}>
      {/* Header - Changed to fixed position */}
      <AppBar 
        position="fixed" // Changed from "static" to "fixed"
        sx={{ 
          bgcolor: "rgba(139, 69, 19, 0.95)",
          backdropFilter: "blur(20px)",
          color: "white",
          boxShadow: "0 2px 20px rgba(139, 69, 19, 0.3)",
          zIndex: 1300, // Ensure it stays above other content
        }}
      >
        <Toolbar>
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="h4" 
              sx={{ 
                flexGrow: 1, 
                color: "white",
                fontWeight: "bold",
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Global Loom Collective
            </Typography>
          </Fade>
          <Button 
            startIcon={<Login />}
            onClick={handleLogin}
            sx={{ 
              mr: 2,
              fontWeight: 600,
              color: "white",
              border: "2px solid rgba(255,255,255,0.3)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                transform: "translateY(-2px)",
                border: "2px solid rgba(255,255,255,0.5)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Login
          </Button>
          <Button 
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={handleRegister}
            sx={{ 
              background: "linear-gradient(135deg, #D2691E 0%, #FF8C00 100%)",
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: "bold",
              boxShadow: "0 8px 25px rgba(210, 105, 30, 0.4)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(210, 105, 30, 0.6)",
                background: "linear-gradient(135deg, #CD853F 0%, #FFA500 100%)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Join Now
          </Button>
        </Toolbar>
      </AppBar>

      {/* Add padding top to account for fixed header */}
      <Box sx={{ pt: { xs: '80px', md: '90px' } }}> {/* Adjusted padding for header height */}
        
        {/* Hero Section with Handloom Background */}
        <Box
          sx={{
            position: "relative",
            background: `linear-gradient(135deg, rgba(139, 69, 19, 0.85), rgba(210, 105, 30, 0.8)), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: isMobile ? "scroll" : "fixed",
            color: "white",
            py: { xs: 10, md: 15 },
            textAlign: "center",
            overflow: "hidden",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 30% 50%, rgba(139, 69, 19, 0.4) 0%, transparent 50%)",
              pointerEvents: "none",
            }
          }}
        >
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
            <Slide in={true} direction="down" timeout={800}>
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                component="h1" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  textShadow: "3px 3px 12px rgba(0,0,0,0.6)",
                  fontFamily: "'Playfair Display', serif",
                  mb: 3,
                  lineHeight: 1.2,
                  background: "linear-gradient(135deg, #FFF8DC 0%, #F5F5DC 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Weaving Tradition into Modern Life
              </Typography>
            </Slide>
            <Fade in={true} timeout={1200}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  opacity: 0.95,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                  lineHeight: 1.6,
                  maxWidth: "800px",
                  margin: "0 auto",
                  fontWeight: 400,
                }}
              >
                Experience the timeless beauty of authentic handloom crafts. Each thread tells a story 
                of tradition, skill, and cultural heritage passed down through generations.
              </Typography>
            </Fade>
            <Fade in={true} timeout={1600}>
              <Box sx={{ 
                display: "flex", 
                gap: 3, 
                justifyContent: "center", 
                flexWrap: "wrap",
                mt: 4 
              }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: "1.2rem",
                    background: "linear-gradient(135deg, #D2691E, #FF8C00)",
                    borderRadius: 3,
                    fontWeight: "bold",
                    boxShadow: "0 10px 30px rgba(210, 105, 30, 0.5)",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 40px rgba(210, 105, 30, 0.7)",
                      background: "linear-gradient(135deg, #CD853F, #FFA500)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Explore Crafts
                </Button>
                
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Preserving Heritage Section - PERFECTED CSS */}
        <Container sx={{ py: { xs: 8, md: 12 } }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  mb: 3,
                  background: "linear-gradient(135deg, #8B4513, #D2691E)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Preserving Heritage, Empowering Artisans
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#666",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                We combine traditional craftsmanship with modern technology to create unparalleled 
                experiences that honor heritage while building sustainable futures.
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                <Grow in={true} timeout={1000 + index * 200}>
                  <Card 
                    sx={{ 
                      width: "100%",
                      textAlign: "center",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,248,248,0.98))",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(139, 69, 19, 0.1)",
                      borderRadius: 4,
                      boxShadow: "0 15px 40px rgba(139, 69, 19, 0.1)",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: feature.gradient,
                      },
                      "&:hover": {
                        transform: "translateY(-12px) scale(1.02)",
                        boxShadow: "0 25px 60px rgba(139, 69, 19, 0.2)",
                        "& .feature-icon": {
                          transform: "scale(1.1) rotate(5deg)",
                          background: feature.gradient,
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      {/* Icon Section */}
                      <Box
                        className="feature-icon"
                        sx={{
                          background: `linear-gradient(135deg, ${alpha(feature.color, 0.1)} 0%, ${alpha(feature.color, 0.05)} 100%)`,
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: feature.color,
                          margin: "0 auto 24px",
                          transition: "all 0.4s ease",
                          border: `2px solid ${alpha(feature.color, 0.2)}`,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      
                      {/* Title Section */}
                      <Typography 
                        variant="h5" 
                        gutterBottom 
                        fontWeight="bold" 
                        sx={{ 
                          color: feature.color,
                          mb: 2,
                          fontSize: { xs: "1.4rem", md: "1.6rem" },
                          lineHeight: 1.2,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      {/* Stats Badge */}
                      <Box
                        sx={{
                          background: feature.gradient,
                          color: "white",
                          padding: "6px 16px",
                          borderRadius: 20,
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          margin: "0 auto 16px",
                          display: "inline-block",
                        }}
                      >
                        {feature.stats}
                      </Box>
                      
                      {/* Description */}
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: "#666",
                          lineHeight: 1.6,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          flexGrow: 1,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Dashboard Links Section - All 4 in Perfect Horizontal Line */}
        <Box sx={{ 
          background: `linear-gradient(135deg, rgba(139, 69, 19, 0.03), rgba(210, 105, 30, 0.05))`,
          py: 10,
          borderTop: "1px solid rgba(139, 69, 19, 0.1)",
          borderBottom: "1px solid rgba(139, 69, 19, 0.1)",
        }}>
          <Container>
            <Fade in={true} timeout={1000}>
              <Typography 
                variant="h3" 
                component="h2" 
                textAlign="center" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  color: "#8B4513",
                  mb: 6,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "2.5rem", md: "3rem" },
                }}
              >
                Join Our Creative Community
              </Typography>
            </Fade>
            
            {/* All 4 Dashboards in Perfect Horizontal Line */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              gap: 3,
              justifyContent: 'center',
              alignItems: 'stretch',
              flexWrap: isMobile ? 'nowrap' : 'wrap'
            }}>
              {dashboards.map((dashboard, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    flex: isMobile ? '0 0 auto' : '1',
                    minWidth: isMobile ? '100%' : '280px',
                    maxWidth: isMobile ? '100%' : '320px',
                  }}
                >
                  <Grow in={true} timeout={1000 + index * 200}>
                    <Card
                      component={Link}
                      to={dashboard.path}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                        height: "100%",
                        minHeight: '320px',
                        background: "white",
                        borderRadius: 3,
                        boxShadow: "0 8px 30px rgba(139, 69, 19, 0.1)",
                        border: `2px solid transparent`,
                        backgroundImage: `linear-gradient(white, white), ${dashboard.gradient}`,
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.02)",
                          boxShadow: "0 20px 50px rgba(139, 69, 19, 0.2)",
                          "& .dashboard-icon": {
                            transform: "scale(1.1)",
                            background: dashboard.gradient,
                          },
                          "& .dashboard-button": {
                            background: dashboard.gradient,
                            color: "white",
                          }
                        },
                      }}
                    >
                      <CardContent sx={{ 
                        p: 4, 
                        textAlign: "center",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}>
                        {/* Icon Section */}
                        <Box>
                          <Box
                            className="dashboard-icon"
                            sx={{
                              background: `linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(210, 105, 30, 0.05))`,
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: dashboard.color,
                              margin: "0 auto 20px",
                              transition: "all 0.3s ease",
                              border: `2px solid ${dashboard.color}20`,
                            }}
                          >
                            {dashboard.icon}
                          </Box>

                          <Typography 
                            variant="h5" 
                            component="h3" 
                            gutterBottom 
                            fontWeight="bold"
                            sx={{ 
                              color: dashboard.color,
                              mb: 2,
                            }}
                          >
                            {dashboard.title}
                          </Typography>

                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: "#666",
                              lineHeight: 1.5,
                              mb: 3,
                            }}
                          >
                            {dashboard.description}
                          </Typography>
                        </Box>

                        {/* CTA Button */}
                        <Button
                          className="dashboard-button"
                          variant="outlined"
                          size="medium"
                          endIcon={<ArrowForward />}
                          sx={{
                            borderColor: dashboard.color,
                            color: dashboard.color,
                            borderRadius: 2,
                            fontWeight: "bold",
                            px: 3,
                            py: 1,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              borderColor: dashboard.color,
                            }
                          }}
                        >
                          Access Now
                        </Button>
                      </CardContent>

                      {/* Gradient Top Border */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: dashboard.gradient,
                        }}
                      />
                    </Card>
                  </Grow>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Final Call to Action */}
        <Box sx={{ 
          background: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
          color: "white",
          py: 10,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }
        }}>
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
            <Fade in={true} timeout={1000}>
              <Typography variant="h3" component="h3" gutterBottom fontWeight="bold" sx={{ fontFamily: "'Playfair Display', serif" }}>
                Begin Your Handloom Journey
              </Typography>
            </Fade>
            <Fade in={true} timeout={1500}>
              <Typography variant="h6" sx={{ mb: 5, opacity: 0.9, maxWidth: "600px", margin: "0 auto" }}>
                Join our community of artisans, collectors, and handloom enthusiasts preserving traditional crafts
              </Typography>
            </Fade>
            
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;