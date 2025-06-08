import React, { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { BlogContext } from "../../context/AppContext.jsx";
const Navbar = () => {
  const { navigate, token } = useContext(BlogContext);
  const handleLogin = () => {
    navigate("/admin");
  };
  return (
    <div
      className="
    flex 
    justify-between 
    items-center 
    py-5 
    mx-3
     sm:mx-20
     xl:mx-32 "
    >
      <img
        src={assets.logo}
        alt=""
        className="
      w-32 
      sm:w-44
       cursor-pointer
       hover:scale-101
       transition
        ease-in-out
      "
        onClick={() => navigate("/")}
      />
      <button
        className="flex items-center gap-2
       bg-blue-500
        text-white px-4
        py-2
       rounded-full 
       text-sm
        hover:bg-blue-600 
        hover:-translate-y-1.5
        active:translate-y-0
         transition ease-out
          duration-300 cursor-pointer"
        onClick={handleLogin}
      >
        {token ? "Dashboard" : "Login"}{" "}
        <img src={assets.arrow} className="w-3" alt="login" />
      </button>
    </div>
  );
};

export default Navbar;
