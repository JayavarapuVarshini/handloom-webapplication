import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user database
  const users = [
    { id: 1, email: 'buyer@example.com', password: 'password', role: 'buyer', name: 'John Buyer' },
    { id: 2, email: 'artisan@example.com', password: 'password', role: 'artisan', name: 'Sarah Artisan' },
    { id: 3, email: 'marketing@example.com', password: 'password', role: 'marketing', name: 'Mike Marketing' },
    { id: 4, email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' }
  ];

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('handloomhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Helper: load persisted users (registered by users) from localStorage
  const loadPersistedUsers = () => {
    try {
      const raw = localStorage.getItem('handloomhub_users');
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  // Save persisted users
  const savePersistedUsers = (persisted) => {
    try {
      localStorage.setItem('handloomhub_users', JSON.stringify(persisted));
    } catch {
      // ignore
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const persisted = loadPersistedUsers();
        const allUsers = [...users, ...persisted];

        const foundUser = allUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
          const userData = { ...foundUser };
          delete userData.password; // Don't store password
          setUser(userData);
          localStorage.setItem('handloomhub_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }

        setLoading(false);
      }, 800);
    });
  };

  // Register a new user and persist to localStorage (simple demo implementation)
  const register = async ({ fullName, email, password, role }) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const persisted = loadPersistedUsers();
        const allUsers = [...users, ...persisted];

        // Check if email already exists
        const exists = allUsers.some(u => u.email === email);
        if (exists) {
          setLoading(false);
          reject(new Error('Email already registered'));
          return;
        }

        const newUser = {
          id: Date.now(),
          email,
          password,
          role,
          name: fullName || email.split('@')[0]
        };

        const newPersisted = [...persisted, newUser];
        savePersistedUsers(newPersisted);

        const userData = { ...newUser };
        delete userData.password;
        setUser(userData);
        localStorage.setItem('handloomhub_user', JSON.stringify(userData));

        setLoading(false);
        resolve(userData);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('handloomhub_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;