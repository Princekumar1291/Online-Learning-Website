import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router';
import Home from './pages/Home';
import './App.css';
import LoginForm from './pages/Login';
import SignupPage from './pages/Signup';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
import MyProfile from './components/dashBoard/MyProfile';
import Dashboard from './pages/DashBoard';
import Setting from './components/dashBoard/Setting';
import EnrolledCourses from './components/dashBoard/EnrolledCourses';
import Cart from './components/cart/Cart';
import AddCourse from './components/dashBoard/addCourse/AddCourse';
import { useSelector } from 'react-redux';
import CreatedCourses from './components/course/CreatedCourses';
import LoggedOutRoute from './components/RouteProtection/LoggedOutRoute';
import Catalog from './pages/Catalog';
import Footer from './components/core/HomePage/Footer';
import CourseDetails from './components/course/CourseDetails';

function App() {
  const {userType} = useSelector(state => state.profile)
  return (
    <BrowserRouter>
      <div className='w-screen min-h-screen bg-gray-900 flex flex-col text-white'>
        <Navbar></Navbar>
        <div className='pt-5 w-[95%] md:w-[80%] mx-auto '>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoggedOutRoute><LoginForm /></LoggedOutRoute>} />
            <Route path='/signup' element={<LoggedOutRoute><SignupPage /></LoggedOutRoute>} />
            <Route path='/contact' element={<ContactUs />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/catalog/:category' element={<Catalog/>}></Route>
            <Route path='/course/:courseId' element={<CourseDetails/>}></Route>

            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard/my-profile' element={<MyProfile />}></Route>
              <Route path='/dashboard/setting' element={<Setting/>}></Route>
              <Route path='/dashboard/my-courses' element={userType === "Student" ? <EnrolledCourses/> : <CreatedCourses/>}></Route>
              <Route path='/dashboard/cart' element={<Cart/>}></Route>
              <Route path='/dashboard/add-course' element={<AddCourse/>}></Route>
              {/* <Route path='*' element={<Outlet />} /> */}
            </Route>

            <Route path='*' element={<Error />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
