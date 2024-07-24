/*
Project: Hiring Portal Project
Author: HS
Date: 17/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */

const Status = require('../collections/status')

// Status 
const statuses = [
    'Submitted',
    'Scheduled R1',
    'Scheduled R2',
    'Cleared 1st Round',
    'Cleared 2nd Round',
    'Offer Issued',
    'On Hold R1',
    'On Hold R2',
    'Rejected R1',
    'Rejected R2',
    'Offer Withdrawn',
    'Candidate not Interested',
    'Negotiation Stage',
    'Another Offer/Backed out',
    'Other',
];

// Adding some predefined values for status
async function populateStatusCollection() {
    try {
      const statusCount = await Status.countDocuments();
      if (statusCount === 0) {
        for (const status of statuses) {
          const newStatus = new Status({ name: status });
          await newStatus.save();
        }
        console.log(`Status added successfully!`);
    } else {
      console.log('Status collection already populated.');
    }
    } catch (error) {
        console.error('Error inserting Status', error)
  }
  }

  module.exports = { populateStatusCollection };