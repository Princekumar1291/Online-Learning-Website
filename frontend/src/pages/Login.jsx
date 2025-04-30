// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import LoginImage from "../assets/Images/login.webp"
// import { apiConnector } from "../services/apiconnector";
// import { loginUrl } from "../services/api";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setToken } from "../store/slices/authSlice";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await apiConnector("POST", loginUrl, { email, password });
//       dispatch(setToken(response.data.user.token));
//       toast.success(response.data.message);
//       navigate("/");
//       console.log(response.data);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       // console.log(error.response.data);
//     }
//   };

//   return (
//     <form action="" method="post" onSubmit={onSubmitHandler}>
//       <div className="flex items-center justify-center h-screen bg-gray-900 text-white px-4">
//         <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden w-full max-w-5xl shadow-lg">
//           {/* Left - Form Section */}
//           <div className="w-full md:w-1/2 p-8">
//             <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
//             <p className="text-gray-400 mb-6">
//               Build skills for today, tomorrow, and beyond.{" "}
//               <span className="text-blue-400 italic">
//                 Education to future-proof your career.
//               </span>
//             </p>


//             {/* Email Input */}
//             <div className="mb-4">
//               <label className="block text-sm mb-1">Email Address *</label>
//               <input
//                 type="email"
//                 placeholder="Enter email address"
//                 className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* Password Input */}
//             <div className="mb-4 relative">
//               <label className="block text-sm mb-1">Password *</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Password"
//                 className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button type="button"
//                 className="absolute right-3 top-9 text-gray-400 hover:text-white"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>

//             {/* Forgot Password & Sign-in */}
//             <div className="flex justify-between text-sm text-blue-400 mb-4">
//               <Link to="/forgot-password">Forgot password?</Link>
//             </div>

//             <button className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-600">
//               Sign in
//             </button>
//             {/* Redirect to Login Page */}
//             <p className="text-gray-400 mt-4">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-blue-400 underline">
//                 Sign up
//               </Link>
//             </p>
//           </div>

//           {/* Right - Image Section (Hidden on Mobile) */}
//           <div className="hidden md:flex w-1/2 bg-gray-700 items-center justify-center p-6">
//             <img
//               src={LoginImage}
//               alt="Student Learning"
//               className="rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;












import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../assets/Images/login.webp";
import { apiConnector } from "../services/apiconnector";
import { loginUrl } from "../services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiConnector("POST", loginUrl, { email, password });
      dispatch(setToken(response.data.user.token));
      toast.success(response.data.message);
      navigate("/");
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="" method="post" onSubmit={onSubmitHandler}>
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white px-4">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden w-full max-w-5xl shadow-lg">
          {/* Left - Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-400 mb-6">
              Build skills for today, tomorrow, and beyond.{" "}
              <span className="text-blue-400 italic">
                Education to future-proof your career.
              </span>
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Email Address *</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <label className="block text-sm mb-1">Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Forgot Password & Sign-in */}
            <div className="flex justify-between text-sm text-blue-400 mb-4">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-600 transition duration-200 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Redirect to Login Page */}
            <p className="text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Right - Image Section (Hidden on Mobile) */}
          <div className="hidden md:flex w-1/2 bg-gray-700 items-center justify-center p-6">
            <img
              src={LoginImage}
              alt="Student Learning"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
