/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 29/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase   | Description 
-------------------------------------------------------------------------------------------------------
16/4/2024     HS                            2                     Authentication & Authorization - Login    
17/4/2024     HS                            2                     Add New Candidate  
24/4/2024     HS                            3                     Add New Candidate Validation      
12/07/2024    Harshini C                    1           2         Adding logger to all nodeJS files                   
-------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const mongoose = require('mongoose');
const url = require('./src/connection/constants');
const server_port = require('./src/connection/constants');
const client_port = require('./src/connection/constants');
const userRoutes = require('./src/routes/userRoutes');
const candidateRoutes = require('./src/routes/candidateRoutes');
const skillsetSchema = require("./src/collections/skillset");
const subskillsetSchema = require("./src/collections/subskillset");
const {checkAndPopulateData} = require("./src/utility/insertSkillData")
const {checkAndCreateCollection} = require('./src/utility/createCollection')
const logger = require('./src/utils/logger');

const cors = require('cors')
require("dotenv").config();

// express app
const app = express()
    

//middleware
app.use(cors({ origin: client_port , credentials: true}))
app.use(express.json())

app.use((req, res, next) => {
    logger.info(req.path, req.method)
    next()
}) 


// routes
app.use('/api/user', userRoutes)
app.use('/api/candidate', candidateRoutes)

// mongodb connection and port connection.
mongoose.connect('mongodb:' + url.databaseURL)
    .then(() => {
      app.listen(server_port.server_PORT, () => {
        logger.info('connected to Database and listening on port',server_port.server_PORT)
      })
    })
    .catch((error) => {
      logger.error(error);
    });
    

