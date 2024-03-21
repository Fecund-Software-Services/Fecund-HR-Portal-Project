const mongoose = require('mongoose');
const mongoutil = require('../src/connection/mongoutil');

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
