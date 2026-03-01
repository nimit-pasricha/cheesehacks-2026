import { createContext, useContext, useState } from "react";
import type { PT_children } from "../../types";

interface AuthContextType {
  loggedIn: boolean;
  username?: string;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: {} & PT_children) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>();

  const login = (username: string) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const logout = () => {
    setUsername(undefined);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
