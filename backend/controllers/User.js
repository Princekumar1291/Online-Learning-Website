const Profile=require("../models/Profile")
const User=require("../models/User");
const { uploadImageToCloudinary } = require("../utils/cloudinary");



//update the profile
module.exports.updateAdditionalDetails=async (req,res)=>{
  try {
    console.log("I am Inside updateAdditionalDetails");
    //get all body data
    const {firstName,lastName,gender,dateOfBirth,about,contactNumber}=req.body;

    //get userId
    const id=req.user.id;

    //find user details
    const user=await User.findById(id);
    const userProfileId=user.additionalDetails;

    //update the profile
    const profile=await Profile.findByIdAndUpdate(userProfileId,{gender,dateOfBirth,about,contactNumber},{new:true});

    //update the user firstName and lastName
    await User.findByIdAndUpdate(id,{firstName,lastName},{new:true});

    //send the response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile
    });

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating the profile",
      error: error.message
    })
  }
}

//delete profile
module.exports.deleteProfile=async (req,res)=>{
  try {
    //get the id
    const id=req.user.id;
     
    //validation
    const user=await User.findById(id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User Not Found"
      })
    }

    //delete profile
    await Profile.findByIdAndDelete({_id:user.additionalDetails});

    //delte user
    await User.findByIdAndDelete(id);

    //send response
    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully"
    });
    
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting the profile",
      error: error.message
    })
  }
}


//get userDetails
module.exports.getUserDetails = async (req, res) => {
  try {
    // get userId
    const id = req.user.id;
    console.log("id",id)

    // find user details
    const user = await User.findById(id).populate('additionalDetails');

    // if user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    // send response
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching user details",
      error: error.message
    });
  }
}

//post profile picture
module.exports.updateProfilePicture=async (req,res)=>{
  try {
    // console.log("Inside Update profile picture",req.user)
    console.log("Inside Update profile picture",req.files)
    const id=req.user.id;
    
    
    
    //delete the previous profile picture if exit
    
    //find user in db
    let user=await User.findById(id);
    
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }
    
    if(!req.files){
      return res.status(400).json({
        success: false,
        message: "Profile picture is required"
      });
    }

    const {profilePicture}=req.files;

    //upload image to cloudinary
    const imageResponse=await uploadImageToCloudinary(profilePicture,"CodeBoost/profile"); 
    console.log(imageResponse)
    
    //add the image url to db
    user=await User.findByIdAndUpdate(id,{image:imageResponse.secure_url},{new:true});
        
    //send the response
    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      imageUrl:imageResponse.secureUrl,
      user
    });

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating profile picture, Try later",
      error: error.message
    });
  }
}