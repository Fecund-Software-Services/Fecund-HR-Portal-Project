/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const { addCandidate, upload } = require('../controllers/candidateController')

const router = express.Router()

// add new candidate
router.post('/add-candidate', upload.single('resume'), addCandidate)

// exporting router
module.exports = router