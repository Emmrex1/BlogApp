
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBlogs from "./searchblogs/SearchBlogs";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/BlogApi";
import { calculateReadingTime } from "../../../utils/readindTime/readingTime";


const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearch = () => {
    setQuery({ search, category });
  };

  return (
    <div className="mt-20 container mx-auto px-4">
      <SearchBlogs
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="h-48 bg-gray-300 rounded-lg" />
              <div className="h-4 bg-gray-300 w-3/4 rounded" />
              <div className="h-3 bg-gray-300 w-1/2 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-600 mt-12">{error.toString()}</div>
      )}

      {/* Blog Grid */}
      {!isLoading && blogs.length > 0 && (
        <div className="mt-12 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl duration-300"
            >
              <Link to={`/blogs/${blog._id}`}>
                <img
                  src={blog.coverImg}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {blog.description || "Click to read more..."}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="capitalize bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                      {blog.category || "General"}
                    </span>
                    <span>{calculateReadingTime(blog.content)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-16">
          No blogs found. Try adjusting your search.
        </div>
      )}
    </div>
  );
};

export default Blogs;
