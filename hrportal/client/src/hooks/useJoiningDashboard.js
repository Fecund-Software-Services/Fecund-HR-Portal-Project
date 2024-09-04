/*
Project: Hiring Portal Project
Author: HS
Date: 03/09/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */

import { useState, useCallback } from "react";
const CACHE_EXPIRATION = 60 * 60 * 1000;

const useJoiningDashboard = () => {
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [skills, setSkills] = useState([]);
  const [subSkills, setSubSkills] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [selectedskillsetid, setselectedSkillsetid] = useState('');
  // const [selectedSkill, setSelectedSkill] = useState("None");
  const [sortOrder, setSortOrder] = useState('asc');
  // const [joiningCandidates, setJoiningCandidates] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

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

  // fetch main skills
  // Memoize fetchSkillsets using useCallback
  const fetchSkillsets = useCallback(async () => {
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
  }, []); // Empty array means this function is created once per component lifecycle

  // IF SKILLSET IS SELECTED FROM DROPDOWN PASS THE SELECTED SKILL ID
  // const handleSkillChange = (e) => {
  //     const selectedValue = e.target.value;
  //     if (selectedValue === "None") {
  //         setSelectedSkill("None");
  //         setselectedSkillsetid("");
  //     } else {
  //       const skillselected = skills.find((skill) => skill._id === selectedValue);
  //       if (skillselected) {
  //         setSelectedSkill(skillselected.skillname);
  //         setselectedSkillsetid(skillselected._id);
  //       }
  //     }
  //     setStartDate("");
  //     setEndDate("");
  //     setJoiningCandidates(null);
  //   };

  const fetchCandidates = async (startDate, endDate, selectedSkillId) => {
    setLoading(true);
    setError(null);
    try {
         // Construct the query parameters
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
      //   skillset: skillset !== 'None' ? skillset : ''
        }).toString();

      let url = `/api/dashboard/joining?${queryParams}}`;
      if (selectedSkillId) {
        url += `&skillset=${selectedSkillId}`;
      }
      const response = await fetch(url, {
        method: "GET", // Keep as GET
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch joiningCandidates");
      }
      const data = await response.json();
      console.log("API Response:", data);
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleSortChange = (newSortOrder) => {
  //     setSortOrder(newSortOrder);
        fetchCandidates();  // Fetch the sorted data after changing the sort order
  //   };

  return {
    skills,
    subSkills,
    data,
    loading,
    error,
    fetchSkillsets,
    fetchCandidates,
    setData,
    // sortOrder,
    // setSortOrder,
    // handleSortChange,
  };
};

export default useJoiningDashboard;
