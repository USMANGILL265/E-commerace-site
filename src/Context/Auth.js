"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const normalizeUser = (u) => {
  if (!u) return null;
  const username = u.username || u.userName || u.name || "";
  return { ...u, username };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    if (!userData) return;
    const normalized = normalizeUser(userData);
    setUser(normalized);
    try {
      localStorage.setItem("user", JSON.stringify(normalized));
    } catch {}
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      try {
        localStorage.removeItem("user");
      } catch {}
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success && data.message) {
        const normalized = normalizeUser(data.message);
        setUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== "undefined") {
        const parsed = JSON.parse(savedUser);
        if (parsed) {
          setUser(normalizeUser(parsed));
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error("Error parsing savedUser:", err);
      localStorage.removeItem("user");
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
