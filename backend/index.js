const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// middleware 
app.use(cors({
  origin: "https://task-manager-rfo2.onrender.com", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// 👇 File upload middleware ( for user Image upload)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// Connect to Cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


// db connection
const dbConnect = require('./config/database')
dbConnect();

// Mounting Routes
const userRoutes = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
app.use('/api/user', userRoutes)
app.use('/api/tasks', taskRouter)

app.get('/', (req, res)=>{
    res.send("API Working");
})

app.listen(PORT, ()=>{
    console.log(`server started successfully at ${PORT}`)
})

