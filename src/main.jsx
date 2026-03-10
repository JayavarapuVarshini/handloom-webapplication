import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./components/AppRoutes";

// Suppress specific MUI Grid migration warnings in development console
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  const suppressed = [
    /MUI Grid: The `item` prop has been removed/,
    /MUI Grid: The `xs` prop has been removed/,
    /MUI Grid: The `sm` prop has been removed/,
    /MUI Grid: The `md` prop has been removed/
  ];

  const _warn = console.warn.bind(console);
  console.warn = (...args) => {
    try {
      if (typeof args[0] === 'string' && suppressed.some((r) => r.test(args[0]))) return;
    } catch {
      // ignore
    }
    _warn(...args);
  };

  const _error = console.error.bind(console);
  console.error = (...args) => {
    try {
      if (typeof args[0] === 'string' && suppressed.some((r) => r.test(args[0]))) return;
    } catch {
      // ignore
    }
    _error(...args);
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Router>
              <AppRoutes />
            </Router>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)