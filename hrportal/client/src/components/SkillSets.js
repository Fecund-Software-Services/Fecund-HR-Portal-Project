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
  const [selectedSkill, setSelectedSkill] = useState("");
  const [isEditingMainSkill, setIsEditingMainSkill] = useState(false);
  const [isAddingMainSkill, setIsAddingMainSkill] = useState(false);
  const [currentSubSkill, setCurrentSubSkill] = useState("");
  const [editSubSkillIndex, setEditSubSkillIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const subskillsPerPage = 4;

  // Main Skill Integration
  const handleAddMainSkill = async () => {
    if (currentSkill.trim()) {
      try {
        const response = await fetch("/api/skillset/addSkillSet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skillname: currentSkill }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Added main skill:", data);
        setCurrentSkill("");
        setIsAddingMainSkill(false);
        fetchSkillsets(); // Fetch skills again after adding a new skill
      } catch (error) {
        console.error("Error adding main skill:", error);
      }
    }
  };

  const fetchSkillsets = async () => {
    try {
      const response = await fetch("/api/skillset/onLoadSkillSet");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched main skills:", data);
      setSkills(data);
    } catch (error) {
      console.error("Error fetching main skills:", error);
    }
  };

  useEffect(() => {
    fetchSkillsets();
  }, []);

  const handleEditMainSkill = async () => {
    if (selectedSkill) {
      const foundObject = skills.find((skill) => skill._id === selectedSkill);
      setEditIndex(skills.findIndex(skill => skill._id === selectedSkill));
      const id = foundObject._id;
      const name = currentSkill;

      try {
        const response = await fetch(`/api/skillset/editSkillSet/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skillname: name }),
        });
        if (!response.ok) {
          throw new Error(`Error updating skill! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Updated main skill:", data);
        const updatedSkills = skills.map((skill, index) =>
          index === editIndex ? data : skill
        );
        setSkills(updatedSkills);
        fetchSkillsets();
        setSelectedSkill("");
        setIsEditingMainSkill(false);
        setEditIndex(null);

      } catch (error) {
        console.error("Error updating skill:", error);
      }
    }
  };

  const handleCancelEditMainSkill = () => {
    setCurrentSkill("");
    setIsEditingMainSkill(false);
    setIsAddingMainSkill(false);
  };

  // *** Sub Skill Integration Starts Here ***

  const fetchSubSkills = async (mainSkillId) => {
    if (!mainSkillId) {
      setSubskills([]);
      return;
    }

    console.log('Fetching sub skills for main skill ID:', mainSkillId);
    try {
      const response = await fetch(`/api/skillset/onLoadSubskill/${mainSkillId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received sub skills data:', data);
      setSubskills(data);
      setCurrentPage(1); // Reset to the first page when new subskills are fetched
    } catch (error) {
      console.error('Error fetching sub skills:', error);
    }
  };

  const handleAddSubSkill = async () => {
    if (currentSubSkill.trim() && selectedSkill) {
      try {
        const response = await fetch('/api/skillset/addSubSkillSet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subsetname: currentSubSkill,
            mainSkillID: selectedSkill
          })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Added sub skill:', data);
        setSubskills([...subskills, data]);
        setCurrentSubSkill('');
      } catch (error) {
        console.error('Error adding sub skill:', error);
      }
    }
  };

  const handleEditSubSkill = (index) => {
    setEditSubSkillIndex(index);
    setCurrentSubSkill(subskills[index].subsetname);
  };

  const handleSaveSubSkill = async () => {
    if (currentSubSkill.trim() && editSubSkillIndex !== null) {
      try {
        const subSkill = subskills[editSubSkillIndex];
        const response = await fetch(`/api/skillset/editSubSkillSet/${subSkill._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subsetname: currentSubSkill })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Updated sub skill:', data);
        const updatedSubSkills = subskills.map((skill, index) =>
          index === editSubSkillIndex ? data : skill
        );
        setSubskills(updatedSubSkills);
        setEditSubSkillIndex(null);
        setCurrentSubSkill('');
      } catch (error) {
        console.error('Error saving sub skill:', error);
      }
    }
  };

  const handleSelectSkill = (skillId) => {
    if (!skillId) {
      setSelectedSkill("");
      setCurrentSkill("");
      setSubskills([]);
      return;
    }

    console.log('Selected main skill ID:', skillId);
    const skill = skills.find(skill => skill._id === skillId);
    setSelectedSkill(skillId);
    setCurrentSkill(skill.skillname);
    fetchSubSkills(skillId); // Fetch sub skills when a main skill is selected
    setSubskills([]); // Clear the previous subskills data
    setIsEditingMainSkill(false);
    setIsAddingMainSkill(false);
  };

  // Pagination for Sub Skills
  const indexOfLastSubskill = currentPage * subskillsPerPage;
  const indexOfFirstSubskill = indexOfLastSubskill - subskillsPerPage;
  const currentSubskills = subskills.slice(indexOfFirstSubskill, indexOfLastSubskill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // *** Sub Skill Integration Ends Here ***

  useEffect(() => {
    console.log(currentSkill); // Now has the updated value after rendering
  }, [currentSkill]);

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
            <option value="">Select Main Skills</option>
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
          {selectedSkill && !isEditingMainSkill && !isAddingMainSkill && (
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
      {selectedSkill && (
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
                <th>Sub Skills </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentSubskills.map((subskill, index) => (
                <tr key={subskill._id}>
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
      )}
    </div>
  );
};

export default SkillSets;


