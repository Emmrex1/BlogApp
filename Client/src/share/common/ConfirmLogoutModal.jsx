// src/components/common/ConfirmLogoutModal.jsx
import React from "react";
import { Dialog } from "@headlessui/react";

const ConfirmLogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Confirm Logout
          </Dialog.Title>
          <p className="mb-6 text-sm text-gray-600">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmLogoutModal;
