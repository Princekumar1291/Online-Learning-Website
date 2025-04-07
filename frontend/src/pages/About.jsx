import React from "react";
import about1 from "../assets/Images/aboutus1.webp";
import about2 from "../assets/Images/aboutus2.webp";
import about3 from "../assets/Images/aboutus3.webp";
import about4 from "../assets/Images/myImage.jpg";

const About = () => {
  return (
    <div className="text-white py-16 px-6 md:px-16 bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Driving Innovation in Online Education for a
          <span className="text-blue-400"> Brighter Future</span>
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
          Studynotion is at the forefront of driving innovation in online education.
          We&apos;re passionate about creating a brighter future by offering cutting-edge courses,
          leveraging emerging technologies, and nurturing a vibrant learning community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[about1, about2, about3].map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-800 p-2"
          >
            <img
              src={image}
              alt={`About Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center mt-12 px-4">
        <p className="text-xl md:text-2xl leading-relaxed">
          We are passionate about revolutionizing the way we learn. Our innovative platform
          <span className="text-blue-400"> combines technology</span>,
          <span className="text-orange-400"> expertise</span>, and community to create an
          <span className="text-yellow-400"> unparalleled educational experience</span>.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto mt-16 items-center">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-red-500">Our Founding Story</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Our e-learning platform was born out of a shared vision and passion for transforming education. 
            It all began with a group of educators, technologists, and lifelong learners who recognized the 
            need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional 
            education systems. We believed that education should not be confined to the walls of a classroom or 
            restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and 
            empower individuals from all walks of life to unlock their full potential.
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="relative flex-1">
          <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
              src={about4}
              alt="Founding Story Visual"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;