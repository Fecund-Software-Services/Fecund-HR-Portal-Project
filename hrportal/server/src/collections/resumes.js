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

const resumeSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required : true

    },
    fileName: {
        type: String,
        required : true

    }
});

// intializing 
const resume = mongoose.model('Resume', resumeSchema)
     


