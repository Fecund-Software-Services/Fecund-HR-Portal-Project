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
22/4/2024              hs                      3            Add New Candidate Validations
-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    candidateId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Candidates' // Reference to candidate
    }, 
    fsFileId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'fs.field'
    },
    fileName: {
        type: String // store the filename
    },
    metadata: {
        type: Object  // additional information about the resume
    }
}, {timestamps: true}); 

// intializing 
module.exports = mongoose.model('Resume', resumeSchema)
     


