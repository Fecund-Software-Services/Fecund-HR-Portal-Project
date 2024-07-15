const mongoose = require('mongoose');
const collectionNames = require('..//utility/collectionNames');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(collectionNames.collectionNames.StatusCollection, statusSchema);