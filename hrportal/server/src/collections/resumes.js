/*
Project: Hiring Portal Project
Author: Harshini C
Date: 25/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
17/4/2024           hs                      2               Add New Candidate
-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    candidateId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Candidates' // Reference to candidate
    }, 
    fileName: {
        type: String,
        required : true // store the filename
    },
    contentType: {
        type: String
    },
    fileData :{
        type: Buffer
    }
}, {timestamps: true}); 

// intializing 
module.exports = mongoose.model('Resume', resumeSchema)
     


