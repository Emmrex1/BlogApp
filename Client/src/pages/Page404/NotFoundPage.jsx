// src/components/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <svg
          className="mx-auto mb-8 w-48 h-48 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
