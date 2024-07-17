import React, { useState } from 'react';
import styles from './Status.module.css';

const Status = () => {
  const [statuses, setStatuses] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('');
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddStatus = () => {
    if (currentStatus.trim()) {
      setStatuses([...statuses, currentStatus]);
      setCurrentStatus('');
      setIsAddingStatus(false);
    }
  };

  const handleEditStatus = (index) => {
    setEditIndex(index);
    setCurrentStatus(statuses[index]);
  };

  const handleSaveStatus = () => {
    if (currentStatus.trim()) {
      const updatedStatuses = statuses.map((status, index) =>
        index === editIndex ? currentStatus : status
      );
      setStatuses(updatedStatuses);
      setCurrentStatus('');
      setEditIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setCurrentStatus('');
    setEditIndex(null);
  };

  return (
    <div className={styles.statusContainer}>
      <h1>Status</h1>
      {!isAddingStatus && editIndex === null && (
        <button
          className={styles.addButton}
          onClick={() => setIsAddingStatus(true)}
        >
          Add
        </button>
      )}
      {isAddingStatus && editIndex === null && (
        <div>
          <input
            className={styles.inputField}
            type="text"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            placeholder="Add status"
          />
          <button className={styles.saveButton} onClick={handleAddStatus}>
            Save
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => setIsAddingStatus(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                  />
                ) : (
                  status
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <div>
                    <button className={styles.saveButton} onClick={handleSaveStatus}>
                      Save
                    </button>
                    <button className={styles.cancelButton} onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditStatus(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Status;
