/*
Project: Hiring Portal Project
Author: HS
Date: 21/08/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------
2/9/24     | HS                      |5        |2     | INTERVIEW DASHBOAD
3/9/24     | HS                      |5        |2     | JOINING DASHBOARD
4/9/24     | HS                      |5        |2     | DEFFERED DASHBOARD
-------------------------------------------------------------------------------------------------------
// */
const express = require('express')

const {periodicDashboard, interviewDashboard, joiningDashBoard, deferredDashbaord} = require('../controllers/dashboardController')

const router = express.Router()

// PERIODIC DASHBOARD
router.get('/periodic', periodicDashboard)

// INTERVIEW DASHBOARD
router.get('/interview', interviewDashboard)

// JOINING DASHBOARD
router.get('/joining', joiningDashBoard)

// DEFERRED DASHBOARD
router.get('/deferred', deferredDashbaord)

module.exports = router