/*
Project: Hiring Portal Project
Author: Omkar
Date: 03/09/2024
Sprint: Phase 2 Sprint 5

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------
9/09/2024   |   Vishal                  |     4      |   2     | Integration modification of Generate Report data
7/09/2024   |   Omkar                   |     4      |   2     | Issue resolvement: Dropdown Update,Date Reset
8/09/2024   |   Omkar                   |     4      |   2     | Issue Resolvement:Initial Load of None, Subskill data fetching
12/09/2024  |   Vishal                  |     5      |   2     | UI fixes
17/09/2024  |  Vishal Garg              |     6      |   2     |  Joining Dashboard to be downloaded in excel format
-------------------------------------------------------------------------------------------------------
// */

import React, { useEffect, useState } from "react";
import styles from "./JoiningDashboard.module.css";
import useJoiningDashboard from "../hooks/useJoiningDashboard";
import { FaSortUp, FaSortDown } from "react-icons/fa"; // Importing sort icons
import DownloadExcelReport from "./DownloadExcelReport";

const JoiningDashboard = () => {
  const {
    buttonClicked,
    setButtonClicked,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    skills,
    selectedskillsetid,
    joiningCandidates,
    loading,
    error,
    generateReport,
    handleSkillChange,
    sortOrder,
    handleSortChange, // Added this to trigger sort
  } = useJoiningDashboard();

  const [isReportGenerated, setIsReportGenerated] = useState(false); // New state to track if a report is generated
  // const [downloadReport, setDownloadReport] = useState(false);
  // State to control report visibility
  // const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = () => {
    generateReport();
    setButtonClicked(true);
    
  };

  // Use useEffect to update isReportGenerated based on joiningCandidates data
  useEffect(() => {
    // If joiningCandidates has data, set the report as generated
    if (joiningCandidates && joiningCandidates.length > 0) {
      setIsReportGenerated(true);
    } else {
      setIsReportGenerated(false);  // Reset if no data is found
    }
  }, [joiningCandidates]); // This effect runs whenever joiningCandidates changes

  // Function to toggle sort order
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    handleSortChange(newSortOrder);
  };

  

  

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Joining Dashboard</p>
      <div className={styles.filterSection}>
        <div className={styles.dropdown}>
          <label className={styles.mainskill}><b>Main Skill:</b></label>
          <select
            value={selectedskillsetid || "None"}
            onChange={handleSkillChange}
            className={styles.skillDropdown}
          >
            <option value="None">All</option>
            {skills.map((skill) => (
              <option key={skill._id} value={skill._id}>
                {skill.skillname}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.dateFields}>
          <label className={styles.date}><b>Date Range:</b></label>
          <input
            type="date"
            value={startDate}
            className={styles.dateInput}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label><b>To</b></label>
          <input
            type="date"
            value={endDate}
            className={styles.dateInput}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.reportButton}>
          <button
            onClick={handleGenerateReport}
            className={styles.generateReportBtn}
          >
            Generate Report
          </button>

          {
          isReportGenerated && (
            <DownloadExcelReport
              data={joiningCandidates}
              dashboardName="joining"
            />
          )}
        </div>
      </div>

      {error ? (
        <p className={styles.error}>{error}</p>
      ) : isReportGenerated &&
        joiningCandidates 
        // &&
        // joiningCandidates.length > 0 
        ? (
        <div className={styles.reportTableContainer}>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>SkillSet</th>
                <th onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
                  Joining Date
                  {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}{" "}
                  {/* Conditional rendering of sort icons */}
                </th>
              </tr>
            </thead>
            <tbody>
              {joiningCandidates.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.name}</td>
                  <td>{candidate.Position}</td>
                  <td>{candidate.joiningDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        buttonClicked && <p className={styles.error}>No records found</p> // Show this message only if a report is generated and no records are found
      )}

      {/* Conditional rendering based on showReport */}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default JoiningDashboard;
