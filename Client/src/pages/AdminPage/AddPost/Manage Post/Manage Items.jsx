import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { toast } from "sonner";
import {
  useDeleteBlogMutation,
  useFetchBlogsQuery,
} from "@/redux/features/blogs/BlogApi";
import { formatDate } from "@/utils/formatedate/FormateDate";

const ManageItems = () => {
  const [query] = useState({ search: "", category: "" });
  const { data: blogs = [], isLoading, isError } = useFetchBlogsQuery(query);
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const confirmDelete = (id) => {
    setSelectedBlogId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBlog(selectedBlogId).unwrap();
      toast.success("Blog deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete blog");
    } finally {
      setIsModalOpen(false);
      setSelectedBlogId(null);
    }
  };

  if (isLoading) return <div>Loading blogs...</div>;
  if (isError) return <div>Error fetching blogs.</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="font-semibold text-base text-blueGray-700 px-6 py-3">
        All blogs
      </h1>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">No.</th>
            <th className="px-6 py-3">Blog Name</th>
            <th className="px-6 py-3">Publishing Date</th>
            <th className="px-6 py-3">Edit</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id} className="bg-white border-b">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{blog.title}</td>
              <td className="px-6 py-4">{formatDate(blog.createdAt)}</td>
              <td className="px-6 py-4">
                <Link
                  to={`/dashboard/update-items/${blog._id}`}
                  className="text-blue-600 hover:underline"
                >
                  <MdModeEdit className="inline" /> Edit
                </Link>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => confirmDelete(blog._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this blog?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting && (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                    />
                  </svg>
                )}
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
