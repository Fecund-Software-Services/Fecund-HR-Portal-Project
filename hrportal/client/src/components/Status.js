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
18/07/2024  |   omkar and vishal  |      2          |    Front End Coding SkillSet 
19/7/2024   |        Vishal       |      2          |  CSS Styling
6/08/2024   |      Omkar          |      3          | Status Screen Validation

*/



import React, { useState, useEffect } from "react";
import styles from "./Status.module.css";
import useStatus from "../hooks/useStatus";

const Status = () => {
  const { errorMessage, fetchStatuses, addStatus, editStatus } = useStatus();
  const [statuses, setStatuses] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddStatus = async () => {
    if (currentStatus.trim()) {
      const newStatus = await addStatus(currentStatus);
      if (newStatus) {
        setStatuses([...statuses, newStatus]);
        setCurrentStatus('');
        setIsAddingStatus(false);
      }
    }
  };

  const handleEditStatus = (index) => {
    const statusToEdit = currentResults[index];
    setCurrentStatus(statusToEdit.name);
    setCurrentIndex(statusToEdit._id);
    setEditIndex(index);
  };

  const handleSaveStatus = async () => {
    if (currentStatus.trim()) {
      const updatedStatus = await editStatus(currentIndex, currentStatus);
      if (updatedStatus) {
        setStatuses((prevStatuses) =>
          prevStatuses.map((status) => (status._id === currentIndex ? { ...status, name: currentStatus } : status))
        );
        setCurrentStatus('');
        setEditIndex(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setCurrentStatus("");
    setEditIndex(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStatuses();
      if (data) {
        setStatuses(data);
      }
    };
    fetchData();
  }, []);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = statuses.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.statusContainer}>
      <p className={styles.rastanty_Cortez}>Status</p>
      
      {!isAddingStatus && editIndex === null && (
        <button className={styles.button} onClick={() => setIsAddingStatus(true)}>
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
          <button className={styles.button} onClick={() => setIsAddingStatus(false)}>
            Cancel
          </button>
        </div>
      )}
      {statuses.length > 0 ? (
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((status, index) => (
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
                      <span>{status.name}</span>
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
                      <button className={styles.button} onClick={() => handleEditStatus(index)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {currentPage >= 2 ? (
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.table_button}
              >
                Previous
              </button>
            ) : null}
            {statuses.length > resultsPerPage ? (
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastResult >= statuses.length}
                className={styles.table_button}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        " "
      )}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
    
  );
};

export default Status;

