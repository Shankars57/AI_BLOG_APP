import React, { useContext, useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import Table from "../../components/Admin/Table";
import { BlogContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const ListBlog = () => {
  const [blog, setBlog] = useState([]);
  const { axios } = useContext(BlogContext);
  const fetchBlogs = async () => {
    try {
      setBlog(blog_data);
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlog(data.blogs);
      }
      else {
        toast.error(data.message)

      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [blog]);
  return (
    <div
      className="flex-1 pt-5 px-5 sm:pt-12 
  sm:pl-16 bg-blue-50/50"
    >
      <h1>All Blogs</h1>
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead
            className="text-xs 
          text-gray-600 text-left
           uppercase"
          >
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th
                scope="col"
                className="px-2 py-4
                 mx-sm:hidden"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-2 py-4
                 max-sm:hidden"
              >
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {blog.map((blog, index) => (
              <Table
                key={Math.random()}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
