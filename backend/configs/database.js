const mongoose=require("mongoose")

const dbConnect=async ()=>{
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("Db connected Successfully")
  })
  .catch((err)=>{
    console.log("DB connection fail")
    console.error(err)
    process.exit(1);
  })
}

module.exports=dbConnect;