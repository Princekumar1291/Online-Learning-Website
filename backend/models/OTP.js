const mongoose=require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema=new mongoose.Schema({
  email:{
    type:String,
    require:true,
  },
  otp:{
    type:String,
    required:true, 
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires: 60 * 60 * 60 * 1000,
  }
})

async function sendVerificationEmail(email,otp) {
  try {
    const mailResponse=await mailSender(email,"Verification Email From CodeBoost",otp); //email title body
    console.log("Email send successfully",mailResponse)
  } catch (error) {
    console.log("ErrorWhile Sending opt on mail")
  }  
}

otpSchema.pre("save",async function(next){
  await sendVerificationEmail(this.email,this.otp)
  console.log("inside PRE",this.email,this.otp)
  next();
})

module.exports=mongoose.model("OTP",otpSchema)
