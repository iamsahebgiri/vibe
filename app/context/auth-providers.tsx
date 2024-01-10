import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { useApolloClient } from "@apollo/client";

const AuthContext = createContext({});

type AuthType = {
  loading: boolean;
  isAuthenticated: boolean;
  token: null | string;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const client = useApolloClient();
  const [authState, setAuthState] = useState<AuthType>({
    loading: true,
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Verify token on the server and set isAuthenticated accordingly
      // Make a GraphQL query or request to your authentication server
      // Update isAuthenticated state accordingly
      // setAuthState({ loading: false, isAuthenticated: true });
    } else {
      setAuthState({ loading: false, isAuthenticated: false, token });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setAuthState({ loading: false, isAuthenticated: true, token });
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Clear Apollo cache
    client.clearStore();
    setAuthState({ loading: false, isAuthenticated: false, token: null });
  };

  const loginWithGoogle = (idToke: string) => {
    
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
