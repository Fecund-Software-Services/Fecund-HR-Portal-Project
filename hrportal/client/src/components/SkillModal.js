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

import React from 'react';
import './SkillModal.css';

const SkillModal = ({ currentSkill, setCurrentSkill, saveSkill, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{currentSkill ? 'Edit Skill' : 'Add Skill'}</h2>
        <input
          type="text"
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          placeholder="Enter skill"
        />
        <div className="modal-buttons">
          <button onClick={saveSkill}>{currentSkill ? 'Save' : 'Add'}</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
