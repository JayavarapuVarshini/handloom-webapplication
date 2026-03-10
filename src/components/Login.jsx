import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
  Chip,
  Fade,
  Slide,
  Grow,
  Zoom, // Add this import
} from "@mui/material";
import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Brush,
  Palette,
  Texture,
  AutoAwesome,
} from "@mui/icons-material";

// Custom handloom icon component
const LoomIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM1.75 19.25c0 .41.34.75.75.75h6.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-.75v-4h-4v4h-.75c-.41 0-.75.34-.75.75zM20 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-2.5 15.25h-.75v-4h-4v4h-.75c-.41 0-.75.34-.75.75s.34.75.75.75h6.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75zM12 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
  </svg>
);

const WeavingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2V7zm-4 0h2v2H7V7zm8 0h2v2h-2V7zm-8 4h2v2H7v-2zm8 0h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 4h2v2H7v-2zm8 0h2v2h-2v-2zm-4 0h2v2h-2v-2z"/>
  </svg>
);

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ed4c11ff 0%, #ff8e53 25%, #b2170fff 50%, #ffb74d 75%, #ffcc80 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        overflow: "hidden",
        "@keyframes gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
          top: "-100px",
          left: "-100px",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
          bottom: "-150px",
          right: "-150px",
        },
      }}
    >
      {/* Handloom-themed decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "10%",
          opacity: 0.6,
        }}
      >
        <Box sx={{ color: "rgba(255,255,255,0.8)" }}>
          <WeavingIcon />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          right: "12%",
          opacity: 0.5,
        }}
      >
        <Palette sx={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "12%",
          opacity: 0.4,
        }}
      >
        <Texture sx={{ fontSize: 30, color: "rgba(255,255,255,0.6)" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          right: "8%",
          opacity: 0.5,
        }}
      >
        <Brush sx={{ fontSize: 26, color: "rgba(255,255,255,0.7)" }} />
      </Box>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Slide in={true} direction="up" timeout={800}>
          <Box>
            <Fade in={true} timeout={1000}>
              <Card
                elevation={20}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(16px)",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 25px 50px rgba(255,107,53,0.25), 0 0 0 1px rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  position: "relative",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Orange gradient border */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, #b13407ff, #ff8e53, #ffab40)",
                    borderRadius: 3,
                    padding: "2px",
                    zIndex: -1,
                    opacity: isHovered ? 0.9 : 0.7,
                    transition: "opacity 0.3s ease",
                  }}
                />
                
                {/* Main content */}
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.98)",
                    borderRadius: "10px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Top gradient bar */}
                  <Box
                    sx={{
                      height: 6,
                      background: "linear-gradient(90deg, #e12427ff, #ff8e53, #ffab40)",
                    }}
                  />

                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    {/* Header Section */}
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                      {/* Handloom-themed logo */}
                      <Box
                        sx={{
                          position: "relative",
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          mx: "auto",
                          mb: 2,
                          background: "linear-gradient(135deg, #ff6b35, #ff8e53, #ffab40)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 12px 30px rgba(255,107,53,0.3)",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 3,
                            borderRadius: "50%",
                            backgroundColor: "white",
                            zIndex: 1,
                          },
                        }}
                      >
                        <Box sx={{ color: "#ff6b35", position: "relative", zIndex: 2 }}>
                          <LoomIcon />
                        </Box>
                      </Box>

                      <Grow in={true} timeout={1500}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "bold",
                            background: "linear-gradient(135deg, #ff6b35, #ff8e53, #ffab40)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 1,
                          }}
                        >
                          Global Loom Collective
                        </Typography>
                      </Grow>
                      
                      <Typography
                        variant="body1"
                        sx={{ 
                          color: "text.secondary",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                        }}
                      >
                        Continue weaving your creative journey
                      </Typography>
                    </Box>

                    {/* Error message */}
                    {error && (
                      <Zoom in={true}>
                        <Alert 
                          severity="error" 
                          sx={{ 
                            mb: 3, 
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "error.light",
                            fontWeight: 500,
                          }}
                        >
                          {error}
                        </Alert>
                      </Zoom>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                      <Grow in={true} timeout={800}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          margin="normal"
                          required
                          disabled={loading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email sx={{ color: "#ff6b35" }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              fontSize: "1rem",
                              backgroundColor: "rgba(255,107,53,0.02)",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255,107,53,0.04)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255,107,53,0.06)",
                                boxShadow: "0 0 0 2px rgba(255,107,53,0.1)",
                              },
                            },
                          }}
                        />
                      </Grow>

                      <Grow in={true} timeout={1000}>
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          margin="normal"
                          required
                          disabled={loading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock sx={{ color: "#ff6b35" }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton 
                                  onClick={togglePasswordVisibility} 
                                  edge="end"
                                  sx={{ color: "#ff6b35" }}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              fontSize: "1rem",
                              backgroundColor: "rgba(255,107,53,0.02)",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255,107,53,0.04)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255,107,53,0.06)",
                                boxShadow: "0 0 0 2px rgba(255,107,53,0.1)",
                              },
                            },
                          }}
                        />
                      </Grow>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ 
                            color: "#ff6b35", 
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              color: "#ff8e53",
                            },
                          }}
                        >
                          Forgot your password?
                        </Typography>
                      </Box>

                      <Grow in={true} timeout={1200}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={loading}
                          sx={{
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #ff6b35, #ff8e53, #ffab40)",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            textTransform: "none",
                            boxShadow: "0 8px 20px rgba(255,107,53,0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 12px 25px rgba(255,107,53,0.4)",
                              background: "linear-gradient(135deg, #ff8e53, #ffab40, #ffb74d)",
                            },
                            "&:active": {
                              transform: "translateY(0)",
                            },
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={22} sx={{ color: "white" }} />
                          ) : (
                            <>
                              <LoginIcon fontSize="small" />
                              Login
                            </>
                          )}
                        </Button>
                      </Grow>
                    </form>

                    {/* Sample Credentials */}
                    <Box sx={{ mt: 3, p: 2, bgcolor: "rgba(255,107,53,0.05)", borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#ff6b35", mb: 1.5 }}>
                        Sample Accounts:
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                        <strong>Admin:</strong> admin@example.com / admin123
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                        <strong>Artisan:</strong> artisan@example.com / password
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                        <strong>Buyer:</strong> buyer@example.com / password
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block" }}>
                        <strong>Marketing:</strong> marketing@example.com / password
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: "rgba(255,107,53,0.2)" }}>
                      <Typography variant="caption" sx={{ color: "text.secondary", px: 1 }}>
                        New to the collective?
                      </Typography>
                    </Divider>

                    {/* Sign up link */}
                    <Grow in={true} timeout={1400}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 400 }}>
                          {" "}
                          <Link
                            to="/register"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                color: "#ff6b35",
                                fontWeight: 600,
                                background: "linear-gradient(135deg, #ff6b35, #ff8e53)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  textShadow: "0 0 20px rgba(255,107,53,0.3)",
                                },
                              }}
                            >
                              Join the Loom
                            </Typography>
                          </Link>
                        </Typography>
                      </Box>
                    </Grow>
                  </CardContent>
                </Box>
              </Card>
            </Fade>
          </Box>
        </Slide>
      </Container>
    </Box>
  );
};

export default Login;