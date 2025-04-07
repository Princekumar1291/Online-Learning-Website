import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Reset your password
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Have no fear. We'll email you instructions to reset your password. If
          you don’t have access to your email, we can try account recovery.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 rounded-md transition-transform transform hover:scale-105"
          >
            Reset Password
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center mt-4 text-gray-400 hover:text-white text-sm"
        >
          ← Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
