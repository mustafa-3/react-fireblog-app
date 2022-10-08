import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const [currentUser, setCurrentUser] = useState(false);
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
