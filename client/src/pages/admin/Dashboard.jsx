import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../Components/admin/BlogTableItem";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      console.log(data);
      data.success ? setDashboard(data.dashboardData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Blogs || Comments || Drafts SECTION  */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboard.blogs}</p>
            <p className="font-gray-600 font-light">Blogs</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboard.comments}</p>
            <p className="font-gray-600 font-light">Comments</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboard.drafts}</p>
            <p className="font-gray-600 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        {/* List Blog Heading  */}
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        {/* Blog List Table  */}
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl-px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  BLOG TITLE
                </th>
                <th scope="col" className="px-2 py-4  max-sm:hidden">
                  DATE
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  STATUS
                </th>
                <th scope="col" className="px-2 py-4">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
