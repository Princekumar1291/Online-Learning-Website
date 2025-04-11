import React, { useEffect, useState } from 'react';
import YellowButton from "../../../core/HomePage/YellowButton";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import NastedViewCreate from '../NastedViewCreate';
import { setCoursesid, setCoursesSection, setEditCourse, setStep } from '../../../../store/slices/createCourse';
import { apiConnector } from '../../../../services/apiconnector';
import { createCourseSectionUrl } from '../../../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CourseBuilderForm = () => {
  const [sectionName, setSectionName] = useState("");
  const { token } = useSelector(state => state.auth)
  const { courseId,editCourse,courseSubsection } = useSelector(state => state.step)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleCreateSection = async (event) => {
    event.preventDefault();
    try {
      const response = await apiConnector("POST", createCourseSectionUrl, { sectionName, courseId }, { Authorization: `Bearer ${token}` });
      console.log(response)

      dispatch(setCoursesSection(response.data.section))
      setSectionName('');

      console.log("handleCreateSection called");
    } catch (error) {
      console.log(error)
      toast(error.response.data.message)
    }
  };

  const handleOnButtonClick = () => {
    console.log("handleOnButtonClick called");
    navigate("/dashboard/my-courses");
    dispatch(setEditCourse(false));
    dispatch(setStep(1));
    dispatch(setCoursesid(null));
  };

  // useEffect(() => {
  //   console.log(courseSubsection)
  // }, [courseSubsection]);


  return (
    <div className='w-[70%] '>
      <form action="" method="post" onSubmit={handleCreateSection} className='bg-gray-800 p-4 my-4 rounded-sm'>
        <h2 className='text-2xl font-bold border-b-2 border-gray-600'>Course Builder</h2>
        <div className='flex flex-col gap-2 my-4'>
          <label htmlFor="sectionName">Section Name</label>
          <input
            type="text"
            name="sectionName"
            id="sectionName"
            value={sectionName}
            className='w-full border border-gray-300 rounded-md p-2'
            onChange={(e) => setSectionName(e.target.value)}
          />
        </div>
        <div className='realative  border-amber-200 border-1 p-2 my-2 rounded-sm w-[200px]'>
          <button type='submit'
            className='text-amber-200 font-bold relative'
          >Create Section
            <MdCreateNewFolder size={30} className='absolute -top-1 -right-15 text-white' />
          </button>
        </div>
      </form>
      <div>
        <NastedViewCreate />
      </div>
      <div onClick={handleOnButtonClick}>
        <YellowButton text={`${editCourse ? "Update Course" : "Create Course"}`} />
      </div>
    </div>
  );
};

export default CourseBuilderForm;
