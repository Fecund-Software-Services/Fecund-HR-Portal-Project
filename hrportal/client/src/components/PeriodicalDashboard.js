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