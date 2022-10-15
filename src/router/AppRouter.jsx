import { Modal } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogDetail from "../pages/BlogDetail";
import Login from "../pages/Login";
import Main from "../pages/Main";
import BasicModal from "../pages/Modal";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<BlogDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="/modal" element={<BasicModal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
