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
    const { id } = req.params;
    const {name} = req.body;
    try {
        const status = await Status.findByIdAndUpdate(id, {name});
        if (!status) {
            return res.status(404).send('Status Not Found!');
        }
        res.status(status);

    }catch(error){
        res.status(500).send('Error Updating status');
    }
}

module.exports = {
    getStatus,
    addStatus,
    editStatus
}