import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authServices";
import axiosConfig from "../services/axiosConfig";
import { ENDPOINTS } from "../services/apiEndpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await axiosConfig("get", ENDPOINTS.ME);
        setUser(data.data || data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
      {
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await axiosConfig("post", ENDPOINTS.LOGOUT);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
