import React from "react";
import { useContext } from "react";
import { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("AppUser")) || null,
  );

  // isLogin is derived from user, not separate state - avoids an extra
  // render pass from setting state inside a useEffect just to mirror it.
  const isLogin = !!user;
  const setIsLogin = () => {}; // kept for backwards compatibility with existing call sites

  const value = { user, isLogin, setUser, setIsLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
