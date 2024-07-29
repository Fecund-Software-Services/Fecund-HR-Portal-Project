/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 23/07/2024
Sprint: ph 2 Sprint 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
24/7/2024       HS                        ph2 sp2         search functionality
-------------------------------------------------------------------------------------------------------
*/
const Status = require("../collections/status");

// Get all Status
const getStatus = async (req, res) => {
    try {
        const statuses = await Status.find();
        res.json(statuses)
    } catch (error){
        res.status(500).send("Error Fetching Status!!", error)
    }
}

// Add new status
const addStatus = async (req, res) => {
    const {name} = req.body;
    try {
        const existingStatus = await Status.findOne({name});
        if (existingStatus) {
            return res.status(400).send("Status witht the name already exists")
        }
        const newStatus = new Status({name});
        await newStatus.save();
        res.json(newStatus);

    }catch(error){
        res.status(500).send("Error creating status", error);
    }
}

// Edit a status
const editStatus = async (req, res) => {
    const statusId = req.params.id;
    const filter = {_id: statusId};

    const update = {
        $set: {
            name: req.body.name
        }
    }
    try {
        const updatedstatus = await Status.findOneAndUpdate(filter, update, { new: true });
        if (!updatedstatus) {
            return res.status(404).send('Status Not Found!');
        }
        return res.status(201).json(updatedstatus);

    }catch(error){
        res.status(500).send( 'Error Updating status');
    }
}

// search for a status
const searchStatus = async (req, res) => {
    const {query} = req.query;
    try {
        const searchRegex = new RegExp(`^${query}`,'i');
        const filteredStatuses = await Status.find({name: searchRegex})
        return res.status(201).json(filteredStatuses)
    } catch (error){
        res.status(500).json({message: 'Status not Found!'})
    }
}

module.exports = {
    getStatus,
    addStatus,
    editStatus,
    searchStatus
}