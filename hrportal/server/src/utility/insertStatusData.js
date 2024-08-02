/*
Project: Hiring Portal Project
Author: HS
Date: 17/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------
02/08/2024  |  Harshini C               |  2         |   2     |  Added logger library
-------------------------------------------------------------------------------------------------------
// */

const Status = require('../collections/status')
const logger = require('../utility/logger');

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
        logger.info(`Status added successfully!`);
    } else {
      logger.info('Status collection already populated.');
    }
    } catch (error) {
        logger.error('Error inserting Status', error)
  }
  }

  module.exports = { populateStatusCollection };