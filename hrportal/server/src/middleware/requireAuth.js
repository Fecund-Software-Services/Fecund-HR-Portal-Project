/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 16/4/2024
Sprint: Sprint 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase   |  Description 
-------------------------------------------------------------------------------------------------------
12/07/2024  |   Harshini C              |   1        |   2      |  Adding logger to all nodeJS files                                   
-------------------------------------------------------------------------------------------------------
*/

const jwt = require('jsonwebtoken')
const User = require('../collections/users')
const logger = require('../utils/logger');

const requireAuth = async (req, res, next) => {

    // verify authentication
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error) {
        logger.error(error)
        res.status(401).json({error: 'Request is not authorized'})

    }
}


module.exports = requireAuth;