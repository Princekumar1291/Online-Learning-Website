// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { apiConnector } from '../../services/apiconnector';
// import { getCourseDetailsUrl } from '../../services/api';

// const VideoDetailsSidebar = () => {
//   const { token } = useSelector(state => state.auth);
//   const [course, setCourse] = useState({});
//   const { courseId, sectionId, subSectionId } = useParams();

//   const findCourseById = async (id) => {
//     try {
//       const courseResponse = await apiConnector(
//         "GET",
//         `${getCourseDetailsUrl}/${id}`,
//         {},
//         { Authorization: `Bearer ${token}` }
//       );
//       setCourse(courseResponse.data.course);
//       console.log("courseResponse", courseResponse.data.course);
//     } catch (error) {
//       console.error("Failed to fetch course", error);
//     }
//   };

//   useEffect(() => {
//     findCourseById(courseId);
//   }, []);

//   return (
//     <div className='w-full  bg-gray-900 text-white p-4 min-h-screen border-r overflow-y-auto'>
//       <h2 className="text-2xl font-bold mb-6 border-b pb-2">{course?.courseName}</h2>
      
//       <div className="space-y-4">
//         {course?.courseContent?.map((section, index) => (
//           <details key={index} className="bg-gray-800 rounded-lg p-2 group open:shadow-lg">
//             <summary className="cursor-pointer font-semibold text-yellow-400">
//               {section.sectionName} 
//             </summary>
//             <div className="mt-2 ml-4 space-y-1 flex flex-col">
//               {section?.subSection?.map((sub) => (
//                 <Link to={`/course/buy/${courseId}/${section._id}/${sub._id}`}
//                   key={sub._id}
//                   className="text-sm text-gray-300 hover:text-yellow-300 cursor-pointer border-b border-gray-700 pb-1"
//                 >
//                   {sub.title} <span className="text-gray-500 text-xs">{sub.timeDuration}</span>
//                 </Link>
//               ))}
//             </div>
//           </details>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VideoDetailsSidebar;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { apiConnector } from '../../services/apiconnector';
import { getCourseDetailsUrl } from '../../services/api';
import { FaPlayCircle } from 'react-icons/fa';

const VideoDetailsSidebar = () => {
  const { token } = useSelector(state => state.auth);
  const [course, setCourse] = useState({});
  const { courseId, sectionId, subSectionId } = useParams();

  const findCourseById = async (id) => {
    try {
      const courseResponse = await apiConnector(
        "GET",
        `${getCourseDetailsUrl}/${id}`,
        {},
        { Authorization: `Bearer ${token}` }
      );
      setCourse(courseResponse.data.course);
    } catch (error) {
      console.error("Failed to fetch course", error);
    }
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-4 border-r border-gray-800 overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold text-yellow-400 border-b border-gray-700 pb-4 mb-6">
        {course?.courseName || 'Loading Course...'}
      </h2>

      <div className="space-y-4">
        {course?.courseContent?.map((section, index) => (
          <details
            key={index}
            open={section._id === sectionId}
            className="group transition-all duration-300 border border-gray-700 rounded-lg overflow-hidden"
          >
            <summary className="cursor-pointer px-4 py-3 bg-gray-800 text-yellow-300 font-medium hover:bg-gray-700 transition-all">
              {section.sectionName}
            </summary>

            <div className="px-4 py-2 bg-gray-850 space-y-2">
              {section?.subSection?.map((sub) => (
                <Link
                  to={`/course/buy/${courseId}/${section._id}/${sub._id}`}
                  key={sub._id}
                  className={`flex items-center gap-2 text-sm p-2 rounded-md transition-all ${
                    sub._id === subSectionId
                      ? 'bg-yellow-500 text-black font-semibold'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                  }`}
                >
                  <FaPlayCircle className="text-md" />
                  <div className="flex justify-between w-full">
                    <span>{sub.title}</span>
                    <span className="text-xs text-gray-400">{sub.timeDuration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
