import React, { useContext, useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import Table from "../../components/Admin/Table";
import { BlogContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const { axios } = useContext(BlogContext);
  const fetchDashboardData = async () => {
    setDashboardData(dashboard_data);
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <div className="flex-2 p-4 md:p-10 bg-blue-50/10">
      <div className="flex flex-wrap gap-4">
        <div
          className="
        flex 
        items-center
         gap-4 
         bg-white
          p-4 
         min-w-58
          rounded 
          shadow
           cursor-pointer
            hover:scale-105 
        transition-all"
        >
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>
        <div
          className="
        flex 
        items-center
         gap-4 
         bg-white
          p-4 
         min-w-58
          rounded 
          shadow
           cursor-pointer
            hover:scale-105 
        transition-all"
        >
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
        <div
          className="
        flex 
        items-center
         gap-4 
         bg-white
          p-4 
         min-w-58
          rounded 
          shadow
           cursor-pointer
            hover:scale-105 
        transition-all"
        >
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex text-gray-600 p-4 m-3 font-medium">
          <img src={assets.dashboard_icon_4} alt="" className="pr-4" />
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
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
              {dashboardData.recentBlogs.map((blog, index) => (
                <Table
                  key={Math.random()}
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
