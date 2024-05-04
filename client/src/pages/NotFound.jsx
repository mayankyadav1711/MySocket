import React from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 min-h-screen flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <ErrorIcon className="text-9xl animate-bounce" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h3 className="text-3xl font-semibold mb-6">Page Not Found</h3>
        <p className="text-lg mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition duration-300 ease-in-out"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
