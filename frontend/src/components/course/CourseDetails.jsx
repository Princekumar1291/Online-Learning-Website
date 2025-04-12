import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../services/apiconnector';
import { addToCartUrl, capturepaymentUrl, getCourseDetailsUrl, verifyPaymentUrl } from '../../services/api';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import razorPayImage from "../../assets/Logo/logo.webp"

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiConnector("GET", `${getCourseDetailsUrl}/${courseId}`);
        setCourse(response.data.course);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleAddToCart = async () => {
    try {
      toast.success("Added to cart!");
      await apiConnector("POST", addToCartUrl, { courseId }, { Authorization: `Bearer ${token}` });
      const response = await apiConnector("GET", `${getCourseDetailsUrl}/${courseId}`);
      dispatch(addToCart(response.data.course));
    } catch (err) {
      toast.error("Failed to add to cart.");
    }
  };


  // Payment integration

  const initPayment = async (data) => {
    console.log("data",data);
    const RAZORPAY_KEY="rzp_test_6WPaSqGryZoKkZ"

    const options = {
      key:RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "CodeBoost",
      description: "Thank You For Purchasing Course",
      order_id: data.id,
      image:razorPayImage,
      handler: async function (response) {
        try {
          const verifyResponse = await apiConnector("POST", verifyPaymentUrl, {...response,courses:data.notes.courses}, { Authorization: `Bearer ${token}` });
          console.log("verifyResponse",verifyResponse);
          toast.success("Course bought successfully!");
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      },
      theme: {
        color: "#3399cc",
      },
    }
    const rxp1=new window.Razorpay(options);
    rxp1.open();
  }
  
  const handleBuyNow = async () => {
    try {
      const orderResponse = await apiConnector("POST",capturepaymentUrl,{courses:[courseId]},{Authorization:`Bearer ${token}`});
      console.log("orderResponse",orderResponse);
       
      if(!orderResponse.data.success){
        toast.error("Order failed");
        throw new Error(orderResponse.data.message);
      }
      await initPayment(orderResponse.data.data);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (!course) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-gray-950 rounded-xl min-h-screen text-white px-6 py-12 md:px-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left - Details */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.courseName}</h1>
          <p className="text-gray-400 font-bold text-sm mb-2">MERN Stack by {course.instructor?.firstName} {course.instructor?.lastName}</p>
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            ★★★★★ <span className="text-white text-sm">({course.rating || 4} reviews)</span>
          </div>
          <p className="text-sm text-gray-500">Language: English</p>

          {/* Learn Box */}
          <div className="mt-8 bg-[#1e1e1e] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">What you'll learn</h2>
            <p className="text-gray-300 text-sm">{course.whatYouWillLearn}</p>
          </div>

          {/* Course Content */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Course Content</h2>
            {course.courseContent?.map((section, idx) => (
              <details key={idx} className="bg-[#1e1e1e] p-4 rounded-lg mb-4">
                <summary className="text-lg font-medium mb-2">{section.sectionName}</summary>
                <ul className="text-sm list-disc ml-6 text-gray-400">
                  {section.subSection?.map((sub, i) => (
                    <li key={i}>{sub.title}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        {/* Right - Sidebar */}
        <div className="w-full md:w-[320px] space-y-4">
          <img src={course.thumbnail} alt="Course Thumbnail" className="rounded-xl w-full" />
          <div className="bg-[#1e1e1e] p-5 rounded-xl shadow-lg">
            <p className="text-2xl font-bold mb-2">₹{course.price}</p>
            <button
              onClick={handleBuyNow}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg mb-2"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full border border-gray-500 hover:bg-gray-700 py-2 rounded-lg font-semibold"
            >
              Add to Cart
            </button>
            <p className="text-sm text-gray-400 mt-2">30-Day Money-Back Guarantee</p>

            {/* Course Includes */}
            <div className="mt-4">
              <h4 className="font-semibold mb-1">This Course Includes:</h4>
              <ul className="text-sm text-gray-300 list-disc ml-5">
                <li>Lifetime access</li>
                <li>Certificate of Completion</li>
                <li>Full HD videos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
