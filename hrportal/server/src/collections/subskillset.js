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
const collectionNames = require('..//utility/collectionNames')

const subskillsetSchema = new mongoose.Schema({
    subsetname: {
        type: "string",
        required: true
      },
      mainSkillID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Skillset'
      },
}, {timestamps: true}); 

// intializing 
module.exports = mongoose.model(collectionNames.collectionNames.SubskillsetCollection, subskillsetSchema)
     


