const express = require("express");
const app = express();
const cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

