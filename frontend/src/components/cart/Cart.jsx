import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeCourse } from "../../store/slices/cartSlice";
import { apiConnector } from "../../services/apiconnector";
import { userCartDeleteUrl, userCartUrl } from "../../services/api";
import { setCart } from "../../store/slices/cartSlice";
const Cart = () => {

  const { cartItems } = useSelector(state => state.cart)
  const { token } = useSelector(state => state.auth)
  
  const dispatch = useDispatch()
  const totalCost = cartItems.reduce((total, course) => total + course.price, 0);

  const fetchCartItems = async () => {
    try {
      const response = await apiConnector("GET", userCartUrl, {}, { Authorization: `Bearer ${token}` });
      dispatch(setCart(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  console.log(cartItems)
  
  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteClick = (courseId) => {
    dispatch(removeCourse({courseId}));
    const response=apiConnector("DELETE",userCartDeleteUrl,{courseId}, { Authorization: `Bearer ${token}` });
  };

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen w-[80%]">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <p className="text-gray-400 mb-4">{cartItems.length} Courses in Wishlist</p>
      <div className="space-y-4">
        {cartItems.map((course, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
            <div className="gap-y-0.5 flex flex-col">
              <h2 className="text-lg font-semibold">{course.courseName}</h2>
              <p className="text-gray-400">{course.whatYouWillLearn}</p>
              <p className="text-yellow-400 font-bold">Rs. {course.price}</p>
            </div>
            <button onClick={() => handleDeleteClick(course._id)} className="text-red-500 hover:text-red-700">
              <FaTrash size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-gray-800 p-4 mt-6 rounded-lg">
        <p className="text-lg font-semibold">Total: <span className="text-yellow-400">Rs. {totalCost}</span></p>
        <button className="w-full bg-yellow-500 text-black py-2 mt-2 rounded-lg font-bold hover:bg-yellow-600" >Buy Now</button>
      </div>
    </div>
  );
};

export default Cart;

