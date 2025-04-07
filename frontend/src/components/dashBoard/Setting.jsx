import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiconnector";
import { updateadditionaldetailsUrl, updatepasswordUrl, updateprofilepictureUrl } from "../../services/api";
import toast from "react-hot-toast";
import { setUser } from "../../store/slices/profileSlice";

const Setting = () => {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate(); //profilePicture
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateOfBirth: user?.additionalDetails?.dateOfBirth,
    gender: user?.additionalDetails?.gender,
    contactNumber: user?.additionalDetails?.contactNumber,
    about: user?.additionalDetails?.about,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleOnDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      dispatch(setUser(user));
      await apiConnector("PUT", updateadditionaldetailsUrl, formData, { Authorization: `Bearer ${token}` });
      toast.success("Details Updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  const handleOnPictureSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("profilePicture", profilePicture);

      // Debug: Log FormData content
      // console.log("FormData Content:", formData.get("profilePicture"));
      setIsLoading(true);
      const response = await apiConnector("POST", updateprofilepictureUrl, formData, { Authorization: `Bearer ${token}` });
      console.log("response", response);

      dispatch(setUser(response.data.user));

      // console.log("Upload Response:", response); // Debug full response
      setIsLoading(false);
      toast.success("Profile Picture Updated Successfully");
    } catch (error) {
      console.error("Upload Error:", error); // Log full error
      toast.error(error.response.data.message);
    }
  }

  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange=(e)=>{
    setPasswordUpdate({
      ...passwordUpdate,
      [e.target.name]: e.target.value
    })
  }

  const handleOnPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("passwordUpdate", passwordUpdate);
      const response = await apiConnector("POST", updatepasswordUrl, passwordUpdate, { Authorization: `Bearer ${token}` });
      setPasswordUpdate({ oldPassword: "", newPassword: "", confirmPassword: "" });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        {/* Profile Picture Upload */}
        <form method="post" onSubmit={handleOnPictureSubmit} encType="multipart/form-data" className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
          <div className="w-16 h-16 flex items-center justify-center text-lg font-semibold rounded-full bg-red-500 text-white">
            <img src={user?.image} alt="Profile" className="w-full h-full rounded-full" />
          </div>
          <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} name="profilePicture" />
          <label htmlFor="fileInput" className="bg-gray-600 px-4 py-2 rounded-md cursor-pointer">{!profilePicture ? "Select" : "Selected"}</label>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-md">{isLoading ? "Uploading..." : "Upload"}</button>
        </form>

        {/* Profile Form */}
        <form method="post" onSubmit={handleOnDetailsSubmit} className="bg-gray-700 p-4 mt-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded-md text-white" />
            </div>
            <div>
              <label className="text-sm">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded-md text-white" />
            </div>
            <div>
              <label className="text-sm">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded-md text-white" />
            </div>
            <div>
              <label className="text-sm">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded-md text-white">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Contact Number</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded-md text-white" placeholder="Enter Contact Number" />
            </div>
            <div>
              <label className="text-sm">About</label>
              <input type="text" name="about" value={formData.about} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded-md text-white" placeholder="Enter Bio Details" />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-600 px-4 py-2 rounded-md">Cancel</button>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-md">Save</button>
          </div>
        </form>

        {/* change password  */}
        <form method="post" onSubmit={handleOnPasswordSubmit} className="bg-gray-700 p-4 mt-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Current Password</label>
              <input type="password" value={passwordUpdate.oldPassword} name="oldPassword" className="w-full p-2 bg-gray-800 rounded-md text-white" onChange={handlePasswordChange}/>
            </div>
            <div>
              <label className="text-sm">New Password</label>
              <input type="password" name="newPassword" value={passwordUpdate.newPassword} className="w-full p-2 bg-gray-800 rounded-md text-white" onChange={handlePasswordChange}/>
            </div>
            <div>
              <label className="text-sm">Confirm Password</label>
              <input type="password" name="confirmPassword" value={passwordUpdate.confirmPassword} className="w-full p-2 bg-gray-800 rounded-md text-white" onChange={handlePasswordChange}/>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-600 px-4 py-2 rounded-md">Cancel</button>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-md">Save</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Setting;
