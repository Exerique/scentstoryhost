import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check local storage for token on init
    const token = localStorage.getItem('scentstory_admin_token');
    if (token) {
      setAdmin({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('scentstory_admin_token', token);
    setAdmin({ token });
  };

  const logout = () => {
    localStorage.removeItem('scentstory_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
