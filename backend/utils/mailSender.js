const nodemailer = require("nodemailer");


const mailSender=async (email,title,body)=>{
  try {

    let trasporter=nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
      }
    })

    let info=await trasporter.sendMail({
      from:`"CodeBoost" <${process.env.MAIL_USER}>`,
      to:email,
      subject:title,
      html:body,
    })

    console.log("Email sent successfully: ", info.messageId);
    return info;
    
  } catch (error) {
    console.log(error);
  }
}

module.exports=mailSender;