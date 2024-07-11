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

const SubSkillModal = ({ skill, saveSubSkills, closeModal }) => {
  const [subskills, setSubskills] = useState(skill.subskills);
  const [editIndex, setEditIndex] = useState(null);
  const [mainSkillName, setMainSkillName] = useState(skill.name);

  const addSubSkill = () => {
    setSubskills([...subskills, '']);
    setEditIndex(subskills.length);
  };

  const handleSubSkillChange = (index, value) => {
    const updatedSubskills = subskills.map((subskill, i) =>
      index === i ? value : subskill
    );
    setSubskills(updatedSubskills);
  };

  const saveChanges = () => {
    const filteredSubskills = subskills.filter(subskill => subskill.trim() !== '');
    saveSubSkills(mainSkillName, filteredSubskills);
    setEditIndex(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sub Skill Sets</h2>
        <div className="main-skill-name">
          <input
            type="text"
            value={mainSkillName}
            onChange={(e) => setMainSkillName(e.target.value)}
            placeholder="Main Skill"
          />
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
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={subskill}
                      onChange={(e) => handleSubSkillChange(index, e.target.value)}
                    />
                  ) : (
                    subskill
                  )}
                </td>
                <td>
                  <button onClick={() => setEditIndex(index)}>EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-footer">
          <button onClick={addSubSkill}>ADD</button>
          <button onClick={saveChanges}>SAVE</button>
          <button onClick={closeModal}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default SubSkillModal;

