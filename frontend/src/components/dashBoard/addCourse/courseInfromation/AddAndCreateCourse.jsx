import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../../services/apiconnector';
import { createCourseSubSectionUrl } from '../../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setLectureInSubsection } from '../../../../store/slices/createCourse';

const AddAndCreateCourse = ({ setOpen, section }) => {
  const { token } = useSelector(state => state.auth);
  const { courseSubsection } = useSelector(state => state.step)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sectionId: `${section._id}`,
  });
  const [vedioFile, setVideoFile] = useState(null);

  const onFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    console.log("Updated courseSubsection", courseSubsection);
  }, [courseSubsection]);


  const dispatch = useDispatch();

  const handleOnFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append('sectionId', formData.sectionId);
      formDataToSend.append('vedioFile', vedioFile);

      const response = await apiConnector("POST", createCourseSubSectionUrl, formDataToSend, { Authorization: `Bearer ${token}`})


      const newSubsection = response.data.newSubsection;
      console.log("newSubsection", newSubsection);

      dispatch(setLectureInSubsection({ newSubsection, sectionId: section._id }));
      setOpen(false);

      toast(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 ">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] sm:w-[50%] text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Upload Lecture</h2>
        <form action="" method="post" onSubmit={handleOnFormSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block font-medium">Title</label>
            <input
              type="text"
              id="title"
              name='title'
              value={formData.title}
              onChange={onFormChange}
              className="w-full bg-gray-800 border border-gray-600 p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">Course Description</label>
            <textarea
              id="description"
              cols="30"
              rows="4"
              name='description'
              value={formData.description}
              onChange={onFormChange}
              className="w-full bg-gray-800 border border-gray-600 p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="vedioFile" className="block font-medium">Upload Video File</label>
            <input
              type="file"
              id="vedioFile"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="w-full bg-gray-800 border border-gray-600 p-2 rounded-lg cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className='flex flex-row gap-x-4'>
            <button type="button" className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition" onClick={() => { setOpen(false); console.log("Course Subsection", courseSubsection) }}>
              Cancle
            </button>
            <button type="submit" className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAndCreateCourse;
