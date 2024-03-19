const mongoose = require('mongoose');
const url = require('../connection/constants');

mongoose.connect('mongodb:' + url.databaseURL)
  .then((res) => {
    console.log('Connected to MongoDB and Schema is successfully created!');
    return false;
  })
  .catch((err) => {
    console.log('Error in connecting to MongoDB' + err);
  });