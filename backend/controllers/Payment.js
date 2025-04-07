const razorpayInstense = require('../configs/razorpay')
const Course = require("../models/Course");
const mailSender = require('../utils/mailSender');


//capture the payment and initiate the razorpay order
const capturePayment = async (req, res) => {
  try {
    //get courseId and userId
    const { course_id } = req.body;
    const userId = req.user.id;

    //validtion
    if (!course_id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid the courseId or userId"
      })
    }

    //valid courseId details
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }


    // Check if the user has already paid for the course
    const isAlreadyEnrolled = course.studentsEnrolled.includes(userId);
    if (isAlreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "User has already enrolled in this course"
      });
    }

    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: Math.random() + Date.now(),
      notes: {
        courseId: course_id,
        userId,
      }
    };

    try {
      const paymentResponse = await razorpayInstense.orders.create(options);
      console.log("Payment response: ", paymentResponse);
      return res.status(200).json({
        success: true,
        message: "Order created successfully on Razorpay",
        courseName: course.corseName,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order with Razorpay",
        error: error.message
      });

    }

    //return response

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while capturing the payment",
      error: error.message
    });
  }
}

module.exports = capturePayment;


//verify signature of razorpay and server
module.exports.verifySignature = async (req, res) => {
  try {
    const webhookSecrete = "23452345";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecrete);
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex");

    if (digest === req.headers['x-razorpay-signature']) {
      console.log('payment is authrozed');
      const {courseId,userId}=req.body.payload.enitiy.notes;
      try {
        //find the course and enrolled the student
        const enrolledCourse=await Course.findByIdAndUpdate(courseId,{$push:{studentsEnrolled:userId}},{new:true})

        if(!enrolledCourse){
          return res.status(500).json({
            success:false,
            message:"Course not found"
          })
        }

        //find the student and aadd the course in the user
        const enrolledStudent=await User.findByIdAndUpdate(userId,{$push:{courses:courseId}},{new:true})
        console.log(enrolledStudent)

        //send the mail for the conformation
        const emailResponse=await mailSender(enrolledStudent.email,
          "MEssage form prince","cnogurates u enrolled in new code");
        
        
        return res.status(200).json({
          success: true,
          message: "Enrolled Successfully"
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error during enrollment process",
          error: error.message
        });

      }
      
    }

  } catch (error) {
    return res.status(402).json({
      success: false,
      message: "Payment is not authorized by Razorpay"
    });
  }
}