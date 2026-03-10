import React, { createContext, useContext, useState } from "react";

const ArtisanContext = createContext();

export const useArtisan = () => useContext(ArtisanContext);

export const ArtisanProvider = ({ children }) => {
  // Approved products
  const [artisanProducts, setArtisanProducts] = useState([]);
  // Pending products (submitted for approval)
  const [artisanPendingProducts, setArtisanPendingProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Simulate async behaviour (like calling backend)
  const fakeDelay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const submitProduct = async (productData) => {
    // 👉 This MUST ALWAYS RESOLVE, otherwise button keeps buffering
    setLoadingProducts(true);
    try {
      await fakeDelay(800); // pretend to call API
      setArtisanPendingProducts((prev) => [...prev, productData]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const updateProduct = async (updatedProduct) => {
    setLoadingProducts(true);
    try {
      await fakeDelay(800);
      // If product is pending, update in pending list
      setArtisanPendingProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      // If product is approved, update in approved list
      setArtisanProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoadingProducts(true);
    try {
      await fakeDelay(400);
      setArtisanProducts((prev) => prev.filter((p) => p.id !== productId));
      setArtisanPendingProducts((prev) =>
        prev.filter((p) => p.id !== productId)
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  const value = {
    artisanProducts,
    artisanPendingProducts,
    loadingProducts,
    submitProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ArtisanContext.Provider value={value}>
      {children}
    </ArtisanContext.Provider>
  );
};
