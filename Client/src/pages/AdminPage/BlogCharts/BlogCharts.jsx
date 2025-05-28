import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "@/utils/formatedate/FormateDate";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatData = (blogs) => {
  return blogs.map((blog) => ({
    name: formatDate(blog.createdAt),
    post: blog.title.length,
    pageViews: blog.pageViews || 0,
    amount: blog.amt || 0,
  }));
};

const BlogsChart = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-6 bg-bgPrimary rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Blogs Chart</h2>
        <p className="text-gray-500">No blog data available to display.</p>
      </div>
    );
  }

  const data = formatData(blogs);

  return (
    <div className="p-6 bg-bgPrimary rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Blogs Chart</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="post"
              stroke="#4f46e5"
              fill="#c7d2fe"
              name="Title Length"
            />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke="#10b981"
              fill="#d1fae5"
              name="Page Views"
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#f59e0b"
              fill="#fef3c7"
              name="Amount"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

BlogsChart.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      pageViews: PropTypes.number,
      amt: PropTypes.number,
    })
  ).isRequired,
};

export default BlogsChart;
