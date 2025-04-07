import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const BlueButton = ({ text }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:cursor-pointer animate ease-in-out duration-300 shadow-md hover:shadow-lg hover:scale-105"
    >
      <div className="flex items-center">
        <p>{text}</p>
        <FaArrowRight className="ml-2" />
      </div>
    </button>
  )
}

export default BlueButton
