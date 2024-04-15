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

const userRolesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
    },
    userRoles: {
        type: String,
        required : true

    },
    userPermissions: {
        type: String,
        required : true
    }
});

// intializing 
const userRoles = mongoose.model('User Roles', userRolesSchema);
     
data = [{
    firstName: "Admin",
    lastName: "Admin",
    userRoles: "Administrator",
    userPermissions: "Add,View,Update,Submit"
    }]

userRoles.insertMany(data)
