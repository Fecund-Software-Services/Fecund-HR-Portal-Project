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

const logger = require("../utils/logger");
const skillsSet = require("../collections/skillset");
const subSkillSet = require("../collections/subskillset");

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
// ADD NEW SKILLSET
const addSkillSet = async (req, res) => {
  try {
    const {skillname}  = req.body;
    // console.log(skillname)
 
    // CHECKING IF THE SKILL SET ALREADY EXISTS
    let existingSkillSet;
    try {
        existingSkillSet = await skillsSet.findOne(req.body);
    } catch (error) {
      logger.error(error);
    }
 
    if (existingSkillSet) {
      return res.status(400).json({ message: "Error: Main Skill Set you are adding is already present!" });
    }
 
    // ADDING IN A NEW CANDIDATE
    const newSkillsSet = new skillsSet(
        req.body
    );
    await newSkillsSet.save();
 
    return res.status(201).json({ message: " Skill Set added Successfully" });
  } catch (error) {
    logger.error('Error adding the skill set');
  }
};

// EDIT SELECTED SKILL SET
const editSkillSet = async (req, res) => {
  const skillnameId = req.params.id;
  const filter = { _id: skillnameId };
console.log(filter , req.body)
  const update = {
    $set: {
      skillname: req.body.skillname,
    },
  };

  try {
    const updatedSkill = await skillsSet.findOneAndUpdate(filter, update, { new: true });
    console.log(updatedSkill)
    if (!updatedSkill) {
        return res.status(404).send('Status Not Found!');
    }
    return res.status(201).json(updatedSkill);
  } catch (err) {
    return res.status(400).json({ message: "Error: Update failed!" });
  }
};

// ADD NEW SUB SKILL SET
const addSubSkillSet = async (req, res) => {
  try {
    const { subsetname, mainSkillID } = req.body;
    
    // Create new subskillset
    const newSubSkillset = new subSkillSet({ subsetname, mainSkillID });
    const savedSubSkillset = await newSubSkillset.save();
    
    // Update the corresponding skillset
    await skillsSet.findByIdAndUpdate(
      mainSkillID,
      { $push: { subskillset: savedSubSkillset._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(savedSubSkillset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// EDIT SELECTED SUB SKILL SET
const editSubSkillSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { subsetname, mainSkillID } = req.body;
    
    const subskillset = await subSkillSet.findById(id);
    
    if (!subskillset) {
      return res.status(404).json({ message: 'SubSkillset not found' });
    }
    
    // If mainSkillID is changed, update the old and new Skillset documents
    if (mainSkillID && subskillset.mainSkillID.toString() !== mainSkillID) {
      // Remove subskillset from old skillset
      await skillsSet.findByIdAndUpdate(
        subskillset.mainSkillID,
        { $pull: { subskillset: id } },
        { new: true, useFindAndModify: false }
      );
      
      // Add subskillset to new skillset
      await skillsSet.findByIdAndUpdate(
        mainSkillID,
        { $push: { subskillset: id } },
        { new: true, useFindAndModify: false }
      );
    }
    
    // Update the subskillset
    const updatedSubSkillset = await subSkillSet.findByIdAndUpdate(
      id,
      { subsetname, mainSkillID },
      { new: true, runValidators: true }
    );
    
    res.json(updatedSubSkillset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  onLoadSkillSet,
  // searchSkillSet,
  addSkillSet,
  editSkillSet,
  addSubSkillSet,
  editSubSkillSet,
};
