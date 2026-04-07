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
      const res = await axiosConfig("GET", "/api/users/me");

      console.log("FETCH USER RES:", res);

      if (res?.success) {
        setUser(res.data); // ✅ FIXED
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
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