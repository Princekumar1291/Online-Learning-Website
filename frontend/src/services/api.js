// const BASE_URL = "http://localhost:3000/api/v1";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const categoryUrl = `${BASE_URL}/course/showAllCategory`;
export const loginUrl=`${BASE_URL}/auth/login`;
export const signUpUrl=`${BASE_URL}/auth/signup`;
export const sendOtpUrl=`${BASE_URL}/auth/sendotp`;
export const profileUrl=`${BASE_URL}/profile/getuserdetails`;
export const updateadditionaldetailsUrl=`${BASE_URL}/profile/updateadditionaldetails`;
export const updateprofilepictureUrl=`${BASE_URL}/profile/updateprofilepicture`;
export const updatepasswordUrl=`${BASE_URL}/auth/updatepassword`;
export const getEnrolledCourseUrl=`${BASE_URL}/course/getEnrolledCourse`;
export const userCartUrl=`${BASE_URL}/course/getUserCart`;
export const addToCartUrl=`${BASE_URL}/course/addToCart`;
export const userCartDeleteUrl=`${BASE_URL}/course/deleteUserCart`;
export const createCourseUrl=`${BASE_URL}/course/createcourse`
export const createCourseSectionUrl=`${BASE_URL}/course/createCourseSection`

export const createCourseSubSectionUrl=`${BASE_URL}/course/createCourseSubSection`

export const getCreatedCourseUrl=`${BASE_URL}/course/getCreatedCourse`;

export const deleteCourseUrl=`${BASE_URL}/course/deleteCourse`;

export const getCourseDetailsUrl=`${BASE_URL}/course/getCourseDetails`;

export const updateCourseUrl=`${BASE_URL}/course/updateCourse`;

export const getCategoryDetailsUrl=`${BASE_URL}/course/getCategoryDetails`;

export const capturepaymentUrl=`${BASE_URL}/payment/capturepayment`;
export const verifyPaymentUrl=`${BASE_URL}/payment/verifyPayment`;

