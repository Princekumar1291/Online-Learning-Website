import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../../services/apiconnector';
import { addToCartUrl, getCourseDetailsUrl } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  const getCourseDetails = async () => {
    try {
      const response = await apiConnector("GET", `${getCourseDetailsUrl}/${courseId}`);
      setCourse(response.data.course);
    } catch (error) {
      console.error("Failed to fetch course details:", error);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [courseId]);

  const handleBuyNow = () => {
    alert("Redirecting to payment page...");
    // add navigation or payment logic here
  };

  const dispatch = useDispatch();
  const {token} = useSelector(state=>state.auth);
  const handleAddToCart = async () => {
    toast.success("Added to cart!");
    const response=await apiConnector("POST",addToCartUrl,{courseId},{Authorization:`Bearer ${token}`});
    console.log(response.data.data);
    // dispatch(addToCart(response.data.data));
    
    // add Redux or API call to handle cart logic
  };

  if (!course) return <div className="text-white p-10">Loading course details...</div>;

  return (
    <div className="text-white px-4 md:px-10 py-10 max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className="w-full md:w-1/3 h-auto rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">{course.courseName}</h1>
          <p className="text-gray-300 mb-4">{course.courseDescription}</p>

          <p className="mb-2"><span className="font-semibold text-white">Instructor:</span> {course.instructor?.firstName} {course.instructor?.lastName}</p>
          <p className="mb-2"><span className="font-semibold text-white">Price:</span> ₹{course.price}</p>
          <div className="mb-2">
            <span className="font-semibold text-white">Tags:</span>{" "}
            {
              course.tags.split(" ").map((tag, i) => (
                <span key={i} className="inline-block bg-blue-700 text-xs px-2 py-1 mr-2 rounded">
                  {tag.replace("#", "")}
                </span>
              ))
            }
          </div>
          <p className="mb-6"><span className="font-semibold text-white">What you'll learn:</span> {course.whatYouWillLearn}</p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div>
        <h2 className="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Course Content</h2>
        <ul className="space-y-3">
          {
            course.courseContent?.map((section, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded-xl">
                <h3 className="font-semibold text-lg">{section.sectionName}</h3>
                <ul className="ml-4 list-disc text-sm text-gray-300">
                  {
                    section.subSection?.map((sub, i) => (
                      <li key={i}>{sub.title}</li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
