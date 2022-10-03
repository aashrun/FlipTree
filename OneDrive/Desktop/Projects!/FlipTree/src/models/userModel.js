const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
        
    },
    DOB : {
        type : Date,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ["male", "female", "other"]
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobileNumber : {
        type : Number,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    location : {
        type : String
    }
    
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema)