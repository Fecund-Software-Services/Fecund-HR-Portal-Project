/*
Project: Hiring Portal Project
Author: Harshini C
Date: 10/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/
const SubSkillSet = require('../collections/subskillset');
const SkillSet = require('../collections/skillset');

// Adding some predefined values foe skill set and subskill set
async function insertData() {
    try {
       // defining Guidewire subskillsets
      const subSkillSetGW1 = await SubSkillSet.create({ subsetname: 'Guidewire QA' });
      const subSkillSetGW2 = await SubSkillSet.create({ subsetname: 'Guidewire BA'});
      const subSkillSetGW3 = await SubSkillSet.create({ subsetname: 'Guidewire Dev'});
        
     // defining main Guidewire skillset
      const skillSetGWData = {
        skillname: 'Guidewire',
        subskillset: [subSkillSetGW1._id, subSkillSetGW2._id, subSkillSetGW3._id]
      };

       // defining Salesforce subskillsets
       const subSkillSetSF1 = await SubSkillSet.create({ subsetname: 'Salesforce QA' });
       const subSkillSetSF2 = await SubSkillSet.create({ subsetname: 'Salesforce BA' });
       const subSkillSetSF3 = await SubSkillSet.create({ subsetname: 'Salesforce Dev' });

      // defining main Salesforce skillset
      const skillSetSalesforceData = {
        skillname: 'Salesforce',
        subskillset: [subSkillSetSF1._id, subSkillSetSF2._id, subSkillSetSF3._id]
      };
  
      //Insert SkillSet with populated subskillset
      const insertedSkillSet = await SkillSet.create(skillSetGWData, skillSetSalesforceData);


      
      console.log('SkillSet successfully inserted!', insertedSkillSet);
    } catch (err) {
      console.error('Error inserting data:', err);
    }
  }
insertData();