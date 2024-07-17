/*
Project: Hiring Portal Project
Author: HS
Date: 15/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */
const mongoose = require('mongoose');
const collectionNames = require('..//utility/collectionNames');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(collectionNames.collectionNames.StatusCollection, statusSchema);