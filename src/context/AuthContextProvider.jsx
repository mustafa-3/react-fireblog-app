import React, { createContext } from "react";

const AuthContextProvider = ({ children }) => {
  const AuthContext = createContext();
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
