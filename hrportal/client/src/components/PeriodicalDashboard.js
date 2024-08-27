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
/*
import React, { useState } from 'react';
import styles from './PeriodicalDashboard.module.css';

const PeriodicalDashboard = () => {
    const [selectedSkill, setSelectedSkill] = useState('None');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reportGenerated, setReportGenerated] = useState(false);
  
    const mainSkills = ['None', 'JavaScript', 'Python', 'Java', 'React'];
    const subSkills = {
      JavaScript: ['ES6', 'TypeScript', 'Node.js'],
      Python: ['Django', 'Flask', 'Pandas'],
      Java: ['Spring', 'Hibernate'],
      React: ['Hooks', 'Redux'],
    };
  
    const allSubSkills = Object.values(subSkills).flat();
  
    const handleSkillChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedSkill(selectedValue);
      setReportGenerated(false); // Hide report if "None" is selected
      if (selectedValue === 'None') {
        setFromDate(''); // Reset date fields
        setToDate('');
      }
    };
  
    const handleGenerateReport = () => {
      setReportGenerated(true);
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
            {mainSkills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
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
  
        {reportGenerated && (
          <div className={styles.reportTableContainer}>
            <table className={styles.reportTable}>
              <thead>
                <tr>
                  <th>Experience</th>
                  {selectedSkill === 'None'
                    ? allSubSkills.map((subSkill, index) => (
                        <th key={index}>{subSkill}</th>
                      ))
                    : subSkills[selectedSkill]?.map((subSkill, index) => (
                        <th key={index}>{subSkill}</th>
                      ))}
                  <th>Offered/Accepted</th>
                  <th>Negotiation Stage</th>
                  <th>Candidate Backed Out</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 25 }, (_, i) => (
                  <tr key={i}>
                    <td>{i + 1}{i === 24 ? '+' : ''}</td>
                    {selectedSkill === 'None'
                      ? allSubSkills.map((_, index) => (
                          <td key={index}>0</td>
                        ))
                      : subSkills[selectedSkill]?.map((_, index) => (
                          <td key={index}>0</td>
                        ))}
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
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
  */
 
  import React, { useState, useEffect } from 'react';
import styles from './PeriodicalDashboard.module.css';
import usePeriodicDashboard from '../hooks/usePeriodicDashboard';

const PeriodicalDashboard = () => {
    const [selectedSkill, setSelectedSkill] = useState('None');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { skills, subSkills, data, loading, error, fetchReport, fetchSubSkills, fetchSkillsets } = usePeriodicDashboard();

    useEffect(() => {
        fetchSkillsets(); // Fetch skills when the component mounts
    }, [fetchSkillsets]);

    const handleSkillChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedSkill(selectedValue);
        if (selectedValue !== 'None') {
            fetchSubSkills(selectedValue); // Fetch subskills for the selected main skill
        } else {
            fetchSubSkills(); // Fetch all subskills if "None" is selected
        }
    };

    const handleGenerateReport = () => {
        fetchReport(fromDate, toDate, selectedSkill);
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
                            {skill.name}
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
                                    <th key={index}>{subSkill.name}</th>
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
