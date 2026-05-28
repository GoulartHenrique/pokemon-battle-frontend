import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authContextValue";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const isAuthenticated = !!token;

  const AUTH_URL = import.meta.env.VITE_AUTH_URL;

  const register = async (name: string, email: string, password: string) => {
    let response;
    try {
      response = await fetch(`${AUTH_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
    } catch {
      throw new Error("Could not connect to auth server");
    }

    if (!response.ok) {
      try {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      } catch {
        throw new Error("Registration failed");
      }
    }
  };

  const login = async (email: string, password: string) => {
    let response;
    try {
      response = await fetch(`${AUTH_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error("Could not connect to auth server");
    }

    if (!response.ok) {
      try {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      } catch {
        throw new Error("Login failed");
      }
    }

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    setToken(data.accessToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
