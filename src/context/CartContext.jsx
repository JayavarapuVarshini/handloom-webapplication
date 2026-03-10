import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🔹 Utility: Normalize price into a number (e.g. 8999)
  const normalizePriceToNumber = (rawPrice) => {
    let price = rawPrice;

    // If price is object (e.g. { amount: 8999 } or { value: "₹8,999" })
    if (typeof price === "object" && price !== null) {
      price =
        price.amount ??
        price.value ??
        price.price ??
        null;
    }

    if (typeof price === "string") {
      const numeric = parseInt(price.replace(/[^\d]/g, ""), 10);
      return isNaN(numeric) ? 0 : numeric;
    }

    if (typeof price === "number") return price;

    return 0;
  };

  const addToCart = (item) => {
    // Expecting: { id, name, price (string or number), image, artisan, ... }
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 🔹 This is where your error was:
  // Uncaught TypeError: item.price.replace is not a function
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const numericPrice = normalizePriceToNumber(item.price);
      return total + numericPrice * (item.quantity || 1);
    }, 0);
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
