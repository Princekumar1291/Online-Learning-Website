//create course
const SubSection = require("../models/SubSection")
const Course = require("../models/Course")
const Section = require("../models/Section")
const Category = require("../models/Category")
const User = require("../models/User")
const { uploadImageToCloudinary, uploadVideoToCloudinary } = require("../utils/cloudinary")

//create course
module.exports.postCourse = async (req, res) => {
  try {
    //fetch the data from body
    const { courseName, courseDescription, whatYouWillLearn, tag, price, category } = req.body;
    console.log("Inside post course", courseName, courseDescription, whatYouWillLearn, tag, price)

    //get thumbnail
    let thumbnail = null;
    try {
      thumbnail = req.files.thumbnail;
    } catch (error) {

    }
    console.log("Thumbnail", thumbnail)

    //validatioin
    if (!courseName || !courseDescription || !whatYouWillLearn || !tag || !price || !thumbnail || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields"
      })
    }

    // console.log("id of instructor",req.user.id)

    //get the id of the instructor
    const id = req.user.id;
    const instructor = await User.findById(id);
    // console.log("instructor",instructor)

    //if instrucotr not found
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found"
      })
    }

    //check tag is valid or not
    const categoryDetails = await Category.findOne({ name: category });
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found"
      })
    }
    console.log("categoryDetails", categoryDetails)

    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, "CodeBoost/coursesThumbnailImage");

    //create an entry of new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructor._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      tags: tag,
      thumbnail: thumbnailImage.secure_url,
    })

    console.log("new course", newCourse)



    //add course id to user
    instructor.courses.push(newCourse._id);
    await instructor.save();

    console.log("instructor", instructor)

    //add id of course in tags
    categoryDetails.course.push(newCourse._id);
    await categoryDetails.save();

    return res.status(200).json({
      success: true,
      message: "Course is added successfully",
      newCourse
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

//delete course
module.exports.deleteCourse = async (req, res) => {
  try {
    const id = req.body.id;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Course is deleted successfully",
      course
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

//update course
module.exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log("courseId", courseId)
    const { courseName, courseDescription, whatYouWillLearn, tag, price, category } = req.body;

    //get thumbnail
    let thumbnail = null;
    try {
      thumbnail = req.files.thumbnail;
    } catch (error) {

    }

    //upload image to cloudinary
    let thumbnailImage = null;
    if (thumbnail) {
      thumbnailImage = await uploadImageToCloudinary(thumbnail, "CodeBoost/coursesThumbnailImage");
    }

    //check tag is valid or not
    const categoryDetails = await Category.findOne({ name: category });
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found"
      })
    }

    //update course
    const course = await Course.findByIdAndUpdate(courseId, {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      tags: tag,
    })

    if (thumbnailImage) {
      course.thumbnail = thumbnailImage.secure_url;
    }
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course is updated successfully",
      course
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}


//get all courses
module.exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(["instructor", "courseContent", "ratingAndReview"]);

    return res.status(200).json({
      success: true,
      message: "All courses",
      courses
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "All courses",
      error: error.message
    })
  }
}

//get created course by Instructor
module.exports.getCreatedCourse = async (req, res) => {
  try {
    const id = req.user.id;
    const instructor = await User.findById(id).populate("courses");
    return res.status(200).json({
      success: true,
      message: "Created course by Instructor",
      instructor
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Created course by Instructor",
      error: error.message
    })
  }
}


//create section
module.exports.postCourseSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;

    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields"
      })
    }
    // console.log("sectionName,courseId",sectionName,courseId)

    //create section
    const section = await Section.create({ sectionName });

    console.log("section", section)

    //update course with section id
    const course = await Course.findById(courseId);
    course.courseContent.push(section._id);
    await course.save();

    console.log("course", course)

    //return response
    return res.status(200).json({
      success: true,
      message: "Section is added successfully",
      section
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the section",
      error: error.message
    })
  }
}


//update a section
module.exports.updateSection = async (req, res) => {
  try {
    //get all data
    const { sectionName, sectionId } = req.body;
    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section name and section ID are required"
      });
    }


    //update the data
    const section = await Section.findByIdAndUpdate(sectionId, {
      sectionName
    }, {
      new: true,
    });

    //send the response
    return res.status(200).json({
      success: true,
      message: "Section is updated successfully",
      section
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error while updating the section",
      error: error.message
    })

  }
}


