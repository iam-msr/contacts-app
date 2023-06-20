import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    const creds = { username, password };
    const host = "http://localhost:5000"
    const response = await Axios.post(`${host}/api/login`, creds, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    localStorage.setItem('token', response.data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
