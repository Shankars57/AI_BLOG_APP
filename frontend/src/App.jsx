import React, { useContext } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddBlog from "./pages/Admin/AddBlog";
import ListBlog from "./pages/Admin/ListBlog";
import Comments from "./pages/Admin/Comments";
import Login from "./components/Admin/Login";
import { ToastContainer } from "react-toastify";
import { BlogContext } from "./context/AppContext";
const App = () => {
  const { token } = useContext(BlogContext);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>}></Route>
      </Routes>
    </div>
  );
};

export default App;
