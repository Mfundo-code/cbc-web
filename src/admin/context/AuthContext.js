import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  getStoredAdminUser,
  loginAdmin,
  logoutAdmin,
  setStoredAdminUser,
} from "../../global/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [username, setUsername] = useState(() => getStoredAdminUser());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (usernameInput, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAdmin(usernameInput, password);
      const newToken = res.data.token;
      localStorage.setItem("authToken", newToken);
      setStoredAdminUser(usernameInput);
      setToken(newToken);
      setUsername(usernameInput);
      return true;
    } catch (err) {
      const message =
        err.response?.status === 400
          ? "That username or password doesn't look right."
          : "Couldn't reach the server. Please try again.";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    logoutAdmin();
    setToken(null);
    setUsername(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      username,
      isAuthenticated: Boolean(token),
      login,
      logout,
      error,
      loading,
    }),
    [token, username, login, logout, error, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
