const cloudinary = require('cloudinary').v2;


const cloudinaryConnection = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Connected To cloudinary")
  } catch (error) {
    console.log(error)
  }
}

module.exports=cloudinaryConnection