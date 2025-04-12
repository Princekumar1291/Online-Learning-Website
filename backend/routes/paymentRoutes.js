const express = require("express");
const paymentRoutes = express.Router();
const paymentController = require("../controllers/Payment");
const { auth, isStudent } = require("../middleware/auth");

// Initiate payment
paymentRoutes.post("/capturepayment", auth, isStudent, paymentController.capturePayment);

// Verify payment
paymentRoutes.post("/verifyPayment", auth, isStudent, paymentController.verifyPayment);

module.exports = paymentRoutes;
