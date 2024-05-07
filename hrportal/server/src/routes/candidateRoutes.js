/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint   | Description 
-------------------------------------------------------------------------------------------------------
29/4/2024   | HS                      | 3        | Search candidate validation
30/4/2024   | HS                      | 3        | Edit candidate details
29/4/2024   | HS                      | 3        | Search candidate validation
29/4/2024   | Harshini C              | 3        | View Candidates applied in
05/07/2024  | HS                      | 3        | Resume Handling
-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const { addCandidate, searchCandidate, viewResume, viewCandidateByYearMonth, upload, editCandidate, viewCandidate } = require('../controllers/candidateController')

const router = express.Router()

// add new candidate
router.post('/add-candidate', upload.single('resume'), addCandidate)

// view candidate by field
router.get('/search-candidate', searchCandidate)

// view candidate by year and month
router.get('/view-candidate', viewCandidateByYearMonth)

// view single candidate
router.get('/view-candidate/:id', viewCandidate) 

// view resume
router.get('/view-resume/:filename', async (req,res) =>{
    const filename = req.params.filename;
    await viewResume(filename, res);
});

// edit existing candidate
router.post('/edit-candidate/:id', upload.single('resume'), editCandidate)

// exporting router
module.exports = router