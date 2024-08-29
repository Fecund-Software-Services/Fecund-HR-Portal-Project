/*
Project: Hiring Portal Project
Author: Omkar
Date: 21/08/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */
 
import React, { useState, useEffect } from 'react';
import styles from './PeriodicalDashboard.module.css';
import usePeriodicDashboard from '../hooks/usePeriodicDashboard';

const PeriodicalDashboard = () => {
    const [selectedSkill, setSelectedSkill] = useState('None');
    const [selectedSkillId, setSelectedSkillId] = useState();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { skills, subSkills, data, loading, error, fetchReport, fetchSubSkills, fetchSkillsets } = usePeriodicDashboard();

    useEffect(() => {
        fetchSkillsets(); // Fetch skills when the component mounts
    }, [fetchSkillsets]);

    const handleSkillChange = (e) => {
        const selectedValue = e.target.value;
        const foundSkill = skills.find((skill)=> skill._id === selectedValue);
       
        setSelectedSkill(selectedValue);
        if (foundSkill) {
          const id= foundSkill._id
          console.log(id)
          setSelectedSkillId(id)
          setSelectedSkill(foundSkill.skillname);
            fetchSubSkills(id); // Fetch subskills for the selected main skill
        } else {
            fetchSubSkills(); // Fetch all subskills if "None" is selected
        }
    };

    const handleGenerateReport = () => {
      console.log(selectedSkillId)
        fetchReport(fromDate, toDate, selectedSkillId);
        console.log(data)
    };

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.title}>Periodical Dashboard</h1>
            <div className={styles.filterSection}>
                <select
                    value={selectedSkill}
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

                <div className={styles.dateFields}>
                    <label>
                        From Date:
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </label>
                    <label>
                        To Date:
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </label>
                </div>

                <button onClick={handleGenerateReport} className={styles.generateReportBtn}>
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
                                <th>Experience</th>
                                {subSkills.map((subSkill, index) => (
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
                                    {subSkills.map((subSkill, subIndex) => (
                                        <td key={subIndex}>{row.subskills[subSkill.name] || 0}</td>
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
