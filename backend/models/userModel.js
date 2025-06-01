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
    password:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("user", userSchema);
