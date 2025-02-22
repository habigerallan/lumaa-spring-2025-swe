import { createContext, useContext, useState, ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "../api/api";

interface AuthContextType {
  user: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<boolean>(!!localStorage.getItem("token"));

  const login = async (username: string, password: string) => {
    const { data } = await apiLogin({ username, password });
    localStorage.setItem("token", data.token);
    setUser(true);
  };

  const register = async (username: string, password: string) => {
    await apiRegister({ username, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
