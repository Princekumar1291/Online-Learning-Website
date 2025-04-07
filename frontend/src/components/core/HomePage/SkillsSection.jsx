import React, { useState } from "react";
import HomePageExplore from "../../../data/homepage-explore";

const CourseSection = () => {
  const [activeTab, setActiveTab] = useState("Free");

  return (
    <div className="bg-gray-900 text-white py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
          Unlock the <span className="text-blue-400">Power of Code</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Learn to Build Anything You Can Imagine
        </p>

        {/* Navigation Tabs */}
        <div className="flex justify-center mt-6 space-x-4">
          {HomePageExplore.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveTab(category.category)}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === category.category
                  ? "bg-white text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              } transition`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {HomePageExplore
          .find((category) => category.category === activeTab)
          ?.courses.map((course, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-800 text-gray-300"
            >
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-sm">{course.description}</p>
              <div className="flex justify-between mt-4 text-sm">
                <span>🔰 {course.level}</span>
                <span>📖 {course.lessons}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseSection;
