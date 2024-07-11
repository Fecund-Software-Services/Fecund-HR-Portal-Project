/*
Project: Hiring Portal Project
Author: Omkar
Date: 8/07/2024
Sprint: Sprint 1 PHASE 2
User Story: Phase2 Admin Display

 
Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description
-------------------------------------------------------------------------------------------------------
            |                           |            |  
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import './SubSkillModal.css';

const SubSkillModal = ({ subskills: initialSubskills, saveSubSkills, closeModal }) => {
  const [subskills, setSubskills] = useState(initialSubskills);
  const [currentSubSkill, setCurrentSubSkill] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addSubSkill = () => {
    if (editIndex !== null) {
      const updatedSubskills = subskills.map((subskill, index) =>
        index === editIndex ? currentSubSkill : subskill
      );
      setSubskills(updatedSubskills);
      setEditIndex(null);
    } else {
      setSubskills([...subskills, currentSubSkill]);
    }
    setCurrentSubSkill('');
  };

  const editSubSkill = (index) => {
    setCurrentSubSkill(subskills[index]);
    setEditIndex(index);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sub Skill Sets</h2>
        <div className="subskill-input-container">
          <input
            type="text"
            value={currentSubSkill}
            onChange={(e) => setCurrentSubSkill(e.target.value)}
            placeholder="Enter sub skill"
          />
          <button onClick={addSubSkill}>{editIndex !== null ? 'Edit' : 'Add'}</button>
        </div>
        <table className="subskill-table">
          <thead>
            <tr>
              <th>Sub Skills</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {subskills.map((subskill, index) => (
              <tr key={index}>
                <td>{subskill}</td>
                <td>
                  <button onClick={() => editSubSkill(index)}>EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-footer">
          <button onClick={() => saveSubSkills(subskills)}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SubSkillModal;
