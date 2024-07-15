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

const skillsetSchema = new mongoose.Schema({
    skillname: {
        type: "string",
        required: true
      }, 
    subskillset: {
        type: "array",
        items: { type: mongoose.Schema.Types.ObjectId } ,
        ref: 'SubSkillSet'
      }
}, {timestamps: true});

// intializing
module.exports = mongoose.model(collectionNames.collectionNames.SkillsetCollection, skillsetSchema)



