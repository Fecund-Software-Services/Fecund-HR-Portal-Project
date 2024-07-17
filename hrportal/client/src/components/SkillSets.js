/*
Project: Hiring Portal Project
Author: Omkar
Date: 8/07/2024
Sprint: Sprint 1 PHASE 2
User Story: Phase2 Admin Display (SkillSet Screen)

 
Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description
-------------------------------------------------------------------------------------------------------
            |                           |            |  
-------------------------------------------------------------------------------------------------------
*/
import React, { useState } from 'react';
import styles from './SkillSets.module.css';

const SkillSets = () => {
  const [skills, setSkills] = useState([]);
  const [subskillsMap, setSubskillsMap] = useState({});
  const [currentSkill, setCurrentSkill] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isEditingMainSkill, setIsEditingMainSkill] = useState(false);
  const [isAddingMainSkill, setIsAddingMainSkill] = useState(false);
  const [currentSubSkill, setCurrentSubSkill] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddMainSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setSubskillsMap({ ...subskillsMap, [currentSkill]: [] });
      setCurrentSkill('');
      setIsAddingMainSkill(false);
    }
  };

  const handleEditMainSkill = () => {
    if (selectedSkill) {
      const updatedSkills = skills.map(skill => (skill === selectedSkill ? currentSkill : skill));
      const updatedSubskillsMap = { ...subskillsMap };

      // Update key in subskillsMap
      updatedSubskillsMap[currentSkill] = updatedSubskillsMap[selectedSkill];
      delete updatedSubskillsMap[selectedSkill];

      setSkills(updatedSkills);
      setSubskillsMap(updatedSubskillsMap);
      setSelectedSkill(currentSkill);
      setIsEditingMainSkill(false);
    }
  };

  const handleCancelEditMainSkill = () => {
    setCurrentSkill('');
    setIsEditingMainSkill(false);
    setIsAddingMainSkill(false);
  };

  const handleAddSubSkill = () => {
    if (currentSubSkill) {
      const updatedSubskills = [...(subskillsMap[selectedSkill] || []), currentSubSkill];
      setSubskillsMap({
        ...subskillsMap,
        [selectedSkill]: updatedSubskills
      });
      setCurrentSubSkill('');
    }
  };

  const handleEditSubSkill = (index) => {
    setEditIndex(index);
    setCurrentSubSkill(subskillsMap[selectedSkill][index]);
  };

  const handleSaveSubSkill = () => {
    const updatedSubskills = subskillsMap[selectedSkill].map((subskill, index) => (index === editIndex ? currentSubSkill : subskill));
    setSubskillsMap({
      ...subskillsMap,
      [selectedSkill]: updatedSubskills
    });
    setCurrentSubSkill('');
    setEditIndex(null);
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
    setCurrentSkill(skill);
    setIsEditingMainSkill(false);
    setIsAddingMainSkill(false);
  };

  return (
    <div className={styles.skillSetsContainer}>
      <div className={styles.mainSkillSection}>
        <h2>Main Skill Sets</h2>
        <div className={styles.mainSkillControls}>
          <select value={selectedSkill} onChange={(e) => handleSelectSkill(e.target.value)}>
            <option value="">Select Main Skills</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>{skill}</option>
            ))}
          </select>
          {!isEditingMainSkill && !isAddingMainSkill && (
            <button onClick={() => setIsAddingMainSkill(true)}>Add</button>
          )}
          {selectedSkill && !isEditingMainSkill && !isAddingMainSkill && (
            <button onClick={() => setIsEditingMainSkill(true)}>Edit</button>
          )}
        </div>
        {(isEditingMainSkill || isAddingMainSkill) && (
          <div className={styles.mainSkillEditControls}>
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder={isEditingMainSkill ? "Edit main skill" : "Add main skill"}
            />
            {isAddingMainSkill ? (
              <>
                <button onClick={handleAddMainSkill}>Save</button>
                <button onClick={handleCancelEditMainSkill}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={handleEditMainSkill}>Save</button>
                <button onClick={handleCancelEditMainSkill}>Cancel</button>
              </>
            )}
          </div>
        )}
      </div>
      {selectedSkill && (
        <div className={styles.subSkillSection}>
          <h2>Sub Skills</h2>
          <div className={styles.subSkillControls}>
            <input
              type="text"
              value={currentSubSkill}
              onChange={(e) => setCurrentSubSkill(e.target.value)}
              placeholder="Add/Edit sub skill"
            />
            <button onClick={handleAddSubSkill}>Add</button>
            {editIndex !== null && (
              <button onClick={handleSaveSubSkill}>Save</button>
            )}
          </div>
          <table className={styles.subSkillTable}>
            <thead>
              <tr>
                <th>Sub Skills</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {(subskillsMap[selectedSkill] || []).map((subskill, index) => (
                <tr key={index}>
                  <td>{editIndex === index ? (
                    <input
                      type="text"
                      value={currentSubSkill}
                      onChange={(e) => setCurrentSubSkill(e.target.value)}
                    />
                  ) : (
                    subskill
                  )}</td>
                  <td>
                    <button onClick={() => handleEditSubSkill(index)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SkillSets;
