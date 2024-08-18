/*
Project: Hiring Portal Project
Author: HS
Date: 17/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |   Phase  | Description 
-------------------------------------------------------------------------------------------------------
02/08/2024  |  Harshini C               |  2         |   2      | Added logger library
-------------------------------------------------------------------------------------------------------
// */
const Roles = require("../collections/userroles");
const logger = require("../utility/logger");

const roles = ["admin", "user"];

async function populateRolesCollection() {
  try {
    const rolesCount = await Roles.countDocuments();
    if (rolesCount === 0) {
      for (const role of roles) {
        const newRole = new Roles({ userRoles: role });
        await newRole.save();
      }
      logger.info(`Roles added successfully!`);
    } else {
      logger.info("Roles collection already populated.");
    }
  } catch (error) {
    logger.error("Error inserting User roles", error);
  }
}

module.exports = { populateRolesCollection };
