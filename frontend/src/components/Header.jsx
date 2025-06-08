import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { BlogContext } from "../context/AppContext";
import axios from "axios";

const Header = () => {
  const { setInput, input } = useContext(BlogContext);
  const inputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };
  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div
          className="inline-flex item-center
         justify-center gap-4 px-6 py-1.5
          mb-4 border 
        border-primary/10 
        rounded-full  text-sm 
        bg-primary/10 "
        >
          <p className="text-blue-500">New : AI feature Integrated</p>
          <img src={assets.star_icon} alt="icon" className="w-2.5 " />
        </div>
        <h1 className="text-2xl sm:text-5xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary"> blogging</span>
          <br /> platform.{" "}
        </h1>
        <p
          className="my-6 
        sm:my-8 
        max-w-2xl
         m-auto 
        max-sm:text-xs 
        text-gray-500"
        >
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between px-2  gap-2
         max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded
          overflow-hidden"
        >
          <input
            type="text
          "
            ref={inputRef}
            placeholder="search your blog  here.."
            name="search"
            className="w-full pl-4 outline-none "
            required
          />
          <button
            type="submit"
            className="bg-primary
           text-white px-8 py-2
            m-1.5
             rounded
             hover:scale-105 
             transition-all
          cursor-pointer"
          >
            search
          </button>
        </form>
      </div>
      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer "
          >
            Clear Search
          </button>
        )}
      </div>
      <img
        src={assets.gradientBackground}
        alt="gd"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
