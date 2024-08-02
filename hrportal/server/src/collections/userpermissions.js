/*
Project: Hiring Portal Project
Author: Harshini C
Date: 25/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
22/7/2024     HS                           ph2 sp2      userPermissions
-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');
const collectionNames = require('..//utility/collectionNames');

const userPermissionsSchema = new mongoose.Schema({
    userPermissions: {
        type: String,
        required : true
    }
});

// intializing 
module.exports = mongoose.model(collectionNames.collectionNames.UserPermissions, userPermissionsSchema);
     

