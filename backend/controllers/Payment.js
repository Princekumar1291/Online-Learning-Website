const razorpayInstense = require('../configs/razorpay');
const Course = require("../models/Course");
const mailSender = require('../utils/mailSender');
const User = require("../models/User");
const crypto = require("crypto");

// initiate the payment
module.exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (user.accountType !== "Student") {
      return res.status(400).json({
        success: false,
        message: "This is a protected route for students only"
      });
    }

    if (!courses || courses.length === 0 || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid courseIds and userId"
      });
    }

    let totalAmount = 0;

    const courseDetails = await Promise.all(
      courses.map(courseId => Course.findById(courseId))
    );

    for (let course of courseDetails) {
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "One or more courses not found"
        });
      }

      if (course.studentsEnrolled.includes(userId)) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in one or more of the selected courses"
        });
      }

      totalAmount += course.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
      notes: {
        userId: userId,
        email: user.email,
        name: user.firstName + " " + user.lastName,
        courses: courses
      }
    };

    const paymentResponse = await razorpayInstense.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while capturing payment",
      error: error.message
    });
  }
};

// verify the payment
module.exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      courses
    } = req.body;
    const userId = req.user.id;

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment details"
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    const user = await User.findById(userId);

    for (let courseId of courses) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      course.studentsEnrolled.push(userId);
      await course.save();

      user.courses.push(course._id);
    }

    await user.save();

    const mailResponse = await mailSender(
      user.email,
      "Payment Successful - Enrollment Confirmed",
      `Congratulations! Your payment was successful and you're now enrolled in the selected courses.`
    );

    console.log("Email sent successfully", mailResponse);

    return res.status(200).json({
      success: true,
      message: "Payment verified and courses enrolled successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error during payment verification",
      error: error.message
    });
  }
};