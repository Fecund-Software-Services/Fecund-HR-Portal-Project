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
const Roles = require('../collections/userroles')

const roles = [
    "admin",
    "user"
];

async function populateRolesCollection() {
    try {
      const rolesCount = await Roles.countDocuments();
      if (rolesCount === 0) {
        for (const role of roles) {
          const newRole = new Roles({ userRoles: role});
          await newRole.save();
        }
        console.log(`Roles added successfully!`);
    } else {
      console.log('Roles collection already populated.');
    }
    } catch (error) {
        console.error('Error inserting User roles', error)
  }
  }


module.exports = { populateRolesCollection };
