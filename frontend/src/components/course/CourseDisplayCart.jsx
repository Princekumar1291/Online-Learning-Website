import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConformationModal from '../ConformationModal'
import { apiConnector } from '../../services/apiconnector'
import { deleteCourseUrl } from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, setCoursesid, setEditCourse } from '../../store/slices/createCourse'
import CourseInformationForm from '../dashBoard/addCourse/courseInfromation/CourseInformationForm'

const CourseDisplayCart = ({ item }) => {
  const [conformationModal, setConformationModal] = useState(false)
  const navigate = useNavigate()
  const {token} = useSelector(state=>state.auth)
  const {editCourse} = useSelector(state=>state.step)
  const dispatch = useDispatch();

  const handleRemove = async (id) => {
    try {
      console.log("id", id)
      const response = await apiConnector("DELETE", deleteCourseUrl, { id }, { Authorization: `Bearer ${token}` });
      console.log(response);
      setConformationModal(false);
      dispatch(deleteCourse(item._id));
    } catch (error) {
      console.log(error);
    }
  }
  const modalData = {
    text1: "Are you sure you want to delete this course?",
    text2: "This action cannot be undone.",
    button1Text: "Delete",
    button2Text: "Cancel",
    button1Action: () => {
      handleRemove(item._id);
    },
    button2Action: () => {
      setConformationModal(false)
    },
  }

  const handleOnEditClick = () => {
    dispatch(setEditCourse(true));
    dispatch(setCoursesid(item._id));
    console.log("id of course",item._id)
  }
  
  return (
    <div className="flex flex-row gap-2 p-4 border-2 border-gray-300 rounded-md  mx-auto my-4 ">
      <div className="flex flex-col gap-2 w-[80%]">
        <img src={item.thumbnail} alt={item.courseName} className="w-full h-[200px] object-cover" />
        <h2 className="text-lg font-bold">{item.courseName}</h2>
        <p className="text-sm">{item.courseDescription}</p>
        <p className="text-sm font-bold">${item.price}</p>
        <Link to={`/course/${item._id}`} className="text-blue-500 hover:underline">Learn More</Link>
      </div>
      <div className='flex flex-col gap-2'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnEditClick}>Edit</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
          setConformationModal(true);
        }}>Remove</button>
      </div>
      {conformationModal && <ConformationModal modalData={modalData} />}
    </div >
  )
}

export default CourseDisplayCart

