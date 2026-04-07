import { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../services/axiosConfig";
import { ENDPOINTS } from "../services/apiEndpoints";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchUser = async () => {
  setLoading(true);
  try {
    // Backend returns { user: req.user } from /api/auth/me
    const res = await axiosConfig("GET", "/api/auth/me");
    const userData = res?.user || null;
    setUser(userData);
    return userData;
  } catch (err) {
    setUser(null);
    return null;
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await axiosConfig("POST", ENDPOINTS.LOGOUT);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);