/*
Project: Hiring Portal Project
Author: Harshini C
Date: 25/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase   | Description 
-------------------------------------------------------------------------------------------------------
7/5/2024    |   HS                      |   3        |  1       | Resume Handling
11/7/2024   |   HS                      |   1        |  2       | Added Skillset constant values
25/09/2024  |   Harshini C              |   6        |  2       | SonarLint Code optimization task
-------------------------------------------------------------------------------------------------------
*/

const localhost = '//localhost:27017/';
const databaseName = 'FecundHiringPortal';
const databaseURL = localhost.concat("",databaseName)

const server_PORT = 4000
const client_PORT = "http://localhost:3000"

module.exports.databaseURL = databaseURL;
module.exports.localhost = localhost;
module.exports.databaseName = databaseName;
module.exports.server_PORT = server_PORT;
module.exports.client_PORT = client_PORT;
