const permission = require('../collections/userpermissions');

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
            console.log('Permission IDs added successfully');
        } else {
            console.log('Permission collection already populated')
        }
    }catch(error) {
        console.log('Error Inserting permission ID',  error)
    }

}

module.exports = {
    populatePemissionCollection
};