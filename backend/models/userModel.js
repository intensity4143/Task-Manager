const mongoose = require("mongoose");
const { isStrongPassword } = require("validator");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String, 
        required: true,
        unique: true,
    },
    passowrd:{
        type: String,
        required: true,
    }
})

const userModel = mongoose.model("user", userSchema);