import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { getEnrolledCourseUrl } from "../../services/api";
import { Link } from "react-router-dom";
import { setCourse } from "../../store/slices/viewCourseSlice";


const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  const getEnrolledCourses = async () => {
    try {
      const response = await apiConnector("GET", getEnrolledCourseUrl, {}, { Authorization: `Bearer ${token}` });
      console.log("response", response);
      setEnrolledCourses(response.data.enrolledCourse);
    } catch (error) {
      console.log("error in enrolled course fetching", error);
    }
  }

  useEffect(() => {
    getEnrolledCourses();
  }, [])

  const dispatch=useDispatch();

  const handleOnLinkClick = (course) => {
    console.log("course->", course);
    dispatch(setCourse(course));
  }

  return (
    <div className="min-h-screen w-[80%] bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 border rounded text-white hover:bg-gray-700 transition-all duration-300">All</button>
        <button className="px-4 py-2 border rounded text-white hover:bg-gray-700 transition-all duration-300">Pending</button>
        <button className="px-4 py-2 border rounded text-white hover:bg-gray-700 transition-all duration-300">Completed</button>
      </div>
      {
        !enrolledCourses ? (
          <p className="text-gray-400 text-2xl pt-4">No enrolled courses found.</p>
        ) :
          <div className="space-y-4">
            {enrolledCourses.map((course, index) => (
              <Link
                to={`/course/buy/${course._id}/${course.courseContent[0]._id}/${course.courseContent[0].subSection[0]._id}`}
                key={index}
                className="p-4 cursor-pointer bg-gray-800 rounded-lg flex justify-between items-center"
                onClick={() => handleOnLinkClick(course)}
              >
                <div className="mr-4">
                  <img src={course.thumbnail} alt="" className="w-16 h-16 rounded-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{course.courseName}</h3>
                  <p className="text-sm text-gray-400">{course.duration}</p>
                </div>
                <div className="flex items-center space-x-4 ">

                </div>
              </Link>
            ))}
          </div>
      }
    </div>
  );
};

export default EnrolledCourses;
