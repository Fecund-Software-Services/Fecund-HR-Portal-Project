/*
Project: Hiring Portal Project
Author: Omkar
Date: 03/09/2024
Sprint: Phase 2 Sprint 5

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */

import React, { useEffect, useState } from "react";
import styles from "./JoiningDashboard.module.css";
import useJoiningDashboard from "../hooks/useJoiningDashboard";
import { FaSortUp, FaSortDown } from "react-icons/fa"; // Importing sort icons
import DownloadExcelReport from "./DownloadExcelReport";

const JoiningDashboard = () => {
  const {
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
  const [downloadReport, setDownloadReport] = useState(false);
  // State to control report visibility
  // const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = () => {
    generateReport();
    setIsReportGenerated(true); // Set the flag to true when a report is generated
    // setShowReport(true);  // Show the report table when the report is generated
  };

  // Function to toggle sort order
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    handleSortChange(newSortOrder);
  };

  const handleDownloadReport = () => {
    setDownloadReport(true);
  };

  useEffect(() => {
    console.log(joiningCandidates);
  }, joiningCandidates);

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Joining Dashboard</p>
      <div className={styles.filterSection}>
        <div className={styles.dropdown}>
          <label className={styles.mainskill}>Main Skill:</label>
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
          <label className={styles.date}>Date Range:</label>
          <input
            type="date"
            value={startDate}
            className={styles.dateInput}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>To</label>
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

          <DownloadExcelReport
            data={joiningCandidates}
            dashboardName="joining"
          />
        </div>
      </div>

      {error ? (
        <p className={styles.error}>{error}</p>
      ) : isReportGenerated &&
        joiningCandidates &&
        joiningCandidates.length > 0 ? (
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
        isReportGenerated && <p className={styles.error}>No records found</p> // Show this message only if a report is generated and no records are found
      )}

      {/* Conditional rendering based on showReport */}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default JoiningDashboard;
