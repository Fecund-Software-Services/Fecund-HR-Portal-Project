/*
Project: Hiring Portal Project
Author: Harshini C
Date: 12/07/2024
Sprint: Sprint 1 - Phase 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint    | Phase    | Description 
-------------------------------------------------------------------------------------------------------
12/07/2024  | Harshini C              |  1        | 2        | Adding logger to all nodeJS files
-------------------------------------------------------------------------------------------------------
*/

const { createLogger, transports, format } = require('winston');
//const loggerLevel = require('../connection/constants');

const logger = createLogger({
    transports:[
        //logs in console/terminal
        new transports.Console({ 
            level: 'info', // minimum severity log level
            format: format.combine(format.timestamp(), format.json())
        }),        
        new transports.File({ //logs both info and error related logs to the file
            filename: "server_info.log",
            level: 'info', // minimum severity log level
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({ //logs only errors into file
            filename: "server_error.log",
            level: 'error', // high severity log level
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

module.exports = logger;