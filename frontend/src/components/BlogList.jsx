import React, { useContext, useState, useMemo } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { BlogContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useContext(BlogContext);

  // 🔍 Combine search and category filter logic using useMemo
  const filteredBlogs = useMemo(() => {
    const searchTerm = input.toLowerCase().trim();
    return blogs.filter((blog) => {
      const matchesCategory = menu === "All" || blog.category === menu;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.category.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [blogs, input, menu]);

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 px-4 relative ${
                menu === item && "text-white pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards or Empty Message */}
      <div
        className={`${
          filteredBlogs.length > 0
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-16 xl:mx-40"
            : "flex justify-center w-full"
        }`}
      >
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <h1 className="mt-20 mb-20 text-center font-bold text-xl text-gray-600">
            No blog found for: <span className="text-primary">"{input}"</span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default BlogList;
