import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupImage from "../assets/Images/signup.webp";
import { sendOtpUrl, signUpUrl } from "../services/api";
import { apiConnector } from "../services/apiconnector";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    otp: "",
    accountType: role,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Handle OTP Send to Email
  const handleSendOtp = async() => {
    setOtpSent(false);
    setLoading(true);
    console.log({email:formData.email});
    const response = await apiConnector("POST", sendOtpUrl, {email:formData.email});
    setLoading(false);
    setOtpSent(true);
    toast.success("OTP send To Email");
    console.log("OTP sent to email",response.data);
  };

  // Handle Form Submission
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await apiConnector("POST", signUpUrl, formData);
      toast.success(response.data.message);
      navigate("/login");
      // console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data);
    }
  };

  return (
    <form action="" method="post" onSubmit={onsubmitHandler}>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden w-full max-w-5xl shadow-lg">
          {/* Left - Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">
              Join the millions learning to code with{" "}
              <span className="text-blue-400">CodeBoost</span> for free
            </h2>
            <p className="text-gray-400 mb-6">
              Build skills for today, tomorrow, and beyond.{" "}
              <span className="text-blue-400 italic">
                Education to future-proof your career.
              </span>
            </p>

            {/* Toggle Student / Instructor */}
            <div className="flex mb-6">
              <button type="button"
                className={`px-4 py-2 w-1/2 ${role === "Student"
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-700 text-gray-400"
                  } rounded-l-lg`}
                onClick={() => setRole("Student")}
              >
                Student
              </button>
              <button type="button"
                className={`px-4 py-2 w-1/2 ${role === "Instructor"
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-700 text-gray-400"
                  } rounded-r-lg`}
                onClick={() => setRole("Instructor")}
              >
                Instructor
              </button>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email & Send OTP */}
            <div className="mb-4 flex">
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-l-md focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={handleChange}
              />
              <button type="button"
                className="ml-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                onClick={handleSendOtp}
              >
                {loading ? "Sending..." :" Send OTP"}
              </button>
            </div>

            {/* OTP Input */}
            {otpSent && (
              <div className="mb-4">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP *"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Phone Input */}
            <div className="mb-4">
              <input
                type="tel"
                name="contactNumber"
                placeholder="Phone Number (Optional)"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="password"
                name="password"
                placeholder="Create Password *"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-400"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Signup Button */}
            <button className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-600">
              Create Account
            </button>
            {/* Redirect to Login Page */}
            <p className="text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Log in
              </Link>
            </p>
          </div>

          {/* Right - Image Section (Hidden on Mobile) */}
          <div className="hidden md:flex w-1/2 bg-gray-700 items-center justify-center p-6">
            <img src={SignupImage} alt="Signup" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
