const cloudinary=require('cloudinary').v2;

module.exports.uploadImageToCloudinary=async (image,folder)=>{
  try {

    //validation
    const fileSupported = ["jpeg", "png", "gif", "jpg","webp"];
    const fileType = image.name.split('.')[1].toLowerCase();
    if (!fileSupported.includes(fileType)) {
      return res.json({
        success: false,
        message: "File type not supported",
        supportedFileTypes: fileSupported,
      })
    }

    const imageUploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: `${folder}`,
      resource_type: "image",
    }
    );

    return imageUploadResult;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error image not uploaded",
      error: error.message
    })
  }
}


module.exports.uploadVideoToCloudinary = async (video, folder) => {
  try {
    // validation
    const fileSupported = ["mp4", "avi", "mov", "wmv"];
    const fileType = video.name.split('.')[1].toLowerCase();
    if (!fileSupported.includes(fileType)) {
      return res.json({
        success: false,
        message: "File type not supported",
        supportedFileTypes: fileSupported,
      });
    }

    const videoUploadResult = await cloudinary.uploader.upload(video.tempFilePath, {
      folder: folder,
      resource_type: "video",
    });

    return videoUploadResult;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error video not uploaded",
      error: error.message,
    });
  }
}


module.exports.deleteImageByUrl = async (photoUrl) => {
  const publicId = photoUrl
    .split('/image/upload/')[1] // Get everything after "/image/upload/"
    .split('.')[0] // Remove the file extension
    .split('/')
    .slice(1) // Remove the leading slash
    .join('/');
  console.log(publicId);
  try {
    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    console.log('Previous photo successfully deleted from Cloudinary.');
  } catch (err) {
    console.error('Error deleting previous photo from Cloudinary:', err);
  }
};

module.exports.deleteVideoByUrl = async (videoUrl) => {
  const publicId = videoUrl
    .split('/video/upload/')[1]
    .split('.')[0]
    .split('/')
    .slice(1)
    .join('/');

  console.log("Deleting Video:", publicId);
  
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    console.log("Video successfully deleted from Cloudinary.");
  } catch (err) {
    console.error("Error deleting video from Cloudinary:", err);
  }
};
