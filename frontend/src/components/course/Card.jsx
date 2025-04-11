import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ course }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <img src={course.thumbnail} alt={course.courseName} className="w-full h-64 object-cover" />
      <h2 className="text-white text-lg font-bold">{course.courseName}</h2>
      <p className="text-sm text-gray-400">{course.courseDescription}</p>
      <p className="text-sm text-gray-400 font-bold">${course.price}</p>
      <p className="text-sm text-gray-400">{course.tags}</p>
      <p className="text-sm text-gray-400">{course.whatYouWillLearn}</p>
      <Link to={`/course/${course._id}`} className="text-blue-500 hover:underline">Learn More</Link>
    </div>
  )
}

export default Card

