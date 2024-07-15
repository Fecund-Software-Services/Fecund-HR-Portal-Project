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
// */
const SubSkillSet = require('../collections/subskillset');
const SkillSet = require('../collections/skillset');
const skills = require('./skillsConstants')

// Adding some predefined values foe skill set and subskill set
async function insertData() {
    try {
       // defining Guidewire subskillsets
      const subSkillSetGWDEVPC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Development.PC, mainSkillID: null});
      const subSkillSetGWDEVCC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Development.CC, mainSkillID: null});
      const subSkillSetGWDEVBC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Development.BC, mainSkillID: null});
      
      const subSkillSetGWBAPC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.BusinessAnalyst.PC, mainSkillID: null});
      const subSkillSetGWBACC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.BusinessAnalyst.CC, mainSkillID: null});
      const subSkillSetGWBABC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.BusinessAnalyst.BC, mainSkillID: null});
     
      const subSkillSetGWLeadPC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Lead.PC, mainSkillID: null});
      const subSkillSetGWLeadCC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Lead.CC, mainSkillID: null});
      const subSkillSetGWLeadBC = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Lead.BC, mainSkillID: null});

      const subSkillSetGWIntegration = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Other.IntegrationDeveloper, mainSkillID: null});
      const subSkillSetGWArchitect = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Other.Architect, mainSkillID: null});
      const subSkillSetGWPortal = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Other.Portal, mainSkillID: null});
      const subSkillSetGWDatahub = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Other.Datahub, mainSkillID: null});
      const subSkillSetGWInfocenter = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Other.Infocentre, mainSkillID: null});
      const subSkillSetGWBackend = await SubSkillSet.create({ subsetname: skills.skillsets.Guidewire.Other.BackendDeveloper, mainSkillID: null});
      // defining main Guidewire skillset
      const skillSetGWData = {
        skillname: 'Guidewire',
        subskillset: [subSkillSetGWDEVPC._id, subSkillSetGWDEVCC._id, subSkillSetGWDEVBC._id,
          subSkillSetGWBAPC._id, subSkillSetGWBACC._id, subSkillSetGWBABC._id,
          subSkillSetGWLeadPC._id, subSkillSetGWLeadCC._id, subSkillSetGWLeadBC._id,
          subSkillSetGWIntegration._id, subSkillSetGWArchitect._id, subSkillSetGWPortal._id,
          subSkillSetGWDatahub._id, subSkillSetGWInfocenter._id, subSkillSetGWBackend._id]
      };


       // defining Salesforce subskillsets
       const subSkillSetSFQA = await SubSkillSet.create({ subsetname: skills.skillsets.Salesforce.QualityAssurance, mainSkillID: null});
       const subSkillSetSFBA = await SubSkillSet.create({ subsetname: skills.skillsets.Salesforce.BusinessAnalyst, mainSkillID: null});
       const subSkillSetSFDev = await SubSkillSet.create({ subsetname: skills.skillsets.Salesforce.Developer,mainSkillID: null});
      // defining main Salesforce skillset
      const skillSetSalesforceData = {
        skillname: 'Salesforce',
        subskillset: [subSkillSetSFQA._id, subSkillSetSFBA._id, subSkillSetSFDev._id]
      };
      
      // defining Oneshield subskillsets
      const subSkillSetOSQA = await SubSkillSet.create({ subsetname: skills.skillsets.Oneshield.QualityAssurance, mainSkillID: null});
      const subSkillSetOSBA = await SubSkillSet.create({ subsetname: skills.skillsets.Oneshield.BusinessAnalyst, mainSkillID: null });
      const subSkillSetOSDev = await SubSkillSet.create({ subsetname: skills.skillsets.Oneshield.Developer, mainSkillID: null});
      const subSkillSetOSArchitect = await SubSkillSet.create({ subsetname: skills.skillsets.Oneshield.Architect, mainSkillID: null});
      const subSkillSetOSLead = await SubSkillSet.create({ subsetname: skills.skillsets.Oneshield.Lead, mainSkillID: null });
      const subSkillSetOSDesigner = await SubSkillSet.create({ subsetname: skills.skillsets.Oneshield.Designer, mainSkillID: null});
      // defining main Oneshield skillset
      const skillSetOneshieldData = {
        skillname: 'Oneshield',
        subskillset: [subSkillSetOSQA._id, subSkillSetOSBA._id, subSkillSetOSDev._id,
          subSkillSetOSArchitect._id, subSkillSetOSLead._id, subSkillSetOSDesigner._id]
      };

      // defining other subskillsets
      const othersubSkillBA = await SubSkillSet.create({ subsetname: skills.skillsets.Other.BA, mainSkillID: null});
      const othersubSkillTechnicalSpecialist = await SubSkillSet.create({ subsetname: skills.skillsets.Other.TechnicalSpecialist, mainSkillID: null });
      const othersubSkillRecruitment = await SubSkillSet.create({ subsetname: skills.skillsets.Other.Recruitment, mainSkillID: null});
      const othersubSkillBDE = await SubSkillSet.create({ subsetname: skills.skillsets.Other.BDE,mainSkillID: null});
      const othersubSkillDuckCreek = await SubSkillSet.create({ subsetname: skills.skillsets.Other.Duckcreek, mainSkillID: null });
      const othersubSkillColdfusion = await SubSkillSet.create({ subsetname: skills.skillsets.Other.Coldfusion, mainSkillID: null});
      const othersubSkillDigitalMarketer = await SubSkillSet.create({ subsetname: skills.skillsets.Other.DME , mainSkillID: null});
      const othersubSkillMulesoft = await SubSkillSet.create({ subsetname: skills.skillsets.Other.Mulesoft, mainSkillID: null});
      const othersubSkillScrum = await SubSkillSet.create({ subsetname: skills.skillsets.Other.Scrum, mainSkillID: null });
      const othersubSkillProjectLead = await SubSkillSet.create({ subsetname: skills.skillsets.Other.PL, mainSkillID: null});
      const othersubSkillPowerBI = await SubSkillSet.create({ subsetname: skills.skillsets.Other.PowerBI, mainSkillID: null });
      const othersubSkillDevops = await SubSkillSet.create({ subsetname: skills.skillsets.Other.Devops, mainSkillID: null});
      // defining main Others Skillset
      const otherskillSetData = {
        skillname: 'Other',
        subskillset: [othersubSkillBA._id, othersubSkillTechnicalSpecialist._id, othersubSkillRecruitment._id,
          othersubSkillBDE._id, othersubSkillDuckCreek._id, othersubSkillColdfusion._id,
          othersubSkillDigitalMarketer._id, othersubSkillMulesoft._id, othersubSkillScrum._id,
          othersubSkillProjectLead._id, othersubSkillPowerBI._id, othersubSkillDevops._id]
      };

      //Inserting SkillSet with populated subskillset
      const insertedSkillSetGW = await SkillSet.create(skillSetGWData);
      const insertedSkillSetSalesforce = await SkillSet.create(skillSetSalesforceData);
      const insertedSkillSetOneshield = await SkillSet.create(skillSetOneshieldData);
      const insertedSkillSetOthers = await SkillSet.create(otherskillSetData);

      // adding the reference id to GW subskillset
      subSkillSetGWDEVPC.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWDEVCC.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWDEVBC.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWBAPC.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWBACC.mainSkillID = insertedSkillSetGW._id; 
      subSkillSetGWBABC.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWLeadPC.mainSkillID =  insertedSkillSetGW._id;
      subSkillSetGWLeadCC.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWLeadBC.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWIntegration.mainSkillID =  insertedSkillSetGW._id;
      subSkillSetGWArchitect.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWPortal.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWDatahub.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWInfocenter.mainSkillID = insertedSkillSetGW._id;
      subSkillSetGWBackend.mainSkillID = insertedSkillSetGW._id;

      await subSkillSetGWDEVPC.save();
      await subSkillSetGWDEVCC.save();
      await subSkillSetGWDEVBC.save();
      await subSkillSetGWBAPC.save();
      await subSkillSetGWBACC.save();
      await subSkillSetGWBABC.save();
      await subSkillSetGWLeadPC.save();
      await subSkillSetGWLeadCC.save();
      await subSkillSetGWLeadBC.save();
      await subSkillSetGWIntegration.save();
      await subSkillSetGWArchitect.save();
      await subSkillSetGWPortal.save();
      await subSkillSetGWDatahub.save();
      await subSkillSetGWInfocenter.save();
      await subSkillSetGWBackend.save();

      // adding the reference id to salesforce  subskillset
      subSkillSetSFQA.mainSkillID = insertedSkillSetSalesforce._id; 
      subSkillSetSFBA.mainSkillID = insertedSkillSetSalesforce._id;
      subSkillSetSFDev.mainSkillID = insertedSkillSetSalesforce._id;

      await subSkillSetSFQA.save(); 
      await subSkillSetSFBA.save();
      await subSkillSetSFDev.save();

      // adding the reference id to oneshield subskillset
      subSkillSetOSQA.mainSkillID = insertedSkillSetOneshield._id;
      subSkillSetOSBA.mainSkillID = insertedSkillSetOneshield._id;
      subSkillSetOSDev.mainSkillID = insertedSkillSetOneshield._id;
      subSkillSetOSArchitect.mainSkillID = insertedSkillSetOneshield._id;
      subSkillSetOSLead.mainSkillID = insertedSkillSetOneshield._id;
      subSkillSetOSDesigner.mainSkillID = insertedSkillSetOneshield._id;

      await subSkillSetOSQA.save();
      await subSkillSetOSBA.save();
      await subSkillSetOSDev.save();
      await subSkillSetOSArchitect.save();
      await subSkillSetOSLead.save();
      await subSkillSetOSDesigner.save();

      // adding the refernce id to Other subskillset
      othersubSkillBA.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillTechnicalSpecialist.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillRecruitment.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillBDE.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillDuckCreek.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillColdfusion.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillDigitalMarketer.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillMulesoft.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillScrum.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillProjectLead.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillPowerBI.mainSkillID = insertedSkillSetOthers._id;
      othersubSkillDevops.mainSkillID = insertedSkillSetOthers._id;

      await othersubSkillBA.save();
      await othersubSkillTechnicalSpecialist.save();
      await othersubSkillRecruitment.save();
      await othersubSkillBDE.save();
      await othersubSkillDuckCreek.save();
      await othersubSkillColdfusion.save();
      await othersubSkillDigitalMarketer.save();
      await othersubSkillMulesoft.save();
      await othersubSkillScrum.save();
      await othersubSkillProjectLead.save();
      await othersubSkillPowerBI.save();
      await othersubSkillDevops.save();

      console.log('SkillSet successfully inserted!');
    }catch (err) {
      console.error('Error inserting data:', err);
    }
  }
async function checkAndPopulateData() {
  const existingSkillSet = await SkillSet.findOne(); // Check for any documents
  if (!existingSkillSet) {
    await insertData();
  } else {
    console.log('Data already populated in the database.');
  }
}
checkAndPopulateData()
module.exports = { checkAndPopulateData };