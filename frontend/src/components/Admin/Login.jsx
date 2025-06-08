import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BlogContext } from "../../context/AppContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate, setToken } = useContext(BlogContext);
  const sendingData = {
    email: email,
    password: password,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", sendingData);

      if (data.success) {
        toast.success(data.message);
        navigate("/admin");
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-full max-w-sm p-6 p-6 max-md:m-6 border border-primary/30
       shadow-xl shadow-primary/15 rounded-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              {" "}
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel{" "}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-3 w-full 
          sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="ml-2">
                Email :
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail((prev) => (prev = e.target.value))}
                className="
                   border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="ml-2">
                Password :
              </label>
              <input
                type="email"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword((prev) => (prev = e.target.value))}
                className="
      border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="rounded
               p-2 w-full 
               bg-primary text-white
                font-medium 
                cursor-pointer 
                transition-all
               hover:bg-primary/80 
               border border-gray-100"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
