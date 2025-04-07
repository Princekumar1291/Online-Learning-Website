const mongoose=require("mongoose")

const ratingAndReviewSchema=new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
  },
  rating:{
    type: Number,
    required: true,
  },
  review:{
    type: String,
    trim: true
  }
})

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);

