import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-8xl font-extrabold text-red-500 animate-bounce">404</h1>
      <p className="text-2xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-gray-400 mt-2">It might have been moved or deleted.</p>
      
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Back to Home
      </Link>

      <div className="mt-10">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="Error Illustration"
          className="w-80 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Error;
