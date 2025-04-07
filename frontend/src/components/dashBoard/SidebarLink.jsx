import React from 'react';
import * as icon from "react-icons/vsc";
import { Link, useLocation } from 'react-router-dom';

const SidebarLink = ({ link }) => {
  const location = useLocation();
  const IconComponent = icon[link.icon]; // Get the icon component based on the icon name
  return (
    <Link 
      to={link.path} 
      key={link.name} 
      className={`flex items-center gap-2 my-3 ${location.pathname === link.path ? 'bg-gray-200 text-gray-700 p-2 rounded-l-sm' : ''}`}
    >
      <IconComponent className='w-6 h-6' />
      <span>{link.name}</span>
    </Link>
  );
};

export default SidebarLink;
