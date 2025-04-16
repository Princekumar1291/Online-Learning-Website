import React, { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiconnector";
import { instructorDashboardUrl } from "../../services/api";
import { useSelector } from "react-redux";

const InstructorDashboard = () => {
  const [instructorData, setInstructorData] = useState(null);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector(
          "GET",
          instructorDashboardUrl,
          {},
          { Authorization: `Bearer ${token}` }
        );
        setInstructorData(response.data.courseDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  // Calculate total earnings and enrolled students
  const totalEarnings = instructorData?.courses?.reduce((sum, course) => {
    return sum + (course.price * course.studentsEnrolled.length);
  }, 0) || 0;

  const totalEnrolled = instructorData?.courses?.reduce((sum, course) => {
    return sum + course.studentsEnrolled.length;
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6 w-[90%]">
      <h1 className="text-2xl font-bold">Hi {instructorData?.firstName} 👋</h1>
      <p className="text-sm text-gray-400">Let's start something new</p>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Visualization */}
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex justify-between mb-4">
            <button className="text-yellow-400 font-semibold">Students</button>
            <button className="text-gray-400">Income</button>
          </div>
          {/* Pie Chart Placeholder */}
          <div className="h-40 w-40 bg-blue-400 rounded-full mx-auto mb-4"></div>
          {/* Legend */}
          <div className="text-xs text-gray-300 space-y-1">
            {instructorData?.courses?.slice(0, 3).map((course, idx) => (
              <p key={idx}>
                <span 
                  className={`inline-block w-3 h-3 mr-2 ${
                    idx === 0 ? 'bg-cyan-400' : 
                    idx === 1 ? 'bg-purple-300' : 'bg-pink-400'
                  }`}
                ></span> 
                {course.courseName}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-800 rounded-xl p-4 space-y-2">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <p>Total Courses: <span className="font-bold">{instructorData?.courses?.length || 0}</span></p>
          <p>Total Students: <span className="font-bold">{totalEnrolled}</span></p>
          <p>Total Income: <span className="font-bold text-green-400">Rs. {totalEarnings}</span></p>
        </div>

        {/* Courses */}
        <div className="bg-gray-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Your Courses</h2>
          <div className="grid grid-cols-1 gap-4">
            {instructorData?.courses?.slice(0, 3).map((course, idx) => (
              <div key={idx} className="bg-gray-700 rounded-lg p-2 flex gap-4 items-center">
                <img 
                  src={course.thumbnail} 
                  alt={course.courseName} 
                  className="h-16 w-16 rounded object-cover" 
                />
                <div>
                  <h3 className="text-sm font-semibold">{course.courseName}</h3>
                  <p className="text-xs text-gray-400">
                    {course.studentsEnrolled.length} students • Rs. {course.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;