const User = require("../models/User");
const OTP = require("../models/OTP");
const optGenerator = require("otp-generator");
const bcryptjs = require('bcryptjs');
const Profile = require("../models/Profile")
var jwt = require('jsonwebtoken');
const mailSender = require("../utils/mailSender")

// sendOpt
module.exports.sendOtp = async (req, res) => {

  try {
    //get email from request body
    const { email } = req.body;

    //generate opt
    var otp = optGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    console.log("OPT generated", otp)

    //if opt exit with the email
    let OtpExit = await OTP.findOne({ email });

    if (OtpExit) {
      OtpExit.otp = otp;
      OtpExit.createdAt = Date.now();
      await OtpExit.save();
      return res.status(200).json({
        success: true,
        message: "OTP is send to email",
        otp
      })
    }

    //save otp in db
    let newOtp = await OTP.create({ email, otp })
    res.status(200).json({
      success: true,
      message: "OTP is send to email",
      otp
    })


  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error while sending OTP, please try again",
    })
    console.log("Error while sending OTP", error)
  }


}

//signup
module.exports.signUp = async (req, res) => {
  try { 
    //fetch data
    const { firstName, lastName, email, password, confirmPassword, accountType, otp, contactNumber } = req.body;

    //validate data
    if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //validate opt
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required Generate otp",
      })
    }

    //match password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm password does not match",
      })
    }

    //check user exit or not
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exits",
      })
    }

    //get opt with the email
    const otpResponse = await OTP.findOne({ email: email });

    //otp expire
    if (!otpResponse) {
      return res.status(400).json({
        success: false,
        message: "OTP is expire or invalid, please SingUp again",
      })
    }

    //validate otp
    if (otpResponse.otp != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      })
    }

    //hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //create profile
    const profile = await Profile.create({ gender: null, dateOfBirth: null, about: null, contactNumber: null, profilePicture: null });


    //create entry in db
    const newUser = await User.create({ firstName, lastName, email, contactNumber, password: hashedPassword, accountType, additionalDetails: profile._id, image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}` })

    res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user: newUser,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cannot be rigistered please try again",
      error,
    })
  }


}

//login
module.exports.login = async (req, res) => {
  try {
    //get data from req Body
    const { email, password } = req.body;

    //validate the fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill email and password",
      })
    }

    //user not exit
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please register first",
      })
    }


    const passwordValidate = await bcryptjs.compare(password, user.password);
    console.log("Password validate", passwordValidate)

    //password does not match
    if (!passwordValidate) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password, please try again",
      });
    }

    //generate jwt token
    const token = jwt.sign(
      { email: user.email, id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    user.toObject();
    user.token = token;
    user.password = undefined;

    //generate cookeies
    res.cookie("token", token, { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), httpOnly: true }).status(200).json({  //used to set cookie in browser for 1 year
      success: true,
      message: "User is logged in successfully",
      user,
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while login, please try again",
      error,
    })
  }



}

//updatePassword
module.exports.updatePassword = async (req, res) => {
  try {
    // Get the data from body
    const { oldPassword, newPassword, confirmPassword } = req.body;
    console.log("Data", oldPassword, newPassword, confirmPassword)
    // Validate input
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // Find user in DB
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate old password
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    } 

    // Update password in DB
    user.password = await bcryptjs.hash(newPassword, 10);
    await user.save();


    // Send success response
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while changing password, please try again",
      error: error.message,
    });
  }
}


//reset password
module.exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { otp, password, confirmPassword,email } = req.body;


    //find the user
    const user=await User.findOne({email});
    console.log("user: ", user)
    
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    
    //get the otp from db
    const otpResponse = await OTP.findOne({ email });
    console.log("opt: ", otpResponse)

    //if otp not exit
    if (!otpResponse) {
      return res.status(400).json({
        success: false,
        message: "OTP expired, please try again",
      });
    }

    //otp validation
    if (otpResponse.otp != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //validate the password and confirm password
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    //hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //update the password indb
    user.password = hashedPassword;
    await user.save();


    // return a success response
    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });

  } catch (error) {
    console.error("Error while updating password:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
