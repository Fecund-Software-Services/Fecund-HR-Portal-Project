/*
Project: Hiring Portal Project
Author: Harshini C
Date: 25/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
17/7/2024  | HS                         | pH-2, sP-1 | Admin role permissions
-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');
const collectionNames = require('..//utility/collectionNames');

const userRolesSchema = new mongoose.Schema({    
    userRoles: {
        type: String,
        required : true,
    }
});

// intializing 
module.exports = mongoose.model(collectionNames.collectionNames.UserRoleCollection, userRolesSchema);
