const Category=require("../models/Category")


//add tag in db
module.exports.postCategory=async (req,res)=>{
  try {
    //get the data from body
    const {name,description}=req.body;
    
    //validate
    if(!name || !description){
      return res.status(400).json({
        success:false,
        message:"Please fill all the fields"
      })
    }

    //check same tag is not available in db
    const category=await Category.findOne({name});
    if(category){
      return res.status(400).json({
        success:false,
        message:"Category with this name is already exit"
      })
    }
    
    //save in db
    const newTag=await Category.create({name,description});
    res.status(200).json({
      success:true,
      message:"Category is added successfully",
      newTag
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
}

//fetch all tags
module.exports.showAllCategory=async (req,res)=>{
  try {
    const category=await Category.find();
    res.status(200).json({
      success:true,
      message:"All tags",
      category:category.map(cat=>cat.name),
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
}

