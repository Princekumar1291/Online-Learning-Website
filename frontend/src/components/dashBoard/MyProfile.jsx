import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-gray-800 p-6 rounded-lg flex flex-wrap justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            <img src={user?.image || ""} alt="Profile" className="w-20 h-20 rounded-full border-2 border-gray-600" />
            <div>
              <p className="text-lg font-semibold">{user?.firstName +" " + user?.lastName || ""}</p>
              <p className="text-sm text-gray-400">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded flex items-center gap-2"
            onClick={() => navigate("/dashboard/setting")}
          >
            <Pencil size={16} /> Edit Profile
          </button>
        </div>

        {/* About Section */}
        <div className="bg-gray-800 p-6 rounded-lg mt-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">About</h2>
          </div>
          <p className="text-gray-400 mt-2">{user?.additionalDetails?.about || "Write something about yourself"}</p>
        </div>

        {/* Personal Details Section */}
        <div className="bg-gray-800 p-6 rounded-lg mt-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Personal Details</h2>
           </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400 mt-4">
            <p><span className="text-white font-semibold">First Name:</span> {user?.firstName || "N/A"}</p>
            <p><span className="text-white font-semibold">Last Name:</span> {user?.lastName || "N/A"}</p>
            <p><span className="text-white font-semibold">Email:</span> {user?.email || "N/A"}</p>
            <p><span className="text-white font-semibold">Phone:</span> {user?.additionalDetails?.contactNumber || "Add Contact Number"}</p>
            <p><span className="text-white font-semibold">Gender:</span> {user?.additionalDetails?.gender || "Add Gender"}</p>
            <p><span className="text-white font-semibold">Date of Birth:</span> {user?.additionalDetails?.dateOfBirth || "Add Date of Birth"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
