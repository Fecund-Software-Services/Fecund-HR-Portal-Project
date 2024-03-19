const mongoose = require('mongoose');
const mongoutil = require('../connection/mongoutil');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
    },
    employeeID: {
        type: Number,
        required: [true, "ID is required"],
        unique: true,
    },
    emailAddress: {
        type: String,
        required: [true, "email address is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        unique: true,
    },
    role: {
        type: String,
        default: "Admin", // default is set for admin, in future other roles can be added.
    },
    securityQuestion1: {
        type: String,
        required: true
    },
    answer1: {
        type : String,
        required: true
    },
    securityQuestion2: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    securityQuestion3: {
        type: String,
        required: true
    },
    answer3: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        required : true

    }
});

// intializing 
const user = mongoose.model('Users', userSchema)
     


