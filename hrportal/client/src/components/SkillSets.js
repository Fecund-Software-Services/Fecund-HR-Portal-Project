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
8/08/2024   |   Omkar                   |   3        |    Search Functionality, None Scenario implementation
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
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [showPagination, setShowPagination] = useState(false); // State to control pagination visibility
  const [currentSearchPage, setCurrentSearchPage] = useState(1); // Current page for search results
  const [showSearchPagination, setShowSearchPagination] = useState(false); // Pagination control for search results
  const [error, setError] = useState(" ");

  const subskillsPerPage = 4;

  // Main Skills Integration Starts Here

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
        // Handle the error from the backend
        let errorMessage = "An error occurred while adding the skill.";
        if (error.message.includes("400")) {
          // Specific error handling if it's a 400 (Bad Request) error
          errorMessage =
            "Main Skill already exists. Please try a different name.";
        } else {
          // Generic error handling for other errors
          console.warn("Unhandled error type:", error.message);
        }
        // Update UI state with the error message
        setError(errorMessage);
      }
    }
  };

  const handleEditMainSkill = async () => {
    if (selectedSkill) {
      try {
        const response = await fetch(
          `/api/skillset/editSkillSet/${selectedSkill}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ skillname: currentSkill }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error updating skill! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Updated main skill:", data);
        const updatedSkills = skills.map((skill) =>
          skill._id === selectedSkill ? data : skill
        );
        setSkills(updatedSkills);
        setCurrentSkill("");
        setIsEditingMainSkill(false);
        fetchSkillsets();
      } catch (error) {
        console.error("Error updating skill:", error);
        // Handle the error from the backend
        let errorMessage = "An error occurred while adding the skill.";
        if (error.message.includes("400")) {
          // Specific error handling if it's a 400 (Bad Request) error
          errorMessage =
            "Error: Updated skill name matches an existing skillset!";
        } else {
          // Generic error handling for other errors
          console.warn("Unhandled error type:", error.message);
        }
        // Update UI state with the error message
        setError(errorMessage);
      }
    }
  };

  const handleCancelEditMainSkill = () => {
    setCurrentSkill("");
    setIsEditingMainSkill(false);
    setIsAddingMainSkill(false);
  };

  const handleSelectSkill = (skillId) => {
    setSelectedSkill(skillId);
    fetchSubSkills(skillId); // Fetch subskills for the selected main skill
  };

  // Main Skills Integration Ends Here

  // Sub Skills Integration Starts Here

  const fetchSubSkills = async (mainSkillId = "") => {
    try {
      const response = await fetch(
        `/api/skillset/onLoadSubskill/${mainSkillId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSubskills(data);
      setCurrentPage(1);
      setShowPagination(data.length > subskillsPerPage); // Determine if pagination is needed
      setSearchResults([]); // Clear search results when fetching subskills
    } catch (error) {
      console.error("Error fetching sub skills:", error);
    }
  };

  const handleAddSubSkill = async () => {
    if (currentSubSkill.trim() && selectedSkill !== "None") {
      try {
        const response = await fetch("/api/skillset/addSubSkillSet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subsetname: currentSubSkill,
            mainSkillID: selectedSkill,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Added sub skill:", data);
        setSubskills([...subskills, data]);
        setCurrentSubSkill("");
        fetchSubSkills(selectedSkill); // Refresh subskills after adding
      } catch (error) {
        console.error("Error adding sub skill:", error);
        // Handle the error from the backend
        let errorMessage = "An error occurred while adding the skill.";
        if (error.message.includes("400")) {
          // Specific error handling if it's a 400 (Bad Request) error
          errorMessage = "Error: Subskill with the name already exists";
        } else {
          // Generic error handling for other errors
          console.warn("Unhandled error type:", error.message);
        }
        // Update UI state with the error message
        setError(errorMessage);
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
        const response = await fetch(
          `/api/skillset/editSubSkillSet/${subSkill._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ subsetname: currentSubSkill }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Updated sub skill:", data);
        const updatedSubSkills = subskills.map((skill, index) =>
          index === editSubSkillIndex ? data : skill
        );
        setSubskills(updatedSubSkills);
        setEditSubSkillIndex(null);
        setCurrentSubSkill("");
      } catch (error) {
        console.error("Error saving sub skill:", error);
        // Handle the error from the backend
        let errorMessage = "An error occurred while adding the skill.";
        if (error.message.includes("400")) {
          // Specific error handling if it's a 400 (Bad Request) error
          errorMessage =
            "Error: Another Subskill with this name already exists";
        } else {
          // Generic error handling for other errors
          console.warn("Unhandled error type:", error.message);
        }
        // Update UI state with the error message
        setError(errorMessage);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/skillset/search-skills?skills=${currentSubSkill}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      setSearchResults(data); // Set the search results
      setCurrentSearchPage(1);
      setShowSearchPagination(data.length > subskillsPerPage); // Determine if pagination is needed
    } catch (error) {
      console.error("Error searching skills:", error);
      // Handle the error from the backend
      let errorMessage = "An error occurred while adding the skill.";
      if (error.message.includes("400")) {
        // Specific error handling if it's a 400 (Bad Request) error
        errorMessage = "Error: Search query is required";
      } else {
        // Generic error handling for other errors
        console.warn("Unhandled error type:", error.message);
      }
      // Update UI state with the error message
      setError(errorMessage);
    }
  };

  // Sub Skills Integration Ends Here

  useEffect(() => {
    fetchSkillsets();
    fetchSubSkills(); // Fetch all sub skills on initial load
  }, []);

  const indexOfLastSubskill = currentPage * subskillsPerPage;
  const indexOfFirstSubskill = indexOfLastSubskill - subskillsPerPage;
  const currentSubskills = subskills.slice(
    indexOfFirstSubskill,
    indexOfLastSubskill
  );

  const indexOfLastSearchResult = currentSearchPage * subskillsPerPage;
  const indexOfFirstSearchResult =
    indexOfLastSearchResult - indexOfLastSubskill;
  const currentSearchResults = searchResults.slice(
    indexOfFirstSearchResult,
    indexOfLastSearchResult
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateSearchResults = (pageNumber) =>
    setCurrentSearchPage(pageNumber);

  return (
    <div className={styles.mainConatiner}>
      <div className={styles.skillSetsContainer}>
        {/* Main Skills Section */}
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
            {selectedSkill !== "None" &&
              !isEditingMainSkill &&
              !isAddingMainSkill && (
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
                onChange={(e) => {
                  setCurrentSkill(e.target.value);
                  setError("");
                }}
                placeholder={
                  isEditingMainSkill ? "Edit main skill" : "Add main skill"
                }
              />
              {isAddingMainSkill ? (
                <>
                  <button
                    className={styles.button}
                    onClick={handleAddMainSkill}
                  >
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
                  <button
                    className={styles.button}
                    onClick={handleEditMainSkill}
                  >
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

        {/* Sub Skills Section */}
        <div className={styles.subSkillSection}>
          <p className={styles.rastanty_Cortez}>Sub Skill Sets</p>
          <div className={styles.subSkillControls}>
            <input
              type="text"
              className={styles.input_field}
              value={currentSubSkill}
              onChange={(e) => {
                setCurrentSubSkill(e.target.value);
                setError("");
              }}
              placeholder="Add/Edit/Search sub skill"
            />
            {selectedSkill !== "None" && (
              <button className={styles.button} onClick={handleAddSubSkill}>
                Add
              </button>
            )}
            <button className={styles.button} onClick={handleSearch}>
              Search
            </button>
            {editSubSkillIndex !== null && (
              <button className={styles.button} onClick={handleSaveSubSkill}>
                Save
              </button>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className={styles.subSkillTable}>
              <p className={styles.searchResults}>Search Results:</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Main Skills</th>
                    <th>Sub Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSearchResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.mainSkillName}</td>
                      <td>{result.subSkillName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showSearchPagination && (
                <div className={styles.pagination}>
                  {currentSearchPage > 1 && (
                    <button
                      className={styles.button}
                      onClick={() =>
                        paginateSearchResults(currentSearchPage - 1)
                      }
                    >
                      Previous
                    </button>
                  )}
                  <button
                    className={styles.button}
                    onClick={() => paginateSearchResults(currentSearchPage + 1)}
                    disabled={
                      currentSearchPage >=
                      Math.ceil(searchResults.length / subskillsPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
          {searchResults.length === 0 && (
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
                    <td>
                      {skills.find(
                        (skill) => skill._id === subskill.mainSkillID
                      )?.skillname || "N/A"}
                    </td>
                    <td>
                      {editSubSkillIndex === index ? (
                        <input
                          type="text"
                          className={styles.input_field}
                          value={currentSubSkill}
                          onChange={(e) => {
                            setCurrentSubSkill(e.target.value);
                            setError("");
                          }}
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
          )}
          {/* Show Subskill pagination only if there are no search results */}
          {showPagination && searchResults.length === 0 && (
            <div className={styles.pagination}>
              {currentPage > 1 && (
                <button
                  className={styles.button}
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              )}
              <button
                className={styles.button}
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage >= Math.ceil(subskills.length / subskillsPerPage)
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <div>{error && <p className={styles.errorMessage}>{error}</p>}</div>
    </div>
  );
};

export default SkillSets;
