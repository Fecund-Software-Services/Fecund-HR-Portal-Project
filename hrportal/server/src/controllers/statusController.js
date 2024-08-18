/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 23/07/2024
Sprint: ph 2 Sprint 2

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |  Sprint    | Phase       |   Description 
-------------------------------------------------------------------------------------------------------
24/7/2024   |   HS                      |  2         |  2         |  search functionality
02/08/2024  |   Harshini C              |  2         |  2          |  Added logger library
05/08/2024  | HS                        | 3          | 2           | Added Backend Validation messages 
7/8/24      | HS                        |3           |2            | Added search functionality
-------------------------------------------------------------------------------------------------------
*/
const Status = require("../collections/status");
const logger = require("../utility/logger");

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
        const existingStatus = await Status.findOne({name: { $regex: new RegExp(`^${name}$`, 'i') }});
        if (existingStatus) {
            return res.status(404).json({ message: "Status already exists!" });
            
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
    const newStatusName = req.body.name;
    logger.info(statusId, newStatusName);

    try {
        // Check if the new status name already exists (excluding the current status)
        const existingStatus = await Status.findOne({
            name:{ $regex: new RegExp(`^${newStatusName}$`, 'i') },
            _id: { $ne: statusId }
        });

        if (existingStatus) {
            return res.status(400).json({ message: "Error: Updated status name matches an existing status!" });
        }
        // If no matching status found, proceed with the update
        const filter = { _id: statusId };
        const update = { $set: { name: newStatusName } };

        const updatedStatus = await Status.findOneAndUpdate(filter, update, { new: true });

        if (!updatedStatus) {
            return res.status(404).json({ message: "Error: Status Not Found!" });
        }

        return res.status(200).json({ message: "Status Updated Successfully!!", status: updatedStatus });

    } catch (error) {
        res.status(500).json({ message: 'Error Updating Status', error: error.message });
    }
}

// search for a status
const searchStatus = async (req, res) => {
    const {query} = req.query;
    try {
        const searchRegex = new RegExp(`^${query}`,'i');
        const filteredStatuses = await Status.find({name: searchRegex});

        if (filteredStatuses.length === 0) {
            return res.status(404).json({ message: 'No statuses found for the given query' });
          }
          
        return res.status(201).json(filteredStatuses)
    } catch (error){
        res.status(500).json({message: 'Status not Found!', error: error.message});
    }
}

module.exports = {
    getStatus,
    addStatus,
    editStatus,
    searchStatus
}