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
            const response = await fetch(`/api/dashboard/joining?startDate=${startDate}&endDate=${endDate}&skillset=${selectedskillsetid}&sortOrder=${sortOrder}`);
            if (!response.ok) {
                throw new Error('Failed to fetch joiningCandidates');
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
      };

    // useEffect(() => {
    //     if (startDate && endDate) {
    //         fetchCandidates();
    //     }
    // }, [startDate, endDate, selectedskillsetid, sortOrder]);

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedskillsetid,
        setselectedSkillsetid,
        sortOrder,
        setSortOrder,
        joiningCandidates,
        setJoiningCandidates,
        loading,
        error,
        fetchCandidates,
        fetchSkillsets,
        skills,
        setSkills,
        handleSkillChange,
        handleSortChange
    };
};

export default useHiringHook;
