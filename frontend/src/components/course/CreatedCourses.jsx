import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiconnector';
import { getCreatedCourseUrl } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import CourseDisplayCart from './CourseDisplayCart';
import { setCourses } from '../../store/slices/createCourse';
import CourseInformationForm from '../dashBoard/addCourse/courseInfromation/CourseInformationForm';
import CourseBuilderForm from '../dashBoard/addCourse/courseInfromation/CourseBuilderForm';

const CreatedCourses = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const {course,editCourse,courseId,step} = useSelector((state)=>state.step)


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiConnector("GET", getCreatedCourseUrl, {}, { Authorization: `Bearer ${token}` });
      dispatch(setCourses(response.data.instructor.courses));
      console.log("courses", response.data.instructor.courses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error while fetching the created course", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }
  else if(course.length === 0){
    return <h1>No course found</h1>
  }
  if(editCourse && step === 1){
    return <CourseInformationForm/>
  }
  else if(editCourse && step === 2){
    return <CourseBuilderForm/>
  }
  return (
    <div className=' w-[90%]'>
      {
        course.map((item) => (
          <CourseDisplayCart key={item._id} item={item}/>
        ))
      }
    </div>
  )
}

export default CreatedCourses
