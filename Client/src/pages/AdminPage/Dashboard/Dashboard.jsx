import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useFetchBlogsQuery } from "@/redux/features/blogs/BlogApi";
import { useGetCommentsQuery } from "@/redux/features/comments/CommentApi";
import { useGetUsersQuery } from "@/redux/features/auth/AuthApi";
import BlogCharts from "../BlogCharts/BlogCharts";

const Dashboard = () => {
  const [query] = useState({ search: "", categoty: "" });
  const { user } = useSelector((state) => state.auth);

  const { data: blogs = [], isLoading } = useFetchBlogsQuery(query);
  const { data: comments = {} } = useGetCommentsQuery();
  const { data: usersData = {} } = useGetUsersQuery();

  const allUsers = usersData.users || [];
  const adminCounts =
    allUsers.filter((user) => user.role === "admin")?.length || 0;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="text-gray-700 font-semibold">Dashboard</span> /
        Overview
      </div>

      {/* Welcome message */}
      <div className="bg-gray-100 p-6 rounded-md shadow-sm">
        <h1 className="text-2xl font-bold mb-1">Hi, {user?.username} 👋</h1>
        <p className="text-gray-600">
          Welcome back to your admin dashboard. Use the tools below to manage
          blogs, users, and comments efficiently.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <FiUsers className="text-indigo-600 text-3xl mb-3" />
          <h2 className="text-lg font-bold">{allUsers.length}</h2>
          <p className="text-gray-500 text-sm">Total Users</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <FaBlog className="text-red-500 text-3xl mb-3" />
          <h2 className="text-lg font-bold">{blogs.length}</h2>
          <p className="text-gray-500 text-sm">Total Blogs</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <RiAdminFill className="text-green-600 text-3xl mb-3" />
          <h2 className="text-lg font-bold">{adminCounts}</h2>
          <p className="text-gray-500 text-sm">Admins</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <FaRegComment className="text-orange-500 text-3xl mb-3" />
          <h2 className="text-lg font-bold">{comments.totalComment || 0}</h2>
          <p className="text-gray-500 text-sm">Comments</p>
        </div>
      </div>

      {/* Blog chart section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Blog Analytics
        </h3>
        <BlogCharts blogs={blogs} />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-gray-600">
          Loading dashboard data...
        </div>
      )}
    </div>
  );
};

export default Dashboard;
