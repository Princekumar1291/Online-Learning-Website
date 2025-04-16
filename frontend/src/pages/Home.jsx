import React from "react";
import { Link } from "react-router";
import Highlight from "../components/core/HomePage/Highlight";
import YellowButton from "../components/core/HomePage/YellowButton";
import BlueButton from "../components/core/HomePage/BlueButton";
import bannerVideo from "../assets/Images/banner.mp4";
import TimelineImage from "../assets/Images/TimelineImage.png";
import { TypeAnimation } from "react-type-animation";
import TimeLine from "../components/core/HomePage/TimeLine";
import myImage from "../assets/Images/myImage.jpg";
import myImage2 from "../assets/Images/myImage2.jpg";
import instructor from "../assets/Images/Instructor.png";
import { useEffect, useState } from "react";
import Footer from "../components/core/HomePage/Footer";
import SkillsSection from "../components/core/HomePage/SkillsSection";
import { apiConnector } from "../services/apiconnector";
import { userCartUrl } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store/slices/cartSlice";

const Home = () => {

  //cart data loading 
  const dispatch=useDispatch();
  
  const {token}=useSelector(state=>state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const fetchCartItems = async () => {
      try {
        const response = await apiConnector("GET", userCartUrl, {}, { Authorization: `Bearer ${token}` });
        dispatch(setCart(response.data.data));
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
      
    useEffect(() => {
      if(token){
        fetchCartItems();
      }
      console.log("cartItems",cartItems)
    }, []);

  
  
  
  
  
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) =>
        prev >= comments.length * 100 ? 0 : prev + 1
      );
    }, 50); // Adjust speed here

    return () => clearInterval(interval);
  }, []);

  const comments = [
    { name: "John Doe", text: "Great service! Highly recommend.", rating: 5 },
    {
      name: "Alice Smith",
      text: "Good experience, but could be better.",
      rating: 4,
    },
    {
      name: "Michael Lee",
      text: "Not satisfied with the response time.",
      rating: 3,
    },
    {
      name: "Emma Wilson",
      text: "Amazing platform! Will use again.",
      rating: 5,
    },
    {
      name: "David Brown",
      text: "Service was okay, expected more.",
      rating: 3,
    },
    { name: "Sophia Green", text: "Very helpful and friendly!", rating: 5 },
    { name: "James White", text: "Decent experience overall.", rating: 4 },
    { name: "Olivia Martinez", text: "Support team was great!", rating: 5 },
    { name: "Ethan Hall", text: "Fast response, good work.", rating: 4 },
    { name: "Ava King", text: "Will recommend to friends.", rating: 5 },
    { name: "Liam Scott", text: "Could be improved a bit.", rating: 3 },
    { name: "Mia Adams", text: "Exceptional service!", rating: 5 },
    { name: "Noah Evans", text: "Satisfied with the support.", rating: 4 },
    { name: "Isabella Allen", text: "Good customer care.", rating: 4 },
    { name: "William Young", text: "Quick and reliable!", rating: 5 },
    { name: "Emily Harris", text: "Great UI, loved it.", rating: 5 },
    { name: "Benjamin Walker", text: "Professional service.", rating: 4 },
    { name: "Charlotte Nelson", text: "Impressive work!", rating: 5 },
    { name: "Henry Carter", text: "Needs a little polishing.", rating: 3 },
    { name: "Amelia Roberts", text: "Superb support!", rating: 5 },
  ];
  return (
    <div className="w-full">
      {/* section 1  */}
      <div className="flex flex-col items-center justify-center">
        <Link to="/signup">
          <BlueButton text={"Become an Instructor"}></BlueButton>
        </Link>
        <div className="text-3xl font-bold mt-4 text-center">
          Empower Your Future with
          <Highlight text={"Coding Skills"} />
        </div>
        <div className="mt-4 text-center max-w-md mx-auto  text-gray-500">
          Kickstart your tech career with expert-led coding lessons—learn,
          build, and get hired!
        </div>
        <div className="flex items-center justify-center mt-4 gap-4">
          <BlueButton text={"Learn More"}></BlueButton>
          <YellowButton text={"Book a Demo"}></YellowButton>
        </div>
        <div className="w-full flex justify-center mt-6 shadow-lg " md:px-0>
          <video
            src={bannerVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-screen-xl h-auto sm:h-72 md:h-96 lg:h-auto rounded-lg shadow-2xl shadow-gray-800/50 drop-shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* section 2  */}
      <div className="flex flex-col lg:flex-row items-start justify-evenly md:gap-y-4 gap-y-8 md:mt-8 mt-4 shadow-lg">
        <div className="w-full lg:w-[45%] p-2 md:p-6 rounded-lg shadow-lg min-h-[350px] ">
          <div className="text-3xl font-bold text-center">
            Unloack your coding potential with our
            <Highlight text={"Online Courses"} />
          </div>
          <div className="mt-4 text-center max-w-md mx-auto  text-gray-500">
            Discover your potential with our expert-led coding courses—unlock
            skills, build projects, and achieve your career goals in the tech
            industry! Learn from professionals, engage in hands-on exercises,
            and turn your passion for coding into a successful career. Join us
            today and start your journey to success!
          </div>
          <div className="flex items-center justify-center mt-4 gap-4">
            <BlueButton text={"Learn More"}></BlueButton>
            <YellowButton text={"Book a Demo"}></YellowButton>
          </div>
        </div>
        <div className="w-full lg:w-[45%] p-2 rounded-lg min-h-[350px] ">
          <TypeAnimation
            sequence={[
              `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <title>Simple Page</title>
              </head>
              <body>
                  <h1>Welcome to CodeBoost</h1>
              </body>
              </html>`,
              1000,
              `.`,
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "1.2em",
              display: "inline-block",
              fontFamily: "monospace",
              whiteSpace: "pre-line",
              textAlign: "left",
              verticalAlign: "top",
              background: "linear-gradient(90deg, #f66496 0%, #ffcc00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            repeat={Infinity}
          />
        </div>
      </div>

      {/* section 3  */}
      <div className="flex flex-col-reverse lg:flex-row items-start justify-evenly md:gap-y-4 gap-y-8 md:mt-8 mt-4 shadow-lg">
        <div className="w-full lg:w-[45%] p-2 rounded-lg min-h-[350px] ">
          <TypeAnimation
            sequence={[
              `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <title>Simple Page</title>
              </head>
              <body>
                  <h1>Welcome to CodeBoost</h1>
              </body>
              </html>`,
              1000,
              `.`,
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "1.2em",
              display: "inline-block",
              fontFamily: "monospace",
              whiteSpace: "pre-line",
              textAlign: "left",
              verticalAlign: "top",
              background: "linear-gradient(90deg, #f66496 0%, #ffcc00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            repeat={Infinity}
          />
        </div>
        <div className="w-full lg:w-[45%] p-2 md:p-6 rounded-lg shadow-lg min-h-[350px] ">
          <div className="text-3xl font-bold text-center">
            Start
            <Highlight text={"Coding in second"} />
          </div>
          <div className="mt-4 text-center max-w-md mx-auto  text-gray-500">
            Discover your potential with our expert-led coding courses—unlock
            skills, build projects, and achieve your career goals in the tech
            industry! Learn from professionals, engage in hands-on exercises,
            and turn your passion for coding into a successful career. Join us
            today and start your journey to success!
          </div>
          <div className="flex items-center justify-center mt-4 gap-4">
            <BlueButton text={"Learn More"}></BlueButton>
            <YellowButton text={"Book a Demo"}></YellowButton>
          </div>
        </div>
      </div>

      {/* section 4  */}
      <SkillsSection></SkillsSection>

      <div className="flex flex-col lg:flex-row items-start justify-evenly  gap-y-2 md:mt-8 mt-4 shadow-lg py-4 md:py-6">
        <div className="w-full lg:w-[45%]  rounded-lg ">
          <div className="text-3xl font-bold text-center">
            Get the skills you need for a
            <Highlight text={"job that is in demand."} />
          </div>
        </div>
        <div className="w-full lg:w-[45%]  rounded-lg ">
          <div className="mt-4 text-center max-w-md mx-auto  text-gray-500">
            The modern CodeBoost dictates its own terms. Today, to be a
            competent specialist requires more than professional skills.
          </div>
          <div className="flex items-center justify-center mt-4 gap-4">
            <YellowButton text={"Learn More"}></YellowButton>
          </div>
        </div>
      </div>

      {/* section 5  */}
      <div className="flex flex-col lg:flex-row items-start justify-evenly  gap-y-2 md:mt-8 mt-4 shadow-lg py-4 md:py-6">
        <div className="w-full lg:w-[45%]  rounded-lg ">
          <TimeLine></TimeLine>
        </div>
        <div className="w-full lg:w-[45%]  rounded-lg flex items-center justify-center my-6 relative">
          <img src={TimelineImage} alt="Hello" className="rounded-lg" />
          <div className="absolute text-3xl font-bold bg-green-900 -bottom-8 rounded-2xl  p-2 z-10 animate-bounce">
            <div>10 Years of Experience</div>
            <div>250 Types of Courses</div>
          </div>
        </div>
      </div>

      {/* section 6  */}
      <div className="flex flex-col items-center justify-center  gap-y-0 md:mt-4 mt-4 shadow-lg py-4 md:py-6">
        <div>
          <div className="text-3xl font-bold text-center">
            Your Ultimate Toolkit for Mastering a
            <Highlight text={"World of Knowledge."} />
          </div>
          <div className="mt-4 text-center max-w-lg mx-auto  text-gray-500">
            To thrive in today's competitive job market, you need to acquire
            in-demand skills that go beyond traditional professional expertise.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <div className="flex-1 min-w-[300px] relative">
            <img
              src={myImage}
              alt="Description of image 1"
              className="sm:w-full h-auto rounded-lg shadow-md"
            />
            <div className="absolute top-4 left-2 text-white font-bold bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-2 -rotate-16 animate-bounce">
              Founder
            </div>
          </div>
          <div className="flex-1 min-w-[300px] relative">
            <img
              src={myImage2}
              alt="Description of image 2"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="absolute top-8 left-2 text-white font-bold bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-2 -rotate-16 animate-bounce">
              Chief Executive Officer
            </div>
          </div>
          <div className="flex-1 min-w-[300px] relative">
            <img
              src={myImage}
              alt="Description of image 3"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="absolute top-8 left-2 text-white font-bold bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-2 -rotate-16 animate-bounce">
              Chief Financial Officer
            </div>
          </div>
        </div>
      </div>

      {/* section 7 */}
      <div className="flex flex-col lg:flex-row items-start justify-evenly  gap-y-2 md:mt-8 mt-4 shadow-lg py-4 md:py-6">
        <div className="w-full lg:w-[45%]  rounded-lg flex items-center justify-center my-6 relative">
          <img src={instructor} alt="image" className="rounded-lg " />
        </div>
        <div className="w-full lg:w-[45%]  rounded-lg flex flex-col justify-center items-center gap-y-3 sm:py-28 py-4">
          <div className="text-3xl font-bold text-center">
            Beacome an
            <Highlight text={"Instructor."} />
          </div>
          <div className="text-center max-w-md mx-auto  text-gray-500">
            The modern CodeBoost dictates its own terms. Today, to be a
            competent specialist requires more than professional skills.
          </div>
          <YellowButton text={"Become Instructor"}></YellowButton>
        </div>
      </div>

      {/* section 8  */}
      <div className="flex flex-col items-start justify-evenly gap-y-2 md:mt-8 mt-4 shadow-lg py-4 md:py-6 w-full bg-gray-900 text-white">
        <div className="text-3xl font-bold text-center mx-auto">
          Reviews from other Learners.
        </div>
        <div className="mx-auto p-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden w-[100%]">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            User Comments
          </h2>
          <div className="mx-auto p-6 bg-gray-800 rounded-lg  overflow-hidden">
            <div className="relative overflow-hidden">
              <div className="flex space-x-4 animate-marquee">
                {comments.concat(comments).map((comment, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg shadow-md min-w-[300px]"
                  >
                    <h3 className="font-semibold text-lg text-white">
                      {comment.name}
                    </h3>
                    <p className="text-gray-300 mt-1">{comment.text}</p>
                    <div className="mt-2 text-yellow-400 font-bold">
                      ⭐ {comment.rating}/5
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* footer  */}
      {/* <Footer/> */}

    </div>
  );
};

export default Home;
