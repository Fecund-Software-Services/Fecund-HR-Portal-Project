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

const DeferredDashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('None');
  const { deferredCandidates, loading, error, fetchCandidates, setDeferredCandidates } = useDeferredDashboard();

  const handleGenerateReport = () => {
    // Trigger data fetching based on selected date range and status
    fetchCandidates(startDate, endDate, status);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStartDate('');  // Reset start date when status changes
    setEndDate('');    // Reset end date when status changes
    setDeferredCandidates([]);  // Clear the report when status changes
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setDeferredCandidates([]);  // Clear the report when start date changes
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setDeferredCandidates([]);  // Clear the report when end date changes
  };

  return (
    <div className={styles.dashboardContainer}>
      <p className={styles.rastanty_Cortez}>Deffered Dashboard</p>
      <div className={styles.filterSection}>
        <div className={styles.dropdown}>
          <label className={styles.statusLabel}>Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className={styles.statusDropdown}
          >
            <option value="None">None</option>
            <option value="Candidate not Interested">Candidate not Interested</option>
            <option value="Offer Withdrawn">Offer Withdrawn</option>
            <option value="Another Offer/Backed out">Another Offer/Backed out</option>
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

        <button
          onClick={handleGenerateReport}
          className={styles.generateReportBtn}
        >
          Generate Report
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {deferredCandidates.length > 0 && (
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
      )}
    </div>
  );
};

export default DeferredDashboard;

