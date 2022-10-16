import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogDetail from "../pages/BlogDetail";
import Login from "../pages/Login";
import Main from "../pages/Main";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/detail/:id" element={<PrivateRouter />}>
          <Route path="" element={<BlogDetail />} />
        </Route>
        <Route path="/profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/newblog" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
