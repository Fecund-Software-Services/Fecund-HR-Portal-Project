/*
Project: Hiring Portal Project
Author: HS
Date: 21/08/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------
2/9/24     | HS                      |5        |2     | INTERVIEW DASHBOAD
3/9/24     | HS                      |5        |2     | INTERVIEW DASHBOAD<hover feature to include full name>
3/9/24     | HS                      |5        |2     | JOINING DASHBOARD
-------------------------------------------------------------------------------------------------------
// */

const Candidate = require("../collections/candidates");
const Skillset = require("../collections/skillset");
const subSkillSet = require("../collections/subskillset");
const Status = require("../collections/status");

// Helper function to get the latest status within a given date range
const getLatestStatusInRange = (statusHistory, startDate, endDate) => {
  const filteredStatuses = statusHistory.filter(
    sh => sh.updatedAt >= new Date(startDate) && sh.updatedAt <= new Date(endDate)
  );
  return filteredStatuses.length > 0
    ? filteredStatuses.reduce((latest, current) =>
        current.updatedAt > latest.updatedAt ? current : latest
      ).status
    : null;
};

//PERIODIC DASHBOARD
const periodicDashboard = async (req, res) => {
  try {
    const { startDate, endDate, skillset } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start Date and End Date are required' });
    }

    // TO Ensure start date is before end date
    if (startDate > endDate) {
      return res.status(400).json({ message: 'Start date cannot be after end date.' });
    }

    const allStatuses = await Status.find({});
    const interviewedStatuses = allStatuses
      .filter(status => !['Submitted'].includes(status.name))
      .map(status => status.name);

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

    const candidates = await Candidate.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      ...subskillFilter
    });

    const result = candidates.reduce((acc, candidate) => {
      const latestStatus = getLatestStatusInRange(candidate.statusHistory, startDate, endDate);
      if (!latestStatus || !interviewedStatuses.includes(latestStatus)) return acc;

      const exp = candidate.itExperience;
      const subskill = candidate.subskillset;

      if (!acc[exp]) acc[exp] = { subskills: {}, offered: 0, negotiation: 0, backedOut: 0 };
      if (!acc[exp].subskills[subskill]) acc[exp].subskills[subskill] = 0;

      acc[exp].subskills[subskill]++;
      if (latestStatus === 'Offer Issued') acc[exp].offered++;
      if (latestStatus === 'Negotiation Stage') acc[exp].negotiation++;
      if (['Another Offer/Backed out', 'Candidate not Interested'].includes(latestStatus)) acc[exp].backedOut++;

      return acc;
    }, {});

    const formattedResult = Object.entries(result).map(([exp, data]) => ({
      exp,
      subskills: data.subskills,
      offered: data.offered,
      negotiation: data.negotiation,
      backedOut: data.backedOut
    }));

    // Calculate totals
    const total = formattedResult.reduce((acc, curr) => {
      Object.keys(curr.subskills).forEach(key => {
        acc.subskills[key] = (acc.subskills[key] || 0) + curr.subskills[key];
      });
      acc.offered += curr.offered;
      acc.negotiation += curr.negotiation;
      acc.backedOut += curr.backedOut;
      return acc;
    }, { exp: 'Total', subskills: {}, offered: 0, negotiation: 0, backedOut: 0 });

    formattedResult.push(total);

    res.json(formattedResult);
    
  } catch (error) {
    console.error('Error fetching periodic dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// INTERVIEW DASHBOARD
const interviewDashboard = async (req, res) => {
  try {
    const { startDate, endDate, skillset } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start Date and End Date are required' });
    }

    // TO Ensure start date is before end date
    if (startDate > endDate) {
      return res.status(400).json({ message: 'Start date cannot be after end date.' });
    }

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

    const candidates = await Candidate.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      ...subskillFilter
    }).select({ firstName: 1, lastName:1, statusHistory: 1, subskillset: 1, status:1 });

    const result = candidates.reduce((acc, candidate) => {
      const latestStatus = getLatestStatusInRange(candidate.statusHistory, startDate, endDate);
      if (!latestStatus) {
        if (candidate.status === 'Submitted') {
          const position = candidate.subskillset;
          if (!acc[position]) {
            acc[position] = {
              noOfCandidatesApproached: 0,
              candidatesNotInterested: 0,
              firstRoundScheduled: 0,
              rejectedRound1: 0,
              onHoldRound1: 0,
              clearedRound1: 0,
              secondRoundScheduled: 0,
              rejectedRound2: 0,
              onHoldRound2: 0,
              clearedRound2: 0,
              negotiationStage: 0,
              offerWithdrawn: 0,
              offerAccepted: 0,
              candidateBackedOut: 0,
              candidateNames: {}
            };
          }
          acc[position].noOfCandidatesApproached++;
      
          acc[position].candidateNames[candidate.status] = acc[position].candidateNames[candidate.status] || [];
          acc[position].candidateNames[candidate.status].push(`${candidate.firstName} ${candidate.lastName}`.trim());
        }
        return acc;
      }

      const position = candidate.subskillset;
      if (!acc[position]) {
        acc[position] = {
          noOfCandidatesApproached: 0,
          candidatesNotInterested: 0,
          firstRoundScheduled: 0,
          rejectedRound1: 0,
          onHoldRound1: 0,
          clearedRound1: 0,
          secondRoundScheduled: 0,
          rejectedRound2: 0,
          onHoldRound2: 0,
          clearedRound2: 0,
          negotiationStage: 0,
          offerWithdrawn: 0,
          offerAccepted: 0,
          candidateBackedOut: 0,
          candidateNames: {}
        };
      }

      acc[position].noOfCandidatesApproached++;

      switch (latestStatus) {
        case 'Candidate not Interested':
          acc[position].candidatesNotInterested++;
          break;
        case 'Scheduled R1':

          acc[position].firstRoundScheduled++;
          break;
        case 'Rejected R1':
          acc[position].rejectedRound1++;
          acc[position].firstRoundScheduled++;
          break;
        case 'On Hold R1':
          acc[position].onHoldRound1++;
          acc[position].firstRoundScheduled++;
          break;
        case 'Cleared 1st Round':
          acc[position].clearedRound1++;
          acc[position].firstRoundScheduled++;
          break;
        case 'Scheduled R2':
          acc[position].secondRoundScheduled++;
          acc[position].firstRoundScheduled++;
          break;
        case 'Rejected R2':
          acc[position].rejectedRound2++;
          acc[position].firstRoundScheduled++;
          acc[position].secondRoundScheduled++;
          break;
        case 'On Hold R2':
          acc[position].onHoldRound2++;
          acc[position].firstRoundScheduled++;
          acc[position].secondRoundScheduled++;
          break;
        case 'Cleared 2nd Round':
          acc[position].clearedRound2++;
          acc[position].firstRoundScheduled++;
          acc[position].secondRoundScheduled++;
          break;
        case 'Negotiation Stage':
          acc[position].negotiationStage++;
          acc[position].firstRoundScheduled++;
          acc[position].secondRoundScheduled++;
          break;
        case 'Offer Withdrawn':
          acc[position].offerWithdrawn++;
          acc[position].firstRoundScheduled++;
          acc[position].secondRoundScheduled++;
          break;
        case 'Offer Issued':
          acc[position].offerAccepted++;
          acc[position].firstRoundScheduled++;
          acc[position].secondRoundScheduled++;
          break;
        case 'Another Offer/Backed out':
          acc[position].candidateBackedOut++;
          acc[position].firstRoundScheduled++;
          acc[position].secondRoundScheduled++;
          break;
      }
      //Add candidate name to the specific status
      acc[position].candidateNames[latestStatus] = acc[position].candidateNames[latestStatus] || [];
      acc[position].candidateNames[latestStatus].push(`${candidate.firstName} ${candidate.lastName}`.trim());
      return acc;
    }, {});

    const formattedResult = Object.entries(result).map(([position, data]) => ({
      position,
      ...data
    }));

    // Calculate totals
    const total = formattedResult.reduce((acc, curr) => {
      Object.keys(curr).forEach(key => {
        if (key !== 'position') {
          acc[key] = (acc[key] || 0) + curr[key];
        }
      });
      return acc;
    }, { position: 'TOTAL' });

    formattedResult.push(total);

    res.json(formattedResult);
  } catch (error) {
    console.error('Error fetching interview dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// JOINING DASHBOARD
const joiningDashBoard = async (req, res) => {
  try {
    const { startDate, endDate, sortOrder } = req.query;

    // CHECK FOR DATE
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start and end dates are required.' });
    }

    
    // CHECK FOR DATES
    if (startDate > endDate) {
      return res.status(400).json({ message: 'Start date cannot be after end date.' });
    }

    // QUERY BASED ON JOINING DATE
    const query = {
      joiningDate: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    // TO SORT
    const sorting = { joiningDate: sortOrder === 'desc' ? -1 : 1 };

    // TO FETCH CANDIDATES
    const candidates = await Candidate.find(query)
      .sort(sorting)

    const joinedCandidates = candidates.map(candidate => ({
      name: `${candidate.firstName} ${candidate.lastName}`.trim(),
      Position: candidate.subskillset,
      joiningDate: candidate.joiningDate.toString().split('T')[0],
    }));

    res.status(200).json(joinedCandidates)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {periodicDashboard,interviewDashboard,joiningDashBoard};