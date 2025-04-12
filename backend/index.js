require("dotenv").config();

const express=require("express");
const dbConnect = require("./configs/database");
const cloudinaryConnection = require("./configs/cloudinaryConnect");
const app=express();

//routes
const userRoutes=require("./routes/userRoutes")
const profileRoutes=require("./routes/profileRoutes")
const paymentRoutes=require("./routes/paymentRoutes")
const courseRoutes=require("./routes/courseRoutes")

const cookieParser=require("cookie-parser")
const cors=require("cors");
const fileUpload=require("express-fileupload")


//middlewares
// express.json() and express.urlencoded() are used to parse the body of the incoming request
// express.json() parses application/json content type
// express.urlencoded() parses application/x-www-form-urlencoded content type
// We use extended: true to allow for arrays and objects to be passed in the url encoded data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:"https://code-boost-s1tf.vercel.app",  // Replace with your frontend URL
  // origin:"http://localhost:5173",  // Replace with your frontend URL
  credentials: true                // Allow cookies to be sent
}));
app.use(cookieParser()); // We use cookieParser to parse cookies from the HTTP request headers

app.use(fileUpload({
  useTempFiles: true,            // Enables temporary file storage
  tempFileDir: '/tmp/',          // Directory for temporary files (OS-specific)
}));


//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);


app.get("/", (req, res) => {
  res.send("Hello Your server is running!");
})



//connect db
dbConnect();

//connect cloudinary
cloudinaryConnection();

//listner
const PORT=process.env.PORT;
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})
