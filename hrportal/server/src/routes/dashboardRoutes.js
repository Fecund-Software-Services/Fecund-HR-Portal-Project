/*
Project: Hiring Portal Project
Author: HS
Date: 21/08/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */
const express = require('express')

const {periodicDashboard} = require('../controllers/dashboardController')

const router = express.Router()

// PERIODIC DASHBOARD
router.get('/periodic', periodicDashboard)

// INTERVIEW DASHBOARD
//router.get('/interview', interviewDashboard)

module.exports = router