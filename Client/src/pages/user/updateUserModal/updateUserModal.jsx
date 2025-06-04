import { useState } from "react";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/redux/features/auth/AuthApi";

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user?.role || "user");
  const [status, setStatus] = useState(user?.status || "active");
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdate = async () => {
    try {
      await updateUser({ userId: user._id, role, status }).unwrap();
      toast.success("User updated successfully");
      onRoleUpdate();
      onClose();
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Update user error", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          value={user?.email}
          readOnly
          className="mt-1 w-full bg-gray-100 block shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 w-full bg-white shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 w-full bg-white shadow-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default UpdateUserModal;
