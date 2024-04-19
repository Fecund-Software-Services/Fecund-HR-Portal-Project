/*
Project: Hiring Portal Project
Author: Harshini C
Date: 25/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    employeeID: {
        type: Number,
        required: [true, "ID is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email address is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        default: "Admin" // default is set for admin, in future other roles can be added.
    },
    securityQuestion1:{
        type: String,
        default: 'What is your first pet name ?',
        required: true
    },
    answer1:{
        type: String,
        required: [true]
    },
    securityQuestion2:{
        type: String,
        default: 'What was your childhood nickname ?',
        required: true
    },
    answer2:{
        type: String,
        required: [true]
    },
    securityQuestion3:{
        type: String,
        default: 'What was your first mobile brand name ?',
        required: true
    },
    answer3:{
        type: String,
        required: [true]
    }
}, {timestamps: true})


module.exports = mongoose.model('User', userSchema)

