const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,   
        min: 3,
        max: 20,
        required: [true, "userName is required"],
        unique: true
    },
    nickName: {
        type: String,   
        min: 3,
        max: 20,
        required: [true, "nickName is required"]
    },
    email: {
        type: String,   
        max: 50,
        required: [true, "email is required"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,   
        min: 8,
        required: [true, "password is required"]
    
    }
})

module.exports = mongoose.model("User", userSchema);