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
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentSkill('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveSkill = () => {
    if (isEditing) {
      const updatedSkills = skills.map((skill, index) =>
        index === editIndex ? { ...skill, name: currentSkill } : skill
      );
      setSkills(updatedSkills);
      setIsEditing(false);
    } else {
      setSkills([...skills, { name: currentSkill, subskills: [] }]);
    }
    closeModal();
  };

  const editSkill = (index) => {
    setCurrentSkill(skills[index].name);
    setEditIndex(index);
    setIsEditing(true);
    openModal();
  };

  const openSubSkillModal = (index) => {
    setSelectedSkillIndex(index);
    setIsSubSkillModalOpen(true);
  };

  const closeSubSkillModal = () => {
    setIsSubSkillModalOpen(false);
  };

  const saveSubSkills = (subskills) => {
    const updatedSkills = skills.map((skill, index) =>
      index === selectedSkillIndex ? { ...skill, subskills } : skill
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
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <tr key={index}>
                <td>
                  <a href="#" onClick={() => openSubSkillModal(index)}>{skill.name}</a>
                </td>
                <td>
                  <button onClick={() => editSkill(index)}>EDIT</button>
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
          subskills={skills[selectedSkillIndex].subskills}
          saveSubSkills={saveSubSkills}
          closeModal={closeSubSkillModal}
        />
      )}
    </div>
  );
};

export default MainSkillSet;
