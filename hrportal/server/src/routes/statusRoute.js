/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 23/07/2024
Sprint: ph 2 Sprint 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
24/7/24         HS                         ph 2 sp 2        Search for a status
-------------------------------------------------------------------------------------------------------
*/

const express = require('express')

const {getStatus, addStatus, editStatus, searchStatus} = require('../controllers/statusController')

// for creating the instance of the route
const router = express.Router()

// Get status from DB
router.get('/get-status', getStatus)

// add new status to DB
router.post('/add-status', addStatus)

// Edit existing status
router.put('/edit-status/:id', editStatus)

// search for a status
router.get('/search-status', searchStatus)

// exporting router
module.exports = router