import React, { useState, useEffect } from "react";
import styles from "./InterviewDashboard.module.css"; // Reuse or create a similar CSS file
import useInterviewDashboard from "../hooks/useInterviewDashboard"; // Custom hook

const InterviewDashboard = () => {
  const [selectedSkill, setSelectedSkill] = useState("None");
  const [selectedSkillId, setSelectedSkillId] = useState("");

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

  const handleGenerateReport = () => {
    if (selectedSkill === "None") {
      fetchSubSkills();
    }
    fetchReport(fromDate, toDate, selectedSkillId);
  };

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Interview Dashboard</p>
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
                  <td>{row.noOfCandidatesApproached}</td>
                  <td>{row.candidatesNotInterested}</td>
                  <td>{row.firstRoundScheduled}</td>
                  <td>{row.rejectedRound1}</td>
                  <td>{row.onHoldRound1}</td>
                  <td>{row.clearedRound1}</td>
                  <td>{row.secondRoundScheduled}</td>
                  <td>{row.rejectedRound2}</td>
                  <td>{row.onHoldRound2}</td>
                  <td>{row.clearedRound2}</td>
                  <td>{row.negotiationStage}</td>
                  <td>{row.offerWithdrawn}</td>
                  <td>{row.offerAccepted}</td>
                  <td>{row.candidateBackedOut}</td>
                  <td>{row.candidateNames?.total || 'N/A'}</td>
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
