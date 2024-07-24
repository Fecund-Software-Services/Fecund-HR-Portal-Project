/*
Project: Hiring Portal Project
Author: Omkar
Date: 15/07/2024
Sprint: PHASE 2 Sprint 1
User Story: Phase 2 Admin workflow (STATUS Screen)

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author            |   Sprint        |    Description 
-------------------------------------------------------------------------------------------------------
18/07/2024  |   omkar and vishal  |      2        |    Front End Coding SkillSet 
19/7/2024   |        Vishal       |      2          |  CSS Styling

*/

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
      <h1 className={styles.rastanty_Cortez}>Status</h1>
      {!isAddingStatus && editIndex === null && (
        <button
          className={styles.button}
          onClick={() => setIsAddingStatus(true)}
        >
          Add
        </button>
      )}
      {isAddingStatus && editIndex === null && (
        <div className={styles.container}>
          <input
            className={styles.input_field}
            type="text"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            placeholder="Add status"
          />
          <button className={styles.button} onClick={handleAddStatus}>
            Save
          </button>
          <button
            className={styles.button}
            onClick={() => setIsAddingStatus(false)}
          >
            Cancel
          </button>
        </div>
      )}
      { statuses.length > 0 ? <table className={styles.table}>
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
                    className={styles.input_field}
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                  />
                ) : (
                  status
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <div className={styles.button_conatiner}>
                    <button className={styles.button} onClick={handleSaveStatus}>
                      Save
                    </button>
                    <button className={styles.button} onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.button}
                    onClick={() => handleEditStatus(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> : " "}
      
    </div>
  );
};

export default Status;

