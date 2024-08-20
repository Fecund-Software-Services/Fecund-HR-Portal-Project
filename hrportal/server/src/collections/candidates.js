/*
Project: Hiring Portal Project
Author: Harshini C
Date: 25/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  | Sprint   | Description 
-------------------------------------------------------------------------------------------------------
17/4/2024   |   hs                      | 2        | Add New Candidate
22/4/2024   |   hs                      | 3        | Add New Candidate validations
06/05/2024  |   Harshini C              | 4        | View Candidates applied in
7/5/2024    | HS                        | 4        | Resume Handling
15/7/2024   | HS                        |Phase 2 Sp 1 | Skillset and status
9/8/2024   | HS                        |Phase 2 Sp 3 | Add Candidate ticket--> added new fields
-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');
const collectionNames = require('..//utility/collectionNames')

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
        required: [true, "skillset required" ] // Dropdown list to choose from
    },
    subskillset: {
        type: String,
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
        type: String,
        // required: [true, "last working date is required"],
        
    },
    status: {
        type: String,
        default: "Submitted",
        required: true
    },
    statusComments: {
        type: String,
        default: ""
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
        type: String, 
        ref: 'Resume' // Indication if resume is uploaded
    }, 
    enteredYear: { 
        type: String, 
        default: new Date().getFullYear()  
    }, 
    enteredMonth: { 
        type: String, 
        default: new Date().getMonth()+1  
    }, 
    fileId: { 
        type: String, 
        ref: 'fs.field'
    },
    interviewDate: {
        type: Date,
    },
    joiningDate: {
        type: Date
    },
    statusUpdateDate: {
        type: Date,
        default: Date.now
    }
 
} , {timestamps: true});

candidateSchema.pre('save', function(next) {
    if (this.isModified('status')) {
        this.statusUpdateDate = Date.now();
    }
    next();
});

// intializing 
module.exports = mongoose.model(collectionNames.collectionNames.CandidateCollection, candidateSchema)   
