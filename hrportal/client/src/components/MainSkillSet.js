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
import SkillModal from './SkillModal';
import SubSkillModal from './SubSkillModal';
import './MainSkillSet.css';

const MainSkillSet = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubSkillModalOpen, setIsSubSkillModalOpen] = useState(false);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentSkill('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveSkill = () => {
    setSkills([...skills, { name: currentSkill, subskills: [] }]);
    closeModal();
  };

  const openSubSkillModal = (index) => {
    setSelectedSkillIndex(index);
    setIsSubSkillModalOpen(true);
  };

  const closeSubSkillModal = () => {
    setIsSubSkillModalOpen(false);
  };

  
  const saveSubSkills = (mainSkillName, subskills) => {
    const updatedSkills = skills.map((skill, index) =>
      index === selectedSkillIndex ? { name: mainSkillName, subskills } : skill
    );
    setSkills(updatedSkills);
    closeSubSkillModal();
  };
  
  return (
    <div className="main-skillset-container">
      <h1>Main Skill Set</h1>
      <div className="button-container">
        <button onClick={openModal}>ADD</button>
      </div>
      <div className="skillset-table-container">
        <table className="skillset-table">
          <thead>
            <tr>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <tr key={index}>
                <td>
                  <a href="#" onClick={() => openSubSkillModal(index)}>{skill.name}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <SkillModal
          currentSkill={currentSkill}
          setCurrentSkill={setCurrentSkill}
          saveSkill={saveSkill}
          closeModal={closeModal}
        />
      )}
      {isSubSkillModalOpen && (
        <SubSkillModal
          skill={skills[selectedSkillIndex]}
          saveSubSkills={saveSubSkills}
          closeModal={closeSubSkillModal}
        />
      )}
    </div>
  );
};

export default MainSkillSet;

