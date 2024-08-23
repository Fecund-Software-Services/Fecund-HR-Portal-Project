/*
Project: Hiring Portal Project
Author: HS
Date: 21/08/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */

const Candidate = require("../collections/candidates");
const Skillset = require("../collections/skillset");
const subSkillSet = require("../collections/subskillset");
const Status = require("../collections/status");

const periodicDashboard = async (req, res) => {
  try {
    const { startDate, endDate, skillset } = req.body;

    // TO CHECK WHETHER FROM AND TO DATE ARE SPECIFIED
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start Date and End Date are required' });
    }

    // TO FILTER THOSE CANDIDATES WHO ARE INTERVIEWED 
    const allStatuses = await Status.find({});
    const interviewedStatuses = allStatuses
      .filter(status => !['Submitted', 'Scheduled R1'].includes(status.name))
      .map(status => status.name);

    // TO FETCH SUBSKILLS, IF MAINSKILLSET IS SELECTED SUBSKILLS RELATED TO THAT MAIN SKILL 
    let subskillFilter = {};
    let subskillNames = [];
    if (skillset) {
      const skillsetDoc = await Skillset.findById(skillset);
      if (skillsetDoc) {
        const subskills = await subSkillSet.find({ mainSkillID: skillset });
        subskillNames = subskills.map(s => s.subsetname);
        subskillFilter = { subskillset: { $in: subskillNames } };
      } else {
        return res.status(400).json({ error: 'Invalid skillset provided' });
      }
    }

    // FETCHING ALL THE CANDIDATES BETWEEN THE SPECIFIED DATE RANGE
    const result = await Candidate.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          status: { $in: interviewedStatuses },
          ...subskillFilter
        }
      },
      {
        $group: {
          _id: {
            exp: "$itExperience",
            subskillset: "$subskillset"
          },
          count: { $sum: 1 },
          offered: {
            $sum: { $cond: [{ $eq: ["$status", "Offer Issued"] }, 1, 0] }
          },
          negotiation: {
            $sum: { $cond: [{ $eq: ["$status", "Negotiation Stage"] }, 1, 0] }
          },
          backedOut: {
            $sum: { $cond: [
               { $or: [{ $eq: ["$status", "Another Offer/Backed out"] }, { $eq: ["$status","Candidate not Interested"] } ]}, 1, 0] }
          }
        }
      },
      {
        $group: {
          _id: "$_id.exp",
          subskills: {
            $push: {
              k: "$_id.subskillset",
              v: "$count"
            }
          },
          offered: { $sum: "$offered" },
          negotiation: { $sum: "$negotiation" },
          backedOut: { $sum: "$backedOut" }
        }
      },
      {
        $project: {
          _id: 0,
          exp: "$_id",
          subskills: { $arrayToObject: "$subskills" },
          offered: 1,
          negotiation: 1,
          backedOut: 1
        }
      },
    ]);

    // Calculate totals
    const total = result.reduce((acc, curr) => {
      Object.keys(curr.subskills).forEach(key => {
        acc.subskills[key] = (acc.subskills[key] || 0) + curr.subskills[key];
      });
      acc.offered += curr.offered;
      acc.negotiation += curr.negotiation;
      acc.backedOut += curr.backedOut;
      return acc;
    }, { exp: 'Total', subskills: {}, offered: 0, negotiation: 0, backedOut: 0 });

    result.push(total);

    res.json(result);
    
  } catch (error) {
    console.error('Error fetching periodic dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {periodicDashboard};