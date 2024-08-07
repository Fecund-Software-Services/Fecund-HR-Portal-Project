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
1/8/2024    |  Omkar                    |   2        | Added On LoadSubskill route for Integration
7/8/24      | HS                      |3         |2    | Added search functionality
-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const skillSet = require('../collections/skillset')
const subSkillSet = require('../collections/subskillset')

const {onLoadSkillSet,addSkillSet, addSubSkillSet, editSkillSet, editSubSkillSet,onLoadSubskill, searchSkillSet} = require('../controllers/skillsSetsController')

// for creating the instance of the route
const router = express.Router()

//onload skill set  
router.get('/onLoadSkillSet', onLoadSkillSet)

//load subskills based on sslected main skill
router.get('/onLoadSubskill/:id', onLoadSubskill)

//search bar for skills
router.get('/search-skills', searchSkillSet)

// add a new skill set
router.post('/addSkillSet', addSkillSet)

// add a new sub skill set 
router.post('/addSubSkillSet', addSubSkillSet)

// edit skill set
router.put('/editSkillSet/:id', editSkillSet)

// edit sub skill set 
router.put('/editSubSkillSet/:id', editSubSkillSet)

// exporting router
module.exports = router