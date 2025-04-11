//category page details

const Category = require("../models/Category");
const Course = require("../models/Course");

module.exports.getCategoryDetails = async (req, res) => {
  try {
    //get category id
    const { categoryId } = req.body;

    //get courses for specified category
    const selectedCategory = await Category.findById(categoryId).populate("course");

    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    //get different catogery
    const differentCategory = await Category.find({
      _id: { $ne: categoryId },
    }).populate("course")

    //get the top selleing course

    //return the response
    res.status(200).json({
      success: true,
      message: "Data fetched succefully",
      categoryData: selectedCategory,
      differentCategory,
    })

  } catch (error) {

  }
}

//get a course details
module.exports.getCourseDetails = async (req, res) => {
  try {
    // const { courseId } = req.body;
    const { courseId } = req.params;
    console.log("courseId:::",courseId)
    // const course = await Course.findById(courseId).populate(["instructor", "courseContent"]);
    const course = await Course.findById(courseId)
      .populate("instructor")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection", // Populate the subSection inside each courseContent
        },
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      course
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}