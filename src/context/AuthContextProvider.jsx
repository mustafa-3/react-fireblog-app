import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { userObserver } from "../auth/Firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
