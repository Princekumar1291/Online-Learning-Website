import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { profileUrl } from "../../services/api";
import { setUser } from "../../store/slices/profileSlice";
import {deleteToken} from "../../store/slices/authSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  //api call for user details
  const dispatch=useDispatch();
  const {token} = useSelector(state => state.auth)
  const profileDetails=async()=>{
    console.log("token",token);
    const response = await apiConnector("GET", profileUrl, {}, { Authorization: `Bearer ${token}` });
    dispatch(setUser(response.data.user));
    console.log(response.data.user);
  }
  useEffect(()=>{
    profileDetails();
  },[])

  const {user} = useSelector(state => state.profile)
  console.log("user",user);

  // Close dropdown when an option is clicked
  // const handleOptionClick = () => {
  //   setIsOpen(false);
  // };
  const handleDashboardClick = () => {
    setIsOpen(false);
  };
  const handleSignOutClick = () => {
    dispatch(deleteToken());
    toast.success("Logout Successfully");
    setIsOpen(false);
  };

  return (
    <div className="relative border rounded-full" ref={dropdownRef}>
      {/* Avatar Button */}
      <img
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full cursor-pointer"
        src={user ? user.image : ""}
        alt="User dropdown"
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">


          {/* Dashboard */}
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to="/dashboard/my-profile"
                onClick={handleDashboardClick}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          {/* Sign Out */}
          <div className="py-1">
            <Link
              to="/"
              onClick={handleSignOutClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
