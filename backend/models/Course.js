const mongoose=require("mongoose")

const courseSchema=new mongoose.Schema({
  courseName:{  
    type:String,
    required:true,
  },
  courseDescription:{
    type:String,
    required:true,
  },
  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  whatYouWillLearn:{
    type:String,
  },
  courseContent:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Section",
    }
  ],
  ratingAndReview:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"RatingAndReview"
    }
  ],
  price:{
    type:Number,
    required:true, 
  },
  tags:{
    types:String,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true,
  },
  studentsEnrolled:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    }
  ],
  thumbnail:{
    type:String,
    required:true,
  }
})

module.exports=mongoose.model("Course",courseSchema)
