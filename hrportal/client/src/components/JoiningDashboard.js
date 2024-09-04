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

import React, { useState, useEffect } from "react";
import styles from "./JoiningDashboard.module.css";
import useJoiningDashboard from "../hooks/useJoiningDashboard";  

const JoiningDashboard = () => {
  const [selectedSkill, setSelectedSkill] = useState("None"); // This holds the skill name for display purposes
  const [selectedSkillId, setSelectedSkillId] = useState(""); // This holds the skill ID

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const {
    skills,
    data,
    loading,
    error,
    fetchCandidates,
    fetchSkillsets,
    setData, // Exported setData from the hook  
  } = useJoiningDashboard(); 
  
  
  useEffect(() => {
    fetchSkillsets(); // Fetch skills when the component mounts
    // fetchSubSkills(); // Fetch all subskills by default on initial load
  }, [fetchSkillsets]);

  const handleSkillChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "None") {
      setSelectedSkill("None");
      setSelectedSkillId("");
      // fetchSubSkills(); // Fetch all subskills if "None" is selected
      // console.log(fetchSubSkills);
    } else {
      const foundSkill = skills.find((skill) => skill._id === selectedValue);
      if (foundSkill) {
        setSelectedSkill(foundSkill.skillname); // Update dropdown display to selected skill name
        setSelectedSkillId(foundSkill._id); // Store the ID of the selected skill
        // fetchSubSkills(foundSkill._id); // Fetch subskills for the selected main skill
      }
    }

    // Reset date fields when switching skills
    setFromDate("");
    setToDate("");

    // Clear previous report data so the table is hidden
    setData(null);
  };

  const handleGenerateReport = () => {
    // if (selectedSkill === "None") {
    //   fetchSubSkills();
    // }
    fetchCandidates(fromDate, toDate, selectedSkillId);  
  };

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Joining Dashboard</p>
      <div className={styles.filterSection}>
        <div className={styles.dropdown}>
          <label className={styles.mainskill}>Main Skill:</label>
          <select
            value={selectedSkillId || "None"}
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
            value={fromDate}
            className={styles.dateInput}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label>To</label>
          <input
            type="date"
            value={toDate}
            className={styles.dateInput}
            onChange={(e) => setToDate(e.target.value)}
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
      {data && (
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
              {data.map((candidate, index) => (
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

