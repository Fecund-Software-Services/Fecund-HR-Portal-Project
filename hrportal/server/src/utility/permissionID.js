/*
Project: Hiring Portal Project
Author: Harshini C
Date: 10/07/2024
Sprint: Phase 2 Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |  Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------
17/7/24     |  hs                       |  1        |   2     | Code formating and refactoring
02/08/2024  |  Harshini C               |  2        |   2     | Added logger library
-------------------------------------------------------------------------------------------------------
// */

const permission = require('../collections/userpermissions');
const logger = require('../utility/logger');

const employeeID = [
    "10023",
    "10049",
    "10073",
    "10074",
    "10077"

]

async function populatePemissionCollection() {
    try {
        const permissionCount = await permission.countDocuments();
        if (permissionCount == 0) {
            for (const id of employeeID) {
                const newPermission = new permission({userPermissions: id});
                await newPermission.save();
            }
            logger.info('Permission IDs added successfully');
        } else {
            logger.info('Permission collection already populated')
        }
    }catch(error) {
        logger.error('Error Inserting permission ID',  error)
    }

}

module.exports = {
    populatePemissionCollection
};