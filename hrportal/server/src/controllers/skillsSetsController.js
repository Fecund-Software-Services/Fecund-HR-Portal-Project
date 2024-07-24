/*
Project: Hiring Portal Project
Author: Harshini C
Date: 17/07/2024
Sprint: 1
Phase : 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint   | Phase | Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

const logger = require('../utils/logger');
const skillsSet = require('../collections/skillset');
const subSkillSet = require('../collections/subskillset');

//ONLOAD DISPLAY SKILL SETS
const onLoadSkillSet = async (req, res) => {
  try {
    const skillSetsOptions = await skillsSet.find(); // returns all skill sets

    if (!skillSetsOptions.length) {
      return res.status(404).json({ message: "Error: None!" });
    }
    res.json(skillSetsOptions); 
    } catch (error) {
      logger.error(error);
      res.status(500).send("Error searching skill sets"); 
    }
};

//SEARCH BAR DISPLAY SKILL SETS AS TYPED
/*const searchSkillSet = async (req, res) => {
  try {
    let query = {};
    const searchTerms = [];

  if (firstName) {
    searchTerms.push({ firstName: new RegExp("^" + firstName + "$", "i") });
  }
 
  query = { $or: searchTerms };

    const skillSetsOptions = await skillsSet.find(query,"skillname"); // returns all skill sets

    if (!skillSetsOptions.length) {
      return res.status(404).json({ message: "Error: None!" });
    }
    res.json(skillSetsOptions); 
    } catch (error) {
      logger.error(error);
      res.status(500).send("Error searching skill sets"); 
    }
};*/

// ADD NEW SKILLSET
const addSkillSet = async (req, res) => {
  try {
    const skillname = req.body;

    // CHECKING IF THE SKILL SET ALREADY EXISTS
    let existingSkillSet;
    try {
        existingSkillSet = await skillsSet.findOne({ skillname });
    } catch (error) {
      logger.error(error);
    }

    if (existingSkillSet) {
      return res
        .status(400)
        .json({ message: "Error: Main Skill Set you are adding is already present!" });
    }

    // ADDING IN A NEW CANDIDATE
    const skillsSet = new skillsSet({
        skillname
    });
    await skillsSet.save();

    return res.status(201).json({ message: " Skill Set added Successfully" });
  } catch (error) {
    logger.error(error.message);
  }
};

// EDIT SELECTED SKILL SET
const editSkillSet = async (req, res) => {
  //const skillnameId = req.params.id;
  const filter = { _id: skillnameId };

  const update = {
    $set: {
      skillname: req.body.skillname
    },
  };

  try {
    const result = await skillsSet.updateOne(filter, update);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: "Error: Update failed!" });
  }
};

// ADD NEW SUB SKILL SET
const addSubSkillSet = async (req, res) => {
    try {
      const subsetname = req.body;
  
      // CHECKING IF THE SKILL SET ALREADY EXISTS
      let existingSubSkillSet;
      try {
          existingSubSkillSet = await subSkillSet.findOne({ subsetname });
      } catch (error) {
        logger.error(error);
      }
  
      if (existingSubSkillSet) {
        return res
          .status(400)
          .json({ message: "Error: Sub Skill Set you are adding is already present" });
      }
  
      // ADDING IN A NEW CANDIDATE
      const subSkillSet = new subSkillSet({
        subsetname
      });
      await subSkillSet.save();
  
      return res.status(201).json({ message: "Sub Skill Set added Successfully" });
    } catch (error) {
      logger.error(error.message);
    }
  };
  
  // EDIT SELECTED SUB SKILL SET
  const editSubSkillSet = async (req, res) => {
    //const skillnameId = req.params.id;
    const filter = { _id: subsetname };
  
    const update = {
      $set: {
        subsetname: req.body.subsetname
      },
    };
  
    try {
      const result = await subSkillSet.updateOne(filter, update);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ message: "Error: Update failed!" });
    }
  };
  
module.exports = {
    onLoadSkillSet,
    searchSkillSet,
    addSkillSet,
    editSkillSet,
    addSubSkillSet,
    editSubSkillSet
};
