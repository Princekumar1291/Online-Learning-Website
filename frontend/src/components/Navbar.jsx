import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarLinks } from "../data/navbar-links.js";
import logo from "../assets/Logo/logo.webp";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from "./auth/ProfileDropDown.jsx";
import { apiConnector } from "../services/apiconnector.js";
import { categoryUrl } from "../services/api.js"
import Dropdown from "../assets/Catalog.jsx";


const Navbar = () => {
  const [catalogOptions, setCatalogOptions] = useState([]);

  const { token } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.profile)
  const { cartItems } = useSelector(state => state.cart)

  const location = useLocation();

  const fetchCategories = async () => {
    try {
      const response = await apiConnector("GET", categoryUrl);
      console.log(response.data.category);
      const categories = response.data.category.map(category => ({
        title: category,
        path: `/catalog/${category}`
      }))
      setCatalogOptions(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-2xl px-6 py-3 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-x-4">
          <img src={logo} alt="logo" className="h-[50px] rounded-2xl" />
          <span className="font-bold text-2xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            CodeBoost
          </span>
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden md:flex gap-x-6 text-white z-10">
          {NavbarLinks.map((link) =>
            link.title === "Catalog" ? (
              <Dropdown key={link.title} link={link} catalogOptions={catalogOptions}></Dropdown>
            ) : (
              <Link
                key={link.title}
                to={link.path}
                className={`hover:text-blue-300 ${location.pathname === link.path ? "text-blue-400 font-bold" : ""
                  }`}
              >
                {link.title}
              </Link>
            )
          )}
        </div>

        {/* Auth Buttons (Desktop) */}
        {!token && <div className="hidden md:flex">
          <Link to="/signup">
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 me-2">
              SignUp
            </button>
          </Link>
          <Link to="/login">
            <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5">
              Login
            </button>
          </Link>
        </div>}
        {token &&
          <div className="flex gap-x-6 ">
            <Link to={"/dashboard/cart"} className="relative">
              <IoCartOutline className="text-white text-4xl" />
              <p className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{cartItems.length}</p>
            </Link>
            <ProfileDropDown />
          </div>
        }

      </div>
    </nav>
  );
};

export default Navbar;

