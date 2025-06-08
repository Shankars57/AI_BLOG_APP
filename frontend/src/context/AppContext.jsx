import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const BlogContext = createContext();
const AppContext = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");

      if (data.success) {
        setBlogs(data.blogs);
        toast.success(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const context = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);
  return (
    <BlogContext.Provider value={context}>{children}</BlogContext.Provider>
  );
};

export default AppContext;
