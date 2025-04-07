import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

const YellowButton = ({ text }) => {
  return (
    <button
      className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-md hover:cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
    >
      <div className="flex items-center">
        <p>{text}</p>
        <FaArrowRight className="ml-2" />
      </div>
    </button>
  )
}

export default YellowButton
