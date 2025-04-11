const Course = require("../models/Course")
const RatingAndReview = require("../models/RatingAndReview")
const User = require("../models/User")


//get all course

module.exports.getCourseDetails = async (req, res) => {
  try {
    //get course id 
    // const { courseId } = req.body;

    //find course details with populate
    const courseDetails = await Course.find({})
      .populate("instructor")
      .populate("instructor.additionalDetails")
      .populate("courseContent")
      .populate("courseContent.subSection")
      .populate("ratingAndReview")
      .populate("tags")
      .populate("studentsEnrolled");


    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course details not found"
      });
    }

    //return the response
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching course details",
      error: error.message
    });
  }
}


//rating and review
module.exports.postRatingAndReview = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;

    // fetchdata from req body
    const { rating, review, courseId } = req.body;

    //check if user is enrolled or not
    const user=await User.findById(userId);
    const userEnrolled=user.courses.includes(userId)

    if(!userEnrolled){
      return res.status(400).json({
        success:false,
        message:"You are not enrolled in this course"
      })
    }
    
    // check if user already reviewed the course
    const userReviewd=await RatingAndReview.findOne({user:userId,course:courseId});

    if(userReviewd){
      return res.status(400).json({
        success:false,
        message:"You already reviewed this course"
      })
    }
    
    // create rating and review
    const ratingAndReview = await RatingAndReview.create({
      user: userId,
      courseId,
      rating,
      review
    });

    
    //update course with this rating/ review
    const course = await Course.findById(courseId);
    course.ratingAndReview.push(ratingAndReview._id);
    await course.save();
    
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and review added successfully",
      data: ratingAndReview
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding rating and review",
      error: error.message
    })
  }
}


//get average rating
module.exports.getAverageRatting=async (req,res)=>{
  try {
    // Get course id
    const { courseId } = req.body;

    // Calculate average rating
    const ratingAndReview = await RatingAndReview.find({ courseId });
    const avgRating = ratingAndReview.reduce((acc, curr) => acc + curr.rating, 0) / ratingAndReview.length || 0;

    // Return rating
    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      averageRating: avgRating
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching average rating",
      error: error.message
    });
  }
}


//get all rating and review
module.exports.getAllRatingReview=async (req,res)=>{
  try {
    const {courseId} = req.body;
    const ratingAndReview=await RatingAndReview.find({courseId}).sort({rating:"desc"}); 
    if(!ratingAndReview){
      return res.status(404).json({
        success:false,
        message:"Rating and review not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Rating and review fetched successfully",
      data:ratingAndReview
    })
  } catch (error) {
     res.status(500).json({
      success:false,
      message:"Error while getting all rating and review",
      error:error,
     })
  }
}

