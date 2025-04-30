import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { getEnrolledCourseUrl } from "../../services/api";
import { Link } from "react-router-dom";
import { setCourse } from "../../store/slices/viewCourseSlice";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  const dispatch = useDispatch();

  const getEnrolledCourses = async () => {
    try {
      const response = await apiConnector("GET", getEnrolledCourseUrl, {}, {
        Authorization: `Bearer ${token}`,
      });
      setEnrolledCourses(response.data.enrolledCourse || []);
    } catch (error) {
      console.error("Error in enrolled course fetching", error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const handleOnLinkClick = (course) => {
    dispatch(setCourse(course));
  };

  const tabOptions = ["All", "Pending", "Completed"];

  return (
    <div className="min-h-screen w-full md:w-[85%] mx-auto px-4 py-10 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Your Enrolled Courses</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full border transition-all duration-300 ${
              activeTab === tab
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white border-gray-600 hover:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {enrolledCourses.length === 0 ? (
        <div className="text-gray-400 text-xl pt-8 text-center">
          You haven't enrolled in any course yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course, index) => (
            <Link
              to={`/course/buy/${course._id}/${course.courseContent[0]._id}/${course.courseContent[0].subSection[0]._id}`}
              key={index}
              onClick={() => handleOnLinkClick(course)}
              className="group bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden"
            >
              <img
                src={course.thumbnail}
                alt="Course Thumbnail"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 group-hover:text-yellow-400">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-400">{course.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
