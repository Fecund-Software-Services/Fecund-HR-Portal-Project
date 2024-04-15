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

const mongoose = require('mongoose');
const mongoutil = require('../connection/mongoutil');

const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
    },
    emailAddress: {
        type: String,
        required: [true, "email address is required"],
        unique: true,
    },
    mobileNumber: {
        type: Number,
        required: [true, "mobile number is required"],
        unique: true,
    },
    skillSet: {
        type: String,
        required: true,  // Dropdown list to choose from
    },
    otherSkillSet: {
        type: String,
        required: true,  // input field to add candidate's skills set that are not avaiable in dropdown options
        default: "" // Optional: Set an empty string as default
    },
    itExperience: {
        type: Number,
        required: [true, "experience is required"],
        
    },
    totalRelevantExperience: {
        type: Number,
        required: [true, "total relevant experience is required"],
        
    },
    currentCompany: {
        type: String,
        required: true
    },
    currentCTC: {
        type: Number,
        required: [true, "current CTC is required"],
        
    },
    expectedCTC: {
        type: Number,
        required: [true, "expected CTC is required"],
       
    }, 
    noticePeriod: {
        type: Number,
        required: [true, "notice period is required"],
        
    },
    servingNoticePeriod: {
        type: Boolean,
        required: [true, "serving notice period is required"],
        
    },
    lastWorkingDay: {
        type: Date,
        required: [true, "last working date is required"],
        
    },
    status: {
        type: String,
        required: true
    },
    certified: {
        type: Boolean,
        required: true
    },
    comments: {
        type: String,
        default: "" // Optional: Set an empty string as default
    },
    resume: {
        type: String, // Can be Base64 encoded string or reference to GridFS storage depending on your choice
    },
    createdAt: {
        type: Date,
        default: Date.now // This automatically sets the creation time
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now // This automatically sets the last updated time
    }
});

// intializing 
const candidates = mongoose.model('Candidates', candidateSchema)
     


