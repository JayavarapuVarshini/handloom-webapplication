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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress,
  IconButton,
  InputAdornment,
  Fade,
  Grid,
  Chip,
  Zoom,
  Slide,
  Grow,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Security,
  DesignServices,
  CheckCircle,
  Cancel,
  AutoAwesome,
  Star,
  Palette,
  Brush,
  Storefront,
  TrendingUp,
} from "@mui/icons-material";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push("At least 8 characters");

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("One uppercase letter");

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("One lowercase letter");

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push("One number");

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
    else feedback.push("One special character");

    return { score, feedback };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setError("");

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email (e.g., user@example.com)");
      } else {
        setEmailError("");
      }
    }

    if (name === "password" || name === "confirmPassword") {
      validatePasswords(updatedFormData);

      if (name === "password") {
        const strength = checkPasswordStrength(value);
        setPasswordStrength(strength);
      }
    }
  };

  const validatePasswords = (data = formData) => {
    const { password, confirmPassword } = data;

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else if (passwordStrength.score < 4) {
        setPasswordError("Password is not strong enough");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (passwordStrength.score < 4) {
      setPasswordError("Password is not strong enough. Please meet the requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!formData.role) {
      setError("Please select a role");
      return;
    }

    setError("");
    setPasswordError("");

    register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.message || "Registration failed");
      });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return "error";
    if (passwordStrength.score === 3) return "warning";
    return "success";
  };

  const getStrengthLabel = () => {
    if (passwordStrength.score === 0) return "Very Weak";
    if (passwordStrength.score === 1) return "Weak";
    if (passwordStrength.score === 2) return "Fair";
    if (passwordStrength.score === 3) return "Good";
    if (passwordStrength.score === 4) return "Strong";
    return "Very Strong";
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "buyer":
        return <Storefront sx={{ fontSize: 20, mr: 1 }} />;
      case "artisan":
        return <Brush sx={{ fontSize: 20, mr: 1 }} />;
      case "marketing":
        return <TrendingUp sx={{ fontSize: 20, mr: 1 }} />;
      default:
        return <Person sx={{ fontSize: 20, mr: 1 }} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6b35 0%, #ff8e53 50%, #f4511e 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
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
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          top: "-40vw",
          left: "-40vw",
          animation: "float 20s ease-in-out infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
          bottom: "-30vw",
          right: "-30vw",
          animation: "float 25s ease-in-out infinite reverse",
        },
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(180deg)" },
        },
      }}
    >
      {/* Animated floating elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          animation: "float 6s ease-in-out infinite",
        }}
      >
        <AutoAwesome sx={{ fontSize: 32, color: "rgba(255,255,255,0.6)" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "15%",
          animation: "float 8s ease-in-out infinite 1s",
        }}
      >
        <Star sx={{ fontSize: 24, color: "rgba(255,255,255,0.5)" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          animation: "float 7s ease-in-out infinite 0.5s",
        }}
      >
        <Palette sx={{ fontSize: 28, color: "rgba(255,255,255,0.4)" }} />
      </Box>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Slide in={true} direction="up" timeout={800}>
          <Box>
            <Fade in={true} timeout={1000}>
              <Card
                elevation={24}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  position: "relative",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Animated gradient border */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, #ff6b35, #ff8e53, #ffab40)",
                    borderRadius: 4,
                    padding: "2px",
                    backgroundSize: "400% 400%",
                    animation: "gradientShift 8s ease infinite",
                    zIndex: -1,
                    opacity: isHovered ? 1 : 0.7,
                    transition: "opacity 0.5s ease",
                  }}
                />
                
                {/* Main content */}
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.98)",
                    borderRadius: "12px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Top gradient bar */}
                  <Box
                    sx={{
                      height: 6,
                      background: "linear-gradient(90deg, #ff6b35, #ff8e53, #ffab40)",
                      backgroundSize: "400% 400%",
                      animation: "gradientShift 4s ease infinite",
                    }}
                  />

                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    {/* Header Section */}
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <Chip
                          label="Create your free account"
                          size="small"
                          icon={<AutoAwesome sx={{ fontSize: 16 }} />}
                          sx={{
                            fontSize: "0.75rem",
                            borderRadius: 999,
                            background: "linear-gradient(135deg, #ff6b35, #ff8e53)",
                            color: "white",
                            fontWeight: 600,
                            height: 28,
                            "& .MuiChip-icon": { color: "white" },
                          }}
                        />
                      </Box>

                      {/* Animated icon */}
                      <Box
                        sx={{
                          position: "relative",
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          mx: "auto",
                          mb: 2,
                          background: "conic-gradient(from 160deg, #ff6b35, #ff8e53, #ffab40, #ffb74d, #ff6b35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 16px 40px rgba(255,107,53,0.3)",
                          // rotation removed
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
                        <PersonAddIcon
                          sx={{
                            fontSize: 40,
                            background: "linear-gradient(135deg, #ff6b35, #ff8e53)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            position: "relative",
                            zIndex: 2,
                          }}
                        />
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
                          Join Our Collective
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
                        Start your creative journey with Global Loom Collective
                      </Typography>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                      <Zoom in={true}>
                        <Alert
                          severity="error"
                          sx={{
                            mb: 3,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "error.light",
                            fontWeight: 500,
                          }}
                        >
                          {error}
                        </Alert>
                      </Zoom>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit}>
                      <Grow in={true} timeout={800}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          margin="normal"
                          required
                          disabled={loading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person sx={{ color: "#ff6b35", opacity: 0.8 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1rem",
                              backgroundColor: "rgba(255,107,53,0.02)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255,107,53,0.04)",
                                transform: "translateY(-2px)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255,107,53,0.06)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(255,107,53,0.15)",
                              },
                            },
                          }}
                        />
                      </Grow>

                      <Grow in={true} timeout={1000}>
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
                          error={!!emailError}
                          helperText={emailError}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email sx={{ color: "#ff6b35", opacity: 0.8 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1rem",
                              backgroundColor: "rgba(255,107,53,0.02)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255,107,53,0.04)",
                                transform: "translateY(-2px)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255,107,53,0.06)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(255,107,53,0.15)",
                              },
                            },
                          }}
                        />
                      </Grow>

                      <Grow in={true} timeout={1200}>
                        <FormControl fullWidth margin="normal" disabled={loading}>
                          <InputLabel>Select Your Role</InputLabel>
                          <Select
                            name="role"
                            value={formData.role}
                            label="Select Your Role"
                            onChange={handleChange}
                            required
                            sx={{
                              borderRadius: 3,
                              backgroundColor: "rgba(255,107,53,0.02)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255,107,53,0.04)",
                                transform: "translateY(-2px)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255,107,53,0.06)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(255,107,53,0.15)",
                              },
                            }}
                          >
                            <MenuItem value="buyer">
                              {getRoleIcon("buyer")}
                              Buyer
                            </MenuItem>
                            <MenuItem value="artisan">
                              {getRoleIcon("artisan")}
                              Artisan
                            </MenuItem>
                            <MenuItem value="marketing">
                              {getRoleIcon("marketing")}
                              Marketing Specialist
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grow>

                      <Grow in={true} timeout={1400}>
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          margin="normal"
                          required
                          error={!!passwordError}
                          disabled={loading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock sx={{ color: "#ff6b35", opacity: 0.8 }} />
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
                              borderRadius: 3,
                              fontSize: "1rem",
                              backgroundColor: "rgba(255,107,53,0.02)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255,107,53,0.04)",
                                transform: "translateY(-2px)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255,107,53,0.06)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(255,107,53,0.15)",
                              },
                            },
                          }}
                        />
                      </Grow>

                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <Zoom in={true}>
                          <Box sx={{ mt: 2, mb: 2, p: 2, borderRadius: 3, bgcolor: "grey.50" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                              <Typography variant="body2" fontWeight="bold" color="text.secondary">
                                Password Strength
                              </Typography>
                              <Typography
                                variant="body2"
                                color={`${getStrengthColor()}.main`}
                                fontWeight="bold"
                              >
                                {getStrengthLabel()}
                              </Typography>
                            </Box>

                            <LinearProgress
                              variant="determinate"
                              value={(passwordStrength.score / 5) * 100}
                              color={getStrengthColor()}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "grey.200",
                                mb: 2,
                              }}
                            />

                            <Grid container spacing={1}>
                              {[
                                { label: "8+ chars", test: formData.password.length >= 8 },
                                { label: "A-Z", test: /[A-Z]/.test(formData.password) },
                                { label: "a-z", test: /[a-z]/.test(formData.password) },
                                { label: "0-9", test: /[0-9]/.test(formData.password) },
                                { label: "!@#$", test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) },
                              ].map((requirement, index) => (
                                <Grid item xs={6} sm={4} key={index}>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    {requirement.test ? (
                                      <CheckCircle sx={{ fontSize: 16, color: "success.main", mr: 1 }} />
                                    ) : (
                                      <Cancel sx={{ fontSize: 16, color: "error.main", mr: 1 }} />
                                    )}
                                    <Typography
                                      variant="caption"
                                      color={requirement.test ? "success.main" : "text.secondary"}
                                      fontWeight={500}
                                    >
                                      {requirement.label}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </Zoom>
                      )}

                      <Grow in={true} timeout={1600}>
                        <TextField
                          fullWidth
                          label="Confirm Password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          margin="normal"
                          required
                          error={!!passwordError}
                          helperText={passwordError}
                          disabled={loading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Security sx={{ color: "#ff6b35", opacity: 0.8 }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={toggleConfirmPasswordVisibility}
                                  edge="end"
                                  sx={{ color: "#ff6b35" }}
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1rem",
                              backgroundColor: "rgba(255,107,53,0.02)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(255,107,53,0.04)",
                                transform: "translateY(-2px)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255,107,53,0.06)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(255,107,53,0.15)",
                              },
                            },
                          }}
                        />
                      </Grow>

                      <Grow in={true} timeout={1800}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          sx={{
                            mt: 4,
                            mb: 2,
                            py: 1.6,
                            borderRadius: 3,
                            background: "linear-gradient(135deg, #ff6b35 0%, #ff8e53 50%, #ffab40 100%)",
                            backgroundSize: "200% 200%",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            textTransform: "none",
                            boxShadow: "0 12px 30px rgba(255,107,53,0.3)",
                            animation: isHovered ? "gradientShift 2s ease infinite" : "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 20px 40px rgba(255,107,53,0.45)",
                            },
                            "&:active": {
                              transform: "translateY(-1px)",
                            },
                          }}
                          disabled={
                            !!passwordError ||
                            !!emailError ||
                            !formData.role ||
                            loading ||
                            passwordStrength.score < 4
                          }
                        >
                          {loading ? (
                            <LinearProgress
                              sx={{ width: "100%", borderRadius: 999, height: 6 }}
                            />
                          ) : (
                            <>
                              <PersonAddIcon sx={{ mr: 1.5, fontSize: 24 }} />
                              Create Account
                            </>
                          )}
                        </Button>
                      </Grow>
                    </form>

                    {/* Sign In Link */}
                    <Grow in={true} timeout={2000}>
                      <Box sx={{ textAlign: "center", mt: 3 }}>
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary", fontWeight: 400 }}
                        >
                          Already have an account?{" "}
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            <Typography
                              component="span"
                              sx={{
                                  color: "#ff6b35",
                                fontWeight: 600,
                                  background: "linear-gradient(135deg, #ff6b35, #ff8e53)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    textShadow: "0 0 20px rgba(255,107,53,0.4)",
                                },
                              }}
                            >
                              Sign In
                            </Typography>
                          </Link>
                        </Typography>
                      </Box>
                    </Grow>

                    {/* Footer */}
                    <Grow in={true} timeout={2200}>
                      <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255,107,53,0.2)" }}>
                        <Grid container spacing={1} justifyContent="center" alignItems="center">
                          <Grid item>
                            <DesignServices sx={{ fontSize: 20, color: "#ff6b35" }} />
                          </Grid>
                          <Grid item>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: "text.secondary",
                                fontWeight: 500,
                                background: "linear-gradient(135deg, #ff6b35, #ff8e53)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              Weaving dreams into digital designs
                            </Typography>
                          </Grid>
                        </Grid>
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

export default Register;