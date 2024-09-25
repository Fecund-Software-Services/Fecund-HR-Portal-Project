/*
Project: Hiring Portal Project
Author: Omkar
Date: 21/08/2024
Sprint: Phase 2 Sprint 4

Modification Log:
------------------------------------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  | Description 
----------------------------------------------------------------------------------------------------------------------------------
 29/08/2024 |   Vishal                  |     4      |   2     | Integration modification of Generate Report data
29/08/2024  |   Omkar                   |     4      |   2     | Issue resolvement: Dropdown Update,Date Reset
30/08/2024  |   Omkar                   |     4      |   2     | Issue Resolvement:Initial Load of None, Subskill data fetching
03/09/2024  |   Harshini C              |     5      |   2     | UI fixes
17/09/2024  |  Vishal Garg              |     6      |   2     | Pericodical Dashboard download in excel format
-----------------------------------------------------------------------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import styles from "./PeriodicalDashboard.module.css";
import usePeriodicDashboard from "../hooks/usePeriodicDashboard";
import DownloadExcelReport from "./DownloadExcelReport";

const PeriodicalDashboard = () => {
  const [selectedSkill, setSelectedSkill] = useState("None"); // This holds the skill name for display purposes
  const [selectedSkillId, setSelectedSkillId] = useState(""); // This holds the skill ID

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const {
    skills,
    subSkills,
    data,
    loading,
    error,
    fetchReport,
    fetchSubSkills,
    fetchSkillsets,
    setData, // Exported setData from the hook
  } = usePeriodicDashboard();

  useEffect(() => {
    fetchSkillsets(); // Fetch skills when the component mounts
    // fetchSubSkills(); // Fetch all subskills by default on initial load
  }, [fetchSkillsets]);

  const handleSkillChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "None") {
      setSelectedSkill("None");
      setSelectedSkillId("");
      fetchSubSkills(); // Fetch all subskills if "None" is selected
      console.log(fetchSubSkills);
    } else {
      const foundSkill = skills.find((skill) => skill._id === selectedValue);
      if (foundSkill) {
        setSelectedSkill(foundSkill.skillname); // Update dropdown display to selected skill name
        setSelectedSkillId(foundSkill._id); // Store the ID of the selected skill
        fetchSubSkills(foundSkill._id); // Fetch subskills for the selected main skill
      }
    }

    // Reset date fields when switching skills
    setFromDate("");
    setToDate("");

    // Clear previous report data so the table is hidden
    setData(null);
  };

  const handleGenerateReport = () => {
    setData(null)
    if (selectedSkill === "None") {
      fetchSubSkills();
    }
    fetchReport(fromDate, toDate, selectedSkillId);
  };

  const formatDataForExcel = (data, subSkills) => {
    if (!data || data.length === 0) return [];

    const allSubSkills = subSkills.map(skill => skill.subsetname);

    // Identify non-zero columns
    const nonZeroColumns = allSubSkills.filter(subSkill => 
      data.some(row => row.subskills[subSkill] > 0)
    );

    return data.map(row => {
      let formattedRow = {
        Experience: row.exp,
      };

      // Only include non-zero columns
      nonZeroColumns.forEach(subSkill => {
        formattedRow[subSkill] = row.subskills[subSkill] || 0;
      });

      // Add the remaining fields
      formattedRow = {
        ...formattedRow,
        'Offered/Accepted': row.offered,
        'Negotiation Stage': row.negotiation,
        'Candidate Backed Out': row.backedOut
      };

      return formattedRow;
    });
  };

  let nonZeroSubSkills;

  {
    data &&
      (nonZeroSubSkills =
        data.length > 0
          ? subSkills.filter((subSkill) =>
              data.some((row) => row.subskills[subSkill.subsetname] > 0)
            )
          : []);
  }

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Periodical Dashboard</p>
      <div className={styles.filterSection}>
        <div className={styles.dropdown}>
          <label className={styles.mainskill}>
            Main Skill<span className={styles.asterisk}>*</span>:
          </label>
          <select
            value={selectedSkillId || "None"} // Use ID as the value for the select
            onChange={handleSkillChange}
            className={styles.skillDropdown}
            required
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
          <label className={styles.date}>
            Date Range<span className={styles.asterisk}>*</span>:
          </label>
          <input
            type="date"
            value={fromDate}
            className={styles.dateInput}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
          <label>To</label>
          <input
            type="date"
            value={toDate}
            className={styles.dateInput}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className={styles.reportButton}>
          <button
            onClick={handleGenerateReport}
            className={styles.generateReportBtn}
          >
            Generate Report
          </button>
          {data && (
            <DownloadExcelReport
              data={formatDataForExcel(data, subSkills)}
              dashboardName="periodical"
            />
          )}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {data && (
        <div className={styles.reportTableContainer}>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Experience</th>
                {nonZeroSubSkills.map((subSkill, index) => (
                  <th key={index}>{subSkill.subsetname}</th>
                ))}
                <th>Offered/Accepted</th>
                <th>Negotiation Stage</th>
                <th>Candidate Backed Out</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.exp}</td>
                  {nonZeroSubSkills.map((subSkill, subIndex) => (
                    <td key={subIndex}>
                      {row.subskills[subSkill.subsetname] || 0}
                    </td>
                  ))}
                  <td>{row.offered}</td>
                  <td>{row.negotiation}</td>
                  <td>{row.backedOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PeriodicalDashboard;
