/*
Project: Hiring Portal Project
Author: Omkar
Date: 04/09/2024
Sprint: Phase 2 Sprint 5

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */

import React, { useState } from "react";
import styles from "./DeferredDashboard.module.css";
import useDeferredDashboard from "../hooks/useDeferredDashboard";
import DownloadExcelReport from "./DownloadExcelReport";

const DeferredDashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("None");
  const {
    deferredCandidates,
    loading,
    error,
    fetchCandidates,
    setDeferredCandidates,
  } = useDeferredDashboard();
  const [isReportGenerated, setIsReportGenerated] = useState(false); // New state to track if a report is generated

  const handleGenerateReport = () => {
    // Trigger data fetching based on selected date range and status
    fetchCandidates(startDate, endDate, status);
    setIsReportGenerated(true); // Set the flag to true when a report is generated
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStartDate(""); // Reset start date when status changes
    setEndDate(""); // Reset end date when status changes
    setDeferredCandidates([]); // Clear the report when status changes
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setDeferredCandidates([]); // Clear the report when start date changes
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setDeferredCandidates([]); // Clear the report when end date changes
  };

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Deferred Dashboard</p>
      <div className={styles.filterSection}>
        <div className={styles.dropdown}>
          <label className={styles.statusLabel}>Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className={styles.statusDropdown}
          >
            <option value="None">All</option>
            <option value="Candidate not Interested">
              Candidate not Interested
            </option>
            <option value="Offer Withdrawn">Offer Withdrawn</option>
            <option value="Another Offer/Backed out">
              Another Offer/Backed out
            </option>
          </select>
        </div>

        <div className={styles.dateFields}>
          <label className={styles.dateLabel}>Date Range:</label>
          <input
            type="date"
            value={startDate}
            className={styles.dateInput}
            onChange={handleStartDateChange}
          />
          <label>To</label>
          <input
            type="date"
            value={endDate}
            className={styles.dateInput}
            onChange={handleEndDateChange}
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
            data={deferredCandidates}
            dashboardName="deferred"
          />
        </div>
        
      </div>

      {loading && <p>Loading...</p>}
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : 
        deferredCandidates.length > 0 ? (
          <div className={styles.reportTableContainer}>
            <table className={styles.reportTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {deferredCandidates.map((candidate, index) => (
                  <tr key={index}>
                    <td>{candidate.name}</td>
                    <td>{candidate.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ): (
          isReportGenerated && (
            <p className={styles.error}>No records found</p>
          ) // Show this message only if a report is generated and no records are found
        )
      }
    </div>
  );
};

export default DeferredDashboard;
