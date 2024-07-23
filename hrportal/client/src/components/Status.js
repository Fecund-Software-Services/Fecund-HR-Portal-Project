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

import React, { useState, useEffect } from "react";
import styles from "./Status.module.css";

const Status = () => {
  const [statuses, setStatuses] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const handleAddStatus = async () => {
    console.log(currentStatus)
    if (currentStatus.trim()) {
      try {
        const response = await fetch('/api/status/add-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: currentStatus }),
        });
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Added status:', data); // Debugging line
        setStatuses([...statuses, data]);
        setCurrentStatus('');
        setIsAddingStatus(false);
      } catch (error) {
        console.error('Error adding status:', error);
      }
    }
  };

  const handleEditStatus = (index) => {
    // console.log(index)
    // Get the status object from the current state
  const statusToEdit = currentResults[index];
  console.log(statusToEdit)


  // Set the currentStatus state with the name of the status being edited
  setCurrentStatus(statusToEdit.name);

  // Set the editIndex to the clicked index
  setEditIndex(statusToEdit._id);
    // setEditIndex(index);
    // setCurrentStatus(statuses[index].name);
  };

  // const handleSaveStatus = () => {
  //   if (currentStatus.trim()) {
  //     const updatedStatuses = statuses.map((status, index) =>
  //       index === editIndex ? currentStatus : status
  //     );
  //     setStatuses(updatedStatuses);
  //     setCurrentStatus("");
  //     setEditIndex(null);
  //   }
  // };

  const handleSaveStatus = async () => {
    console.log(currentStatus)
    if (currentStatus.trim()) {
      const updatedStatus = { ...statuses[editIndex], name: currentStatus };
      console.log(updatedStatus)
      try {
        const response = await fetch(`/api/status/edit-status/${updatedStatus._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStatus),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const updatedStatuses = statuses.map((status, index) =>
          index === editIndex ? data : status
        );
        setStatuses(updatedStatuses);
        setCurrentStatus('');
        setEditIndex(null);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setCurrentStatus("");
    setEditIndex(null);
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch("/api/status/get-status");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched statuses:", data); // Debugging line
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  // Logic for pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = statuses.slice(indexOfFirstResult, indexOfLastResult);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(statuses);

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
                        <button
                          className={styles.button}
                          onClick={handleSaveStatus}
                        >
                          Save
                        </button>
                        <button
                          className={styles.button}
                          onClick={handleCancelEdit}
                        >
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
            {/* <span>{currentPage}</span> */}
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
    </div>
  );
};

export default Status;
