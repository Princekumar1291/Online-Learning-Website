import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";


const Dropdown = ({ link, catalogOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("catalogOptions", catalogOptions);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="relative flex items-center text-white font-medium rounded-md transition-all duration-300">
        {link.title}
        <IoMdArrowDropdown className="text-2xl transition-transform duration-300 group-hover:rotate-180 relative top-0.5" />
      </button>


      <div
        className={`absolute left-0 mt-2 w-40 bg-gray-800 text-white border border-gray-700 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {catalogOptions.map((option) => (
          <Link
            key={option.title}
            to={option.path}
            className="block px-4 py-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close when clicking an option
          >
            {option.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
