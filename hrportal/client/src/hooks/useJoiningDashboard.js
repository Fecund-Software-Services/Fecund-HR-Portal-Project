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

import { useState, useEffect } from 'react';

const useHiringHook = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [skills, setSkills] = useState([]);
    const [selectedskillsetid, setselectedSkillsetid] = useState('');
    const [selectedSkill, setSelectedSkill] = useState("None");
    const [sortOrder, setSortOrder] = useState('asc');
    const [joiningCandidates, setJoiningCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false)

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

    useEffect(() => {
        fetchSkillsets();
      }, []);

    // IF SKILLSET IS SELECTED FROM DROPDOWN PASS THE SELECTED SKILL ID
    const handleSkillChange = (e) => {
        setButtonClicked(false);
        const selectedValue = e.target.value;
        if (selectedValue === "None") {
            setSelectedSkill("None");
            setselectedSkillsetid("");
        } else {
          const skillselected = skills.find((skill) => skill._id === selectedValue);
          if (skillselected) {
            setSelectedSkill(skillselected.skillname); 
            setselectedSkillsetid(skillselected._id); 
          }
        }
        setStartDate("");
        setEndDate("");
        setJoiningCandidates(null);
      };


    const fetchCandidates = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `/api/dashboard/joining?startDate=${startDate}&endDate=${endDate}&sortOrder=${sortOrder}`;
            if (selectedskillsetid) {
                url += `&skillset=${selectedskillsetid}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
               // If the response is not OK, parse the error message from the response
               const errorData = await response.json();       
               throw new Error(errorData.error || "Failed to fetch report data");
            }
            const data = await response.json();
            setJoiningCandidates(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
        fetchCandidates();  // Fetch sorted data after changing sort order
      };

    const generateReport = () => {
        fetchCandidates();
    };

    return {
        buttonClicked,
        setButtonClicked,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedskillsetid,
        setselectedSkillsetid,
        selectedSkill,
        sortOrder,
        setSortOrder,
        joiningCandidates,
        setJoiningCandidates,
        loading,
        error,
        fetchSkillsets,
        skills,
        setSkills,
        handleSkillChange,
        handleSortChange,
        generateReport
    };
};

export default useHiringHook;

