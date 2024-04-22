/*
Project: Hiring Portal Project
Author: HS
Date: 17/4/2024
Sprint: Sprint 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/ 

const Candidate = require("../collections/candidates");
const Resume = require("../collections/resumes")

const addCandidate = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        skillSet,
        otherSkillSet,
        itExperience,
        totalRelevantExperience,
        currentCompany,
        currentCTC,
        expectedCTC,
        noticePeriod,
        servingNoticePeriod,
        lastWorkingDay,
        status,
        certified,
        comments,
        resumeUploaded
      } = req.body;
  
  
      // CHECKING IF THE CANDIDATE ALREADY EXISTS
      let existingCandidate;
      try {
        existingCandidate = await Candidate.findOne({ emailAddress });
      } catch (error) {
        console.log(error.message);
      }
  
      if (existingCandidate) {
        return res.status(400).json({ message: "Error: Candidate already exists!" });
      }
  
  
      // ADDING IN A NEW CANDIDATE
      const candidate = new Candidate({
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        skillSet,
        otherSkillSet,
        itExperience,
        totalRelevantExperience,
        currentCompany,
        currentCTC,
        expectedCTC,
        noticePeriod,
        servingNoticePeriod,
        lastWorkingDay,
        certified,
        comments,
        resumeUploaded
      });
      await candidate.save();
      return res.status(201).json({message: " Candidate added Successfully"});
    } catch (error) {
      console.log(error.message);
    }
  };

module.exports = { addCandidate };