import React from "react";
import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useState } from "react";
import { Search } from "lucide-react";
import { useFetchBlogsQuery } from "@/redux/features/blogs/BlogApi";
import { useGetCommentsQuery } from "@/redux/features/comments/commentApi";
import { useGetUsersQuery } from "@/redux/features/auth/AuthApi";
import BlogCharts from "../BlogCharts/BlogCharts";



const Dashboard = () => {
  const [query, setQuery] = useState({ search: "", categoty: "" });
  const { user } = useSelector((state) => state.auth);
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  //  console.log(blogs)
  const { data: comments = [] } = useGetCommentsQuery();
  // console.log(comments);
  const { data: usersData = {} } = useGetUsersQuery();
  // console.log(usersData); 

  const allUsers = usersData.users || [];
  const adminCounts =
    allUsers.filter((user) => user.role === "admin")?.length || 0;
  

  return (
    <>
      {isLoading && <div>Loadind....</div>}
      <div className="space-y-6">
        <div className="bg-bgPrimary p-5">
          <h1>Hi, {user?.username}!</h1>
          <p>Welcome to the admin dashboard</p>
          <p>
            Here you can manage your hotel's posts, manage rooms, and other
            administrative tasks.
          </p>
        </div>

        {/* cards grid */}
        <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
          <div className="bg-indigo-100 py-5 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FiUsers className="size-8 text-indigo-600" />
            <p>{allUsers.length} Users</p>
          </div>
          <div className="bg-red-100 py-5 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaBlog className="size-8 text-red-600" />
            <p>{blogs.length} Blogs</p>
          </div>
          <div className="bg-lime-100 py-5 w-full rounded-sm space-y-1 flex flex-col items-center">
            <RiAdminFill className="size-8 text-lime-600" />
            <p>
              {adminCounts} Admin {adminCounts !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-orange-100 py-5 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaRegComment className="size-8 text-orange-600" />
            <p>{comments.totalComment} Comments</p>
          </div>
        </div>
    
    {/* graph and chart */}
          <div className="pt-5 pb-5">
            <BlogCharts blogs={blogs}/>
          </div>
      </div>
    </>
  );
};

export default Dashboard;
