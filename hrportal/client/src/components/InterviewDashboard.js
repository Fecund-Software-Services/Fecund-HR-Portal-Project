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
17/09/2024  |  Vishal Garg              |     5      |   2     |  Interview Dashboard download in excel format
-------------------------------------------------------------------------------------------------------
// */

import React, { useState, useEffect } from "react";
import styles from "./InterviewDashboard.module.css"; // Reuse or create a similar CSS file
import useInterviewDashboard from "../hooks/useInterviewDashboard"; // Custom hook
import DownloadExcelReport from "./DownloadExcelReport";
// import CellWithTooltip from "./CellWithTooltip";

const InterviewDashboard = () => {
  const [selectedSkill, setSelectedSkill] = useState("None");
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [hoveredCell, setHoveredCell] = useState(null);

  const {
    skills,
    subSkills,
    data,
    loading,
    error,
    fetchReport,
    fetchSubSkills,
    fetchSkillsets,
    setData,
  } = useInterviewDashboard(); // Custom hook

  useEffect(() => {
    console.log("Fetching skillsets...");
    fetchSkillsets(); // Fetch skills when the component mounts
    // fetchSubSkills(); // Fetch all subskills by default on initial load
  }, [fetchSkillsets]);

  const handleSkillChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "None") {
      setSelectedSkill("None");
      setSelectedSkillId("");
      fetchSubSkills(); // Fetch all subskills if "None" is selected
    } else {
      const foundSkill = skills.find((skill) => skill._id === selectedValue);
      if (foundSkill) {
        setSelectedSkill(foundSkill.skillname);
        setSelectedSkillId(foundSkill._id);
        fetchSubSkills(foundSkill._id); // Fetch subskills for the selected main skill
      }
    }

    // Reset date fields when switching skills
    setFromDate("");
    setToDate("");

    // Clear previous report data so the table is hidden
    setData(null);
  };

  // console.log(data[1].candidateNames)

  const handleGenerateReport = () => {
    if (selectedSkill === "None") {
      fetchSubSkills();
    }
    fetchReport(fromDate, toDate, selectedSkillId);
  };

  const formatDataForExcel = (data) => {
    if (!data || data.length === 0) return [];

    return data.map(row => {
      const { candidateNames, ...excelRow } = row;
      return excelRow;
    });
  };

  const renderCellWithHover = (value, candidateNames, rowIndex, columnName) => {
    const handleMouseEnter = () => {
      if (candidateNames && candidateNames[columnName]) {
        setHoveredCell({
          rowIndex,
          columnName,
          names: candidateNames[columnName],
        });
      }
    };

    const handleMouseLeave = () => {
      setHoveredCell(null);
    };

    return (
      <td
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        {value}
        {hoveredCell &&
          hoveredCell.rowIndex === rowIndex &&
          hoveredCell.columnName === columnName && (
            <div className={styles.hoverBox}>
              {/* <h4>Candidates:</h4> */}
              <ul>
                {hoveredCell.names.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}
      </td>
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Interview Dashboard</p>
      <div className={styles.filterSection}>
        <div className={styles.dropdown}>
          <label className={styles.mainskill}><b>Main Skill:</b></label>
          <select
            value={selectedSkillId || "None"}
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
        <div className={styles.reportButton}>
          <button
            onClick={handleGenerateReport}
            className={styles.generateReportBtn}
          >
            Generate Report
          </button>
          {data && (
            <DownloadExcelReport
              data={formatDataForExcel(data)}
              dashboardName="interview"
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
                <th>Position</th>
                <th>No. of Candidates Approached</th>
                <th>Candidates not Interested/Not Responded</th>
                <th>1st Round Scheduled</th>
                <th>Rejected Round 1</th>
                <th>On Hold Round 1</th>
                <th>Cleared Round 1</th>
                <th>2nd Round Scheduled</th>
                <th>Rejected Round 2</th>
                <th>On Hold Round 2</th>
                <th>Cleared Round 2</th>
                <th>Negotiation Stage</th>
                <th>Offer Withdrawn</th>
                <th>Offer Accepted</th>
                <th>Candidate has got another offer</th>
                <th>Candidate Backed Out</th>
                {/* <th>Total</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.position}</td>
                  {renderCellWithHover(
                    row.noOfCandidatesApproached,
                    row.candidateNames,
                    index,
                    "noOfCandidatesApproached"
                  )}
                  {renderCellWithHover(
                    row.candidatesNotInterested,
                    row.candidateNames,
                    index,
                    "Candidate not Interested"
                  )}
                  {renderCellWithHover(
                    row.firstRoundScheduled,
                    row.candidateNames,
                    index,
                    "Scheduled R1"
                  )}
                  {renderCellWithHover(
                    row.rejectedRound1,
                    row.candidateNames,
                    index,
                    "Rejected R1"
                  )}
                  {renderCellWithHover(
                    row.onHoldRound1,
                    row.candidateNames,
                    index,
                    "On Hold R1"
                  )}
                  {renderCellWithHover(
                    row.clearedRound1,
                    row.candidateNames,
                    index,
                    "Cleared 1st Round"
                  )}
                  {renderCellWithHover(
                    row.secondRoundScheduled,
                    row.candidateNames,
                    index,
                    "Scheduled R2"
                  )}
                  {renderCellWithHover(
                    row.rejectedRound2,
                    row.candidateNames,
                    index,
                    "Rejected R2"
                  )}
                  {renderCellWithHover(
                    row.onHoldRound2,
                    row.candidateNames,
                    index,
                    "On Hold R2"
                  )}
                  {renderCellWithHover(
                    row.clearedRound2,
                    row.candidateNames,
                    index,
                    "Cleared 2nd Round"
                  )}
                  {renderCellWithHover(
                    row.negotiationStage,
                    row.candidateNames,
                    index,
                    "Negotiation Stage"
                  )}
                  {renderCellWithHover(
                    row.offerWithdrawn,
                    row.candidateNames,
                    index,
                    "Offer Withdrawn"
                  )}
                  {renderCellWithHover(
                    row.offerAccepted,
                    row.candidateNames,
                    index,
                    "Offer Issued"
                  )}
                  {renderCellWithHover(
                    row.candidateBackedOut,
                    row.candidateNames,
                    index,
                    "Another Offer/Backed out"
                  )}
                  {renderCellWithHover(
                    row.candidateNames?.total || "0",
                    row.candidateNames,
                    index,
                    "total"
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterviewDashboard;
