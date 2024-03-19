const mongoose = require('mongoose');
const mongoutil = require('../connection/mongoutil');

const userPermissionsSchema = new mongoose.Schema({
    userPermissions: {
        type: String,
        required : true
    }
});

// intializing 
const userPermissions = mongoose.model('User Permissions', userPermissionsSchema);
     
data = [{
    userPermissions: "Add,View,Update,Submit"
    }]
    userPermissions.insertMany(data)
