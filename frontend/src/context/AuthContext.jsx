import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await axios.get(`${API}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      // Token invalid or expired - clear everything
      console.error('Token verification failed');
      localStorage.removeItem('admin_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API}/admin/login`, { email, password });
      const { token: newToken, email: userEmail } = response.data;
      
      // Store token securely
      localStorage.setItem('admin_token', newToken);
      setToken(newToken);
      setUser({ email: userEmail });
      
      // Log successful login (for security monitoring)
      console.log('Admin login successful:', new Date().toISOString());
      
      return response.data;
    } catch (error) {
      // Log failed attempt (for security monitoring)
      console.error('Failed login attempt:', new Date().toISOString());
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
    console.log('Admin logged out:', new Date().toISOString());
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;