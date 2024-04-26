/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 29/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
16/4/2024     HS                            2              Authentication & Authorization - Login    
17/4/2024       HS                           2              Add New Candidate  
24/4/2024       HS                            3                     Add New Candidate Validation                         
-------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const mongoose = require('mongoose');
const url = require('./src/connection/constants');
const server_port = require('./src/connection/constants');
const client_port = require('./src/connection/constants');
const userRoutes = require('./src/routes/userRoutes');
const candidateRoutes = require('./src/routes/candidateRoutes');
//const resumeRoutes = require('./src/routes/resumeRoutes')
const cors = require('cors')
require("dotenv").config();

// express app
const app = express()
    

//middleware
app.use(cors({ origin: client_port , credentials: true}))
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/user', userRoutes)
app.use('/api/candidate', candidateRoutes)
//app.use('/api/candidate-resume', resumeRoutes)

// mongodb connection and port connection.
mongoose.connect('mongodb:' + url.databaseURL)
    .then(() => {
      app.listen(server_port.server_PORT, () => {
        console.log('connected to Database and listening on port',server_port.server_PORT)
      })
    })
    .catch((error) => {
      console.log(error);
    });
    


