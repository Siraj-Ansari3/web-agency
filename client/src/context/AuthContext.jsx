import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_DOMAIN + "/admin/me",
          { withCredentials: true }
        );
        setAdmin(response.data);
      } catch (error) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = (adminData) => {
    setAdmin(adminData);
  };

  const signOut = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/signout",
        {},
        { withCredentials: true }
      );
      setAdmin(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);