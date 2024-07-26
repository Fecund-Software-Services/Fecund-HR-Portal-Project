/*
Project: Hiring Portal Project
Author: Harshini C
Date: 16/07/2024
Sprint: Sprint 1
Phase : 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const skillSet = require('../collections/skillset')
const subSkillSet = require('../collections/subskillset')

const {onLoadSkillSet,addSkillSet, addSubSkillSet, editSkillSet, editSubSkillSet} = require('../controllers/skillsSetsController')

// for creating the instance of the route
const router = express.Router()

//onload skill set  
router.get('/onLoadSkillSet', onLoadSkillSet)

//search bar for skills
// router.get('/searchSkillSet', searchSkillSet)

// add a new skill set
router.post('/addSkillSet', addSkillSet)

// add a new sub skill set 
router.post('/addSubSkillSet', addSubSkillSet)

// edit skill set
router.put('/editSkillSet/:id', editSkillSet)

// edit sub skill set 
router.post('/editSubSkillSet', editSubSkillSet)

// exporting router
module.exports = router