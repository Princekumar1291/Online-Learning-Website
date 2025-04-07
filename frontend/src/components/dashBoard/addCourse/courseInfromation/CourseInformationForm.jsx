import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../../services/apiconnector';
import { categoryUrl, createCourseUrl } from '../../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setCoursesid, setStep } from '../../../../store/slices/createCourse';

const CourseInformationForm = () => {
  const [catalogOptions, setCatalogOptions] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    whatYouWillLearn: '',
    tag: '',
    price: '',
    category: '',
    thumbnail: null
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiConnector('GET', categoryUrl);
        setCatalogOptions(response.data.category);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const response = await apiConnector("POST", createCourseUrl, formDataToSend, {
        Authorization: `Bearer ${token}`
      });
      toast.success(response.data.message);
      dispatch(setStep(2));
      dispatch(setCoursesid(response.data.newCourse._id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 w-[70%]'>
      <input
        type="text"
        name="courseName"
        value={formData.courseName}
        onChange={handleChange}
        placeholder='Course Name'
        className='w-full p-2 border rounded'
      />
      <textarea
        name="courseDescription"
        value={formData.courseDescription}
        onChange={handleChange}
        placeholder='Course Description'
        className='w-full p-2 border rounded'
      />
      <textarea
        name="whatYouWillLearn"
        value={formData.whatYouWillLearn}
        onChange={handleChange}
        placeholder='What You Will Learn'
        className='w-full p-2 border rounded'
      />
      <input
        type="text"
        name="tag"
        value={formData.tag}
        onChange={handleChange}
        placeholder='Tag'
        className='w-full p-2 border rounded'
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder='Price'
        className='w-full p-2 border rounded'
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className='w-full p-2 border rounded bg-gray-900 text-white'
      >
        <option value="">Select Category</option>
        {catalogOptions.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <input
        type="file"
        name="thumbnail"
        onChange={handleImageChange}
        className='w-full p-2 border rounded'
      />
      {/* Image Preview */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Thumbnail Preview"
          className="w-full max-h-[300px] object-cover rounded border"
        />
      )}
      <button type="submit" className='bg-yellow-500 text-white p-2 rounded'>
        Submit
      </button>
    </form>
  );
};

export default CourseInformationForm;
