import React, { use, useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { getEnrolledCourseUrl } from "../../services/api";


const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([
    { name: "The Complete Python", duration: "2hr 30 mins", progress: 65 },
    { name: "The Complete Python", duration: "2hr 30 mins", progress: 20 },
    { name: "The Complete Python", duration: "2hr 30 mins", progress: 80 },
    { name: "The Complete Python", duration: "2hr 30 mins", progress: 100 },
  ]);

  const getEnrolledCourses = async () => {
    try {
      const response = await apiConnector("GET", getEnrolledCourseUrl, {}, { Authorization: `Bearer ${token}` });
      console.log("response", response);
      setEnrolledCourses(response.data.courses);
    } catch (error) {
      console.log("error in enrolled course fetching", error);
    }
  }

  useEffect(() => {
    // getEnrolledCourses();
  }, [])

  return (
    <div className="min-h-screen w-[80%] bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
      <div className="flex space-x-4 mb-4">
        {/* <button className="px-4 py-2 border rounded text-white">All</button>
        <button className="px-4 py-2 border rounded text-white">Pending</button>
        <button className="px-4 py-2 border rounded text-white">Completed</button> */}
      </div>
      {
        !enrolledCourses ? (
          <p className="text-gray-400 text-2xl pt-4">No enrolled courses found.</p>
        ) :
          <div className="space-y-4">
            {enrolledCourses.map((course, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <div className="mr-4">
                  <img src="https://res.cloudinary.com/du6squ4z0/image/upload/v1741923728/CodeBoost/coursesThumbnailImage/sikd2it8cisxp5g8ijln.jpg" alt="" className="w-16 h-16 rounded-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <p className="text-sm text-gray-400">{course.duration}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-2 bg-gray-600 rounded">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div>{course.progress}%</div>
                  <button className="p-2 text-white">
                    <FaEllipsisV className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
};

export default EnrolledCourses;