// delete the section
module.exports.deleteSection = async (req, res) => {
  try {
    //get id
    const sectionId = req.body.sectionId;
    const courseId = req.body.courseId;

    //check the section is exit or not
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }

    //remove from course 
    await Course.updateOne(
      { _id: courseId },
      {
        $pull: {
          courseContent: section._id
        }
      }
    );


    const sec = await Section.findById(sectionId);
    const subSec = sec.subSection;
    for (let i = 0; i < subSec.length; i++) {
      await SubSection.findByIdAndDelete(subSec[i]);
    }

    //remove the section
    await Section.findByIdAndDelete(sectionId);

    //send the response
    return res.status(200).json({
      success: true,
      message: "Section is deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting the section",
      error: error.message
    })
  }
}


//create subSection
module.exports.postCourseSubSection = async (req, res) => {
  try {
    //get the data from body
    const { title, description, sectionId } = req.body;
    console.log(title, description, sectionId);
    console.log("vedioFile", req.files.vedioFile);

    //get video file
    let video = null;
    try {
      video = req.files.vedioFile;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Please provide vedio file"
      })
    }

    //validation
    if (!title || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields"
      })
    }

    //if sectionid not found
    const sec = await Section.findById(sectionId);
    if (!sec) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      })
    }


    //upload to cloudinary
    const uploadVideoDetails = await uploadVideoToCloudinary(video, "CodeBoost/Course");


    const durationInSeconds = uploadVideoDetails.duration;

    //calculate the duration of the video 
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const timeDuration = `${hours} hrs ${minutes} mins`;


    //create subsection
    // console.log("uploadVideoDetails",uploadVideoDetails)
    // console.log("videoUrl",uploadVideoDetails.secure_url)

    const newSubsection = await SubSection.create({ title, timeDuration, description, videoUrl: uploadVideoDetails.secure_url })

    // console.log("newSubsection",newSubsection)


    //add subsectionId in sectionId
    const section = await Section.findByIdAndUpdate(sectionId, { $push: { subSection: newSubsection._id } }, { new: true })

    // console.log("section",section)

    //return response
    return res.status(200).json({
      success: true,
      message: "Subsection is added successfully",
      newSubsection,
      section
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error while creating the sub section",
      error: error.message
    })
  }
}


//update subsection
module.exports.updateSubSection = async (req, res) => {
  try {
    //data fetch
    const { subSectionId, title, description } = req.body;

    //validation
    if (!subSectionId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields"
      })
    }

    //check the subsection is exit or not
    const subsection = await SubSection.findById(subSectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found"
      })
    }

    //update subsection
    subsection.title = title;
    subsection.description = description;
    await subsection.save();

    //return response
    return res.status(200).json({
      success: true,
      message: "Subsection is updated successfully",
      subsection
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error while updating the subsection",
      error: error.message
    })
  }
}


//delete the subsection and also from section
module.exports.deleteSubSection = async (req, res) => {
  try {
    //get id
    const subsectionId = req.body.subsectionId;
    const sectionId = req.body.sectionId;

    //check the subsection is exit or not
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection || !subsectionId) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      })
    }

    //remove from section 
    const section = await Section.findById(sectionId);
    section.subSection.pull(subsectionId);
    await section.save();

    //remove the subsection
    await SubSection.findByIdAndDelete(subsectionId);

    //send the response
    return res.status(200).json({
      success: true,
      message: "Subsection is deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting the subsection",
      error: error.message
    })
  }
}


//get all enrolled course
module.exports.getEnrolledCourse = async (req, res) => {
  try {
    //get userId
    const userId = req.user.id;

    //get enrolled course
    const enrolledCourse = await User.findById(userId).populate("courses").populate({
      path: "courses",
      populate: {
        path: "courseContent",
        model: "Section",
        populate: {
          path: "subSection",
          model: "SubSection"
        }
      }
    });

    //return response
    return res.status(200).json({
      success: true,
      message: "Enrolled course is fetched successfully",
      enrolledCourse: enrolledCourse.courses
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching enrolled course",
      error: error.message
    })
  }
}


//get all Cart details
module.exports.getUserCart = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).populate("cart");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "User cart fetched successfully",
      data: user.cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting user cart",
      error: error
    })
  }
}

//add course in cart
module.exports.addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }
    user.cart.push(course);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Course added to cart successfully",
      data: user.cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding course to cart",
      error: error
    })
  }
}

//delete course from cart
module.exports.deleteUserCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    user.cart.pull(courseId);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Course deleted from cart successfully",
      data: user.cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting course from cart",
      error: error
    })
  }
}


module.exports.instructorDashboard = async (req, res) => {
  try {
    const id = req.user.id;
    const courseDetails=await User.findById(id)
    .populate("courses")
    ;
    return res.status(200).json({
      success: true,
      message: "Instructor dashboard fetched successfully",
      courseDetails
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching instructor dashboard",
      error: error.message
    })
  }
}