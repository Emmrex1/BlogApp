import React, { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { toast } from "sonner";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/features/auth/AuthApi";
import UpdateUserModal from "@/pages/user/updateUserModal/updateUserModal";


const USERS_PER_PAGE = 5;

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { data, isLoading, isError, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  // Filter users by search, role, and status
  const filteredUsers =
    data?.users?.filter((user) => {
      const matchEmail = user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchRole = roleFilter === "all" || user.role === roleFilter;
      const matchStatus =
        statusFilter === "all" || user.status === statusFilter;
      return matchEmail && matchRole && matchStatus;
    }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        toast.success("User deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete user");
        console.error(error);
      }
    }
  };

  const handleRoleUpdate = () => {
    refetch();
  };

  useEffect(() => {
    // Reset to page 1 when filters or search change
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/2"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/4"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/4"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Edit</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => (
                <tr key={user._id} className="bg-white border-b">
                  <td className="px-6 py-4">
                    {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        user.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <MdModeEdit /> Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Update User Modal */}
      {showUpdateModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <UpdateUserModal
            user={selectedUser}
            onClose={() => setShowUpdateModal(false)}
            onRoleUpdate={() => {
              handleRoleUpdate();
              setShowUpdateModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
