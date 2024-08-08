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
18/07/2024  |   omkar and vishal        |   2        |    Front End Coding SkillSet 
-------------------------------------------------------------------------------------------------------
1/08/2024   |   Omkar & Vishal          |   2        |   Main Skill & Subskill Integration
*/


import React, { useState, useEffect } from "react";
import styles from "./SkillSets.module.css";

const SkillSets = () => {
  const [skills, setSkills] = useState([]);
  const [subskills, setSubskills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("None");
  const [isEditingMainSkill, setIsEditingMainSkill] = useState(false);
  const [isAddingMainSkill, setIsAddingMainSkill] = useState(false);
  const [currentSubSkill, setCurrentSubSkill] = useState("");
  const [editSubSkillIndex, setEditSubSkillIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const subskillsPerPage = 4;

  const fetchSkillsets = async () => {
    try {
      const response = await fetch("/api/skillset/onLoadSkillSet");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching main skills:", error);
    }
  };

  const fetchSubSkills = async (mainSkillId = "") => {
    try {
      const response = await fetch(`/api/skillset/onLoadSubskill/${mainSkillId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSubskills(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching sub skills:", error);
    }
  };

  useEffect(() => {
    fetchSkillsets();
    fetchSubSkills(); // Fetch all sub skills on initial load
  }, []);

  const handleSelectSkill = (skillId) => {
    setSelectedSkill(skillId);
    if (skillId === "None") {
      fetchSubSkills(""); // Fetch all sub skills
    } else {
      fetchSubSkills(skillId); // Fetch sub skills for the selected main skill
    }
  };

  const handleAddMainSkill = async () => {
    // Existing code for adding main skill
  };

  const handleEditMainSkill = async () => {
    // Existing code for editing main skill
  };

  const handleCancelEditMainSkill = () => {
    setCurrentSkill("");
    setIsEditingMainSkill(false);
    setIsAddingMainSkill(false);
  };

  const handleAddSubSkill = async () => {
    // Existing code for adding sub skill
  };

  const handleEditSubSkill = (index) => {
    setEditSubSkillIndex(index);
    setCurrentSubSkill(subskills[index].subsetname);
  };

  const handleSaveSubSkill = async () => {
    // Existing code for saving sub skill
  };

  const indexOfLastSubskill = currentPage * subskillsPerPage;
  const indexOfFirstSubskill = indexOfLastSubskill - subskillsPerPage;
  const currentSubskills = subskills.slice(indexOfFirstSubskill, indexOfLastSubskill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.skillSetsContainer}>
      <div className={styles.mainSkillSection}>
        <div className={styles.title}>
          <p className={styles.rastanty_Cortez}>Main Skill Sets</p>
        </div>

        <div className={styles.mainSkillControls}>
          <select
            className={styles.input_field}
            value={selectedSkill}
            onChange={(e) => handleSelectSkill(e.target.value)}
          >
            <option value="None">None</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill._id}>
                {skill.skillname}
              </option>
            ))}
          </select>
          {!isEditingMainSkill && !isAddingMainSkill && (
            <button
              className={styles.button}
              onClick={() => setIsAddingMainSkill(true)}
            >
              Add
            </button>
          )}
          {selectedSkill !== "None" && !isEditingMainSkill && !isAddingMainSkill && (
            <button
              className={styles.button}
              onClick={() => setIsEditingMainSkill(true)}
            >
              Edit
            </button>
          )}
        </div>
        {(isEditingMainSkill || isAddingMainSkill) && (
          <div className={styles.mainSkillEditControls}>
            <input
              type="text"
              className={styles.input_field}
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder={
                isEditingMainSkill ? "Edit main skill" : "Add main skill"
              }
            />
            {isAddingMainSkill ? (
              <>
                <button className={styles.button} onClick={handleAddMainSkill}>
                  Save
                </button>
                <button
                  className={styles.button}
                  onClick={handleCancelEditMainSkill}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className={styles.button} onClick={handleEditMainSkill}>
                  Save
                </button>
                <button
                  className={styles.button}
                  onClick={handleCancelEditMainSkill}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.subSkillSection}>
        <p className={styles.rastanty_Cortez}>Sub Skill Sets</p>
        <div className={styles.subSkillControls}>
          <input
            type="text"
            className={styles.input_field}
            value={currentSubSkill}
            onChange={(e) => setCurrentSubSkill(e.target.value)}
            placeholder="Add/Edit sub skill"
          />
          <button className={styles.button} onClick={handleAddSubSkill}>
            Add
          </button>
          {editSubSkillIndex !== null && (
            <button className={styles.button} onClick={handleSaveSubSkill}>
              Save
            </button>
          )}
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Main Skills</th>
              <th>Sub Skills</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentSubskills.map((subskill, index) => (
              <tr key={subskill._id}>
                <td>{skills.find(skill => skill._id === subskill.mainSkillID)?.skillname || "N/A"}</td>
                <td>
                  {editSubSkillIndex === index ? (
                    <input
                      type="text"
                      className={styles.input_field}
                      value={currentSubSkill}
                      onChange={(e) => setCurrentSubSkill(e.target.value)}
                    />
                  ) : (
                    subskill.subsetname
                  )}
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleEditSubSkill(index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subskills.length > subskillsPerPage && (
          <div className={styles.pagination}>
            <button
              className={styles.button}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={styles.button}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(subskills.length / subskillsPerPage)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSets;
