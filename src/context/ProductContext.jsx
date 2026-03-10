 
// context/ProductContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('handloomProducts');
    const savedPending = localStorage.getItem('handloomPendingProducts');
    const savedNotifications = localStorage.getItem('handloomNotifications');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedPending) setPendingProducts(JSON.parse(savedPending));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('handloomProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('handloomPendingProducts', JSON.stringify(pendingProducts));
  }, [pendingProducts]);

  useEffect(() => {
    localStorage.setItem('handloomNotifications', JSON.stringify(notifications));
  }, [notifications]);

  // Get approved products (for buyer dashboard)
  const approvedProducts = products.filter(product => product.status === 'approved');

  // Get new products (recently approved - last 7 days)
  const newProducts = approvedProducts
    .filter(product => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const productDate = product.approvedDate || product.createdDate;
      return new Date(productDate) > oneWeekAgo;
    })
    .sort((a, b) => new Date(b.approvedDate || b.createdDate) - new Date(a.approvedDate || a.createdDate));

  // Get artisan's approved products
  const getArtisanProducts = (artisanName) => {
    return approvedProducts.filter(product => product.artisan === artisanName);
  };

  // Get artisan's pending products
  const getArtisanPendingProducts = (artisanName) => {
    return pendingProducts.filter(product => product.artisan === artisanName);
  };

  // Submit new product for approval
  const submitProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      status: 'pending',
      submittedDate: new Date().toISOString(),
      createdDate: new Date().toISOString()
    };
    
    setPendingProducts(prev => [...prev, newProduct]);
    
    // Add notification for admin
    addNotification({
      id: Date.now(),
      message: `New product "${productData.name}" submitted for approval by ${productData.artisan}`,
      date: new Date().toISOString(),
      type: 'product_submission',
      read: false,
      productId: newProduct.id
    });

    return newProduct.id;
  };

  // Approve product (admin function)
  const approveProduct = (productId) => {
    const productIndex = pendingProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      const product = pendingProducts[productIndex];
      const approvedProduct = {
        ...product,
        status: 'approved',
        approvedDate: new Date().toISOString(),
        inStock: true
      };

      setPendingProducts(prev => prev.filter(p => p.id !== productId));
      setProducts(prev => [...prev, approvedProduct]);

      // Add notification for artisan
      addNotification({
        id: Date.now(),
        message: `Your product "${product.name}" has been approved and is now live!`,
        date: new Date().toISOString(),
        type: 'product_approval',
        read: false,
        artisan: product.artisan
      });

      return approvedProduct;
    }
  };

  // Reject product (admin function)
  const rejectProduct = (productId, reason) => {
    const product = pendingProducts.find(p => p.id === productId);
    if (product) {
      setPendingProducts(prev => prev.filter(p => p.id !== productId));

      // Add notification for artisan with rejection reason
      addNotification({
        id: Date.now(),
        message: `Your product "${product.name}" was not approved`,
        date: new Date().toISOString(),
        type: 'product_rejection',
        read: false,
        artisan: product.artisan,
        rejectionReason: reason
      });
    }
  };

  // Notification functions
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getUnreadNotifications = () => {
    return notifications.filter(notification => !notification.read);
  };

  const getUserNotifications = (userName) => {
    return notifications.filter(notification => 
      !notification.artisan || notification.artisan === userName
    );
  };

  const value = {
    // All products
    products: approvedProducts,
    pendingProducts,
    
    // Filtered products for different dashboards
    approvedProducts,
    newProducts,
    
    // Artisan-specific products
    artisanProducts: getArtisanProducts,
    artisanPendingProducts: getArtisanPendingProducts,
    
    // Notifications
    notifications,
    getUnreadNotifications,
    getUserNotifications,
    markNotificationAsRead,
    
    // Product actions
    submitProduct,
    approveProduct,
    rejectProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};