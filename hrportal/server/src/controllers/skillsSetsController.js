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
1/8/2024    |  Omkar                  | 2        | 2     | Added On LoadSubskill route for Integration
02/08/2024  |  Harshini C             | 2        | 2     | Added logger library
7/8/24      | HS                      |  2       |2      |  Added search functionality
8/8/2024    |  Omkar                  |  2       |  2    | modified onLoad and Search functions
14/08/2024  |     Omkar               |   2      |  2    | Updated Search Functionality
05/9/24     | HS                      |5        |2     | Code refactor
-------------------------------------------------------------------------------------------------------
*/

const logger = require("../utility/logger");
const skillsSet = require("../collections/skillset");
const subSkillSet = require("../collections/subskillset");

// ONLOAD DISPLAY SKILL SETS
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

// ONLOAD DISPLAY SUB SKILL SETS
const onLoadSubskill = async (req, res) => {
  try {
    const skillId = req.params.id;

    if (!skillId || skillId === "None") {
      // If skillId is "None" or not provided, fetch all subskills
      const subskills = await subSkillSet.find(); // Fetch all subskills
      return res.json(subskills);
    }

    const filter = { _id: skillId };

    // Check if the skillset exists
    const skillset = await skillsSet.findById(filter);
    if (!skillset) {
      return res.status(404).json({ message: 'Skillset not found' });
    }

    // Fetch subskills associated with the skillset
    const subskills = await subSkillSet.find({ mainSkillID: skillId });

    res.json(subskills);
  } catch (error) {
    logger.error('Error fetching subskills:', error);
    res.status(500).json({ message: 'Server error while fetching subskills' });
  }
}


// Search results based o main skills selected in dropdown
const searchSkillSet = async (req, res) => {
  try {
    const { skills: searchQuery, mainSkillId } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const regex = new RegExp(`^${searchQuery}`, 'i');

    // Build the query filter based on the presence of mainSkillId
    const filter = { subsetname: regex };
    if (mainSkillId && mainSkillId !== "None") {
      filter.mainSkillID = mainSkillId;
    }

    // Search in Subskillset collection with an optional filter for mainSkillID
    const subskillsetResults = await subSkillSet.find(filter);

    const combinedResults = [];

    // Add subskills with their respective main skills to the results
    for (const subskill of subskillsetResults) {
      const relatedMainSkill = await skillsSet.findById(subskill.mainSkillID);
      if (relatedMainSkill) {
        combinedResults.push({
          mainSkillName: relatedMainSkill.skillname,
          subSkillName: subskill.subsetname,
        });
      }
    }

    if (combinedResults.length === 0) {
      return res.status(200).json([]); // Return an empty array if no results
    }

    return res.status(200).json(combinedResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'An error occurred while searching', error: error.message });
  }
};



// ADD NEW SKILLSET
const addSkillSet = async (req, res) => {
  try {
    const {skillname} = req.body;
    // CHECKING IF THE SKILL SET ALREADY EXISTS
    let existingSkillSet;
    try {
        existingSkillSet = await skillsSet.findOne({skillname: {$regex: new RegExp(`^${skillname}$`, 'i')}});
    } catch (error) {
      logger.error(error);
    }

    if (existingSkillSet) {
      return res.status(400).json({ message: "Error: Main Skill Set you are adding is already present!" });
    }

    // ADDING IN A NEW CANDIDATE
    const newSkillsSet = new skillsSet(
        {skillname}
    );
    await newSkillsSet.save();
    res.json(newSkillsSet)
    return res.status(201).json({ message: " Skill Set added Successfully" });
  } catch (error) {
    logger.error('Error adding the skill set');
  }
};

// EDIT SELECTED SKILL SET
const editSkillSet = async (req, res) => {
  const skillnameId = req.params.id;
  const newSkillName = req.body.skillname;

  try {
    const existingSkill = await skillsSet.findOne({
      skillname:{ $regex: new RegExp(`^${newSkillName}$`, 'i') },
      _id: { $ne: skillnameId }
    });

    if (existingSkill) {
      return res.status(400).json({ message: "Error: Updated skill name matches an existing skillset!" });
    }
    const filter = { _id: skillnameId };
    const update = {$set: {skillname: newSkillName }}

    const updatedSkill = await skillsSet.findOneAndUpdate(filter, update, { new: true });

    if (!updatedSkill) {
      return res.status(404).send('Status Not Found!');
    }
    return res.status(201).json({message: "SkillSet updated successfully", skillset: updatedSkill});
  } catch (err) {
    return res.status(400).json({ message: "Error: Update failed!" });
  }
};

// ADD NEW SUB SKILL SET
const addSubSkillSet = async (req, res) => {
  try {
    const { subsetname, mainSkillID } = req.body;
    
    // to check if a subskillset with the same name already exists
    const existingsubSkillset = await subSkillSet.findOne({
      subsetname: {$regex: new RegExp(`^${subsetname}$`, 'i')},
      mainSkillID
    });
    if (existingsubSkillset) {
      return res.status(400).json({message: "Error: Subskillset with the name already exists"});
    }
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
    
    // to check if the name already exists for another subskillset
    if(subsetname) {
      const existingSubSkillSet = await subSkillSet.findOne({
        subsetname: { $regex: new RegExp(`^${subsetname}$`, 'i')},
        mainSkillID: mainSkillID || subskillset.mainSkillID,
        _id: {$ne: id}
      });
      if (existingSubSkillSet) {
        return res.status(400).json({message: "Error: Another Subskillset with this name already exists"})
      }
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
  searchSkillSet,
  addSkillSet,
  editSkillSet,
  addSubSkillSet,
  editSubSkillSet,
  onLoadSubskill
};
