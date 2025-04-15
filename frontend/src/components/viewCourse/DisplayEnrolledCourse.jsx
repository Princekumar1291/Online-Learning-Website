import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const DisplayEnrolledCourse = () => {
  const {subSectionId,sectionId,courseId} = useParams();
  const [subSection, setVideoUrl] = useState(null);
  const {course} = useSelector((state) => state.viewCourse);
  
  useEffect(() => {
    if(courseId && sectionId && subSectionId) {
      const section = course?.courseContent?.find((section) => section._id === sectionId);
      const subSection = section?.subSection?.find((subSection) => subSection._id === subSectionId);
      setVideoUrl(subSection);
    }
    else {
      setVideoUrl(null);
    }
  },[courseId,sectionId,subSectionId]);



  return (
    <div className='p-6 text-white'>
      <h1 className='text-2xl font-bold mb-4'>{subSection?.title}</h1>
      <video controls src={subSection?.videoUrl} className="w-full h-auto"></video>
    </div>
  )
}

export default DisplayEnrolledCourse 