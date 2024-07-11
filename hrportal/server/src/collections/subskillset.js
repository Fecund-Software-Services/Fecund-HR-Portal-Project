/*
Project: Hiring Portal Project
Author: Harshini C
Date: 09/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');

const subskillsetSchema = new mongoose.Schema({
    subsetname: {
        type: "string",
        required: true
      },
}, {timestamps: true}); 

// intializing 
module.exports = mongoose.model('SubSkillSet', subskillsetSchema)
     


