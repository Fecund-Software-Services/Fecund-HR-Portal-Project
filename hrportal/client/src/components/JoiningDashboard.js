/*
Project: Hiring Portal Project
Author: Omkar
Date: 03/09/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */

import React from "react";
import styles from "./JoiningDashboard.module.css";
import useJoiningDashboard from "../hooks/useJoiningDashboard";  

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
  } = useJoiningDashboard();  

  const handleGenerateReport = () => {
    generateReport();  
  };

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
            <option value="None">None</option>
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

        <button
          onClick={handleGenerateReport}
          className={styles.generateReportBtn}
        >
          Generate Report
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {joiningCandidates && (
        <div className={styles.reportTableContainer}>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>SkillSet</th>
                <th>Joining Date</th>
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
      )}
    </div>
  );
};

export default JoiningDashboard;
