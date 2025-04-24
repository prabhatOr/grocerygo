import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data?.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile after successful update
  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password,
        rememberMe,
      });

      const { token, role, status } = res.data.user;

      // Reject users that are not admins
      if (role !== "admin") {
        throw "Access denied: You are not authorized to login.";
      }

      // Reject users that are inactive
      if (status === false) {
        throw "Your account is inactive. Please contact support.";
      }

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      await fetchUserProfile();
    } catch (err) {
      throw err.response?.data?.message || err || "Access denied!";
    }
  };

  const token = getToken();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
