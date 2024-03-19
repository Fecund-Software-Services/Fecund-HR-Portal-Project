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
     


