/*
Project: Hiring Portal Project
Author: Omkar
Date: 8/07/2024
Sprint: Sprint 1 PHASE 2
User Story: Phase2 Admin Display (SkillSet Screen)

 
Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase     |    Description
-------------------------------------------------------------------------------------------------------
18/07/2024  |   omkar and vishal        |   2        |    2       |    Front End Coding SkillSet 
1/08/2024   |   Omkar & Vishal          |   2        |    2       |    Main Skill & Subskill Integration
8/08/2024   |   Omkar                   |   3        |    2       |    Search Functionality, None Scenario implementation
14/08/2024  |   Omkar                   |   2        |    2       |    Updated handle Search Function
14/8/24     |   HS                      |   3        |    2       |    Caching
19/08/2024  |   Harshini C              |   3        |    2       |    Worked on CSS 
-------------------------------------------------------------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import styles from "./SkillSets.module.css";

// setting cache expiration
const CACHE_EXPIRATION = 60 * 60 * 1000;

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
  const [searchResults, setSearchResults] = useState([]);
  const [showPagination, setShowPagination] = useState(false);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [showSearchPagination, setShowSearchPagination] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const subskillsPerPage = 4;

  // caching
  const getCachedData = (key) => {
    const cachedItem = localStorage.getItem(key);
    if (cachedItem) {
      const { data, timestamp } = JSON.parse(cachedItem);
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        return data;
      }
    }
    return null;
  };

  const setCachedData = (key, data) => {
    const cachedItem = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cachedItem));
  };

  const clearCache = (key) => {
    localStorage.removeItem(key);
  };

  // Main Skills Integration Starts Here

  const fetchSkillsets = async () => {
    const cachedSkills = getCachedData("mainSkills");
    if (cachedSkills) {
      setSkills(cachedSkills);
    } else {
      try {
        const response = await fetch("/api/skillset/onLoadSkillSet");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSkills(data);
        setCachedData("mainSkills", data);
      } catch (error) {
        console.error("Error fetching main skills:", error);
      }
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
        clearCache("mainSkills");
        fetchSkillsets(); // Fetch skills again after adding a new skill
      } catch (error) {
        console.error("Error adding main skill:", error);
        let errorMessage = "An error occurred while adding the skill.";
        if (error.message.includes("400")) {
          errorMessage =
            "Main Skill already exists. Please try a different name.";
        }
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
        clearCache("mainSkills");
        fetchSkillsets();
      } catch (error) {
        console.error("Error updating skill:", error);
        let errorMessage = "An error occurred while updating the skill.";
        if (error.message.includes("400")) {
          errorMessage =
            "Error: Updated skill name matches an existing skillset!";
        }
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
    setCurrentSubSkill(""); // Reset sub skill input when selecting a new main skill
    setError("");
    fetchSubSkills(skillId); // Fetch subskills for the selected main skill
  };

  // Main Skills Integration Ends Here

  // Sub Skills Integration Starts Here

  const fetchSubSkills = async (mainSkillId = "") => {
    const cacheKey = `subSkills_${mainSkillId}`;
    const cachedSubSkills = getCachedData(cacheKey);
    if (cachedSubSkills) {
      setSubskills(cachedSubSkills);
      setCurrentPage(1);
      setShowPagination(cachedSubSkills.length > subskillsPerPage); // Determine if pagination is needed
      setSearchResults([]); // Clear search results when fetching subskills
    } else {
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
        setCachedData(cacheKey, data);
      } catch (error) {
        console.error("Error fetching subskills:", error);
      }
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
        console.log("Added subskill:", data);
        setSubskills([...subskills, data]);
        setCurrentSubSkill(""); // Reset input after adding a subskill
        clearCache(`subSkills_${selectedSkill}`);
        fetchSubSkills(selectedSkill); // Refresh subskills after adding
      } catch (error) {
        console.error("Error adding subskill:", error);
        let errorMessage = "An error occurred while adding the skill.";
        if (error.message.includes("400")) {
          errorMessage = "Error: Subskill with the name already exists";
        }
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
        console.log("Updated subskill:", data);
        const updatedSubSkills = subskills.map((skill, index) =>
          index === editSubSkillIndex ? data : skill
        );
        setSubskills(updatedSubSkills);
        setEditSubSkillIndex(null);
        setCurrentSubSkill(""); // Reset input after saving a subskill
        clearCache(`subSkills_${selectedSkill}`);
      } catch (error) {
        console.error("Error saving subskill:", error);
        let errorMessage = "An error occurred while saving the skill.";
        if (error.message.includes("400")) {
          errorMessage =
            "Error: Another Subskill with this name already exists";
        }
        setError(errorMessage);
      }
    }
  };
  /*
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/skillset/search-skills?skills=${currentSubSkill}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("No results found!");
      } else {
        setError("");
      }
      setSearchResults(data); // Set the search results
      setCurrentSearchPage(1);
      setShowSearchPagination(data.length > subskillsPerPage); // Determine if pagination is needed
    } catch (error) {
      console.error("Error searching skills:", error);
      let errorMessage = "An error occurred while searching.";
      if (error.message.includes("400")) {
        errorMessage = "Error: Search query is required";
      }
      setError(errorMessage);
    }
  };*/
  //Search result based on main skill selected
  const handleSearch = async () => {
    try {
      // Include selectedSkill in the query if it is selected
      const mainSkillIdParam =
        selectedSkill !== "None" ? `&mainSkillId=${selectedSkill}` : "";
      /**const cacheKey = `search_${currentSubSkill}_${mainSkillIdParam}`;

      // Check cache first
      const cachedResults = getCachedData(cacheKey);
      if (cachedResults) {
        setSearchResults(cachedResults);
        setCurrentSearchPage(1);
        setShowSearchPagination(cachedResults.length > subskillsPerPage);
        setError(cachedResults.length === 0 ? "No results found!" : "");
        return;
      } */
      const response = await fetch(
        `/api/skillset/search-skills?skills=${currentSubSkill}${mainSkillIdParam}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      /** Cache the results
      setCachedData(cacheKey, data);**/

      if (data.length === 0) {
        setError("No results found!");
      } else {
        setError("");
      }
      setSearchResults(data); // Set the search results
      setCurrentSearchPage(1);
      setShowSearchPagination(data.length > subskillsPerPage); // Determine if pagination is needed
    } catch (error) {
      console.error("Error searching skills:", error);
      let errorMessage = "An error occurred while searching.";
      if (error.message.includes("400")) {
        errorMessage = "Error: Search query is required";
      }
      setError2(errorMessage);
    }
  };

  // Sub Skills Integration Ends Here

  useEffect(() => {
    fetchSkillsets();
    fetchSubSkills(); // Fetch all subskills on initial load
  }, []);

  const indexOfLastSubskill = currentPage * subskillsPerPage;
  const indexOfFirstSubskill = indexOfLastSubskill - subskillsPerPage;
  const currentSubskills = subskills.slice(
    indexOfFirstSubskill,
    indexOfLastSubskill
  );

  const indexOfLastSearchResult = currentSearchPage * subskillsPerPage;
  const indexOfFirstSearchResult = indexOfLastSearchResult - subskillsPerPage;
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
                {subskills.length === 0 ? ( // Check if there are subskills
                  <tr>
                    <td colSpan="3">No subskill found</td>
                  </tr>
                ) : (
                  currentSubskills.map((subskill, index) => (
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
                  ))
                )}
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
