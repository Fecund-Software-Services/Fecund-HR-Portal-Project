import { useState, useEffect, useCallback } from "react";

const useInterviewDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [subSkills, setSubSkills] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch main skills with caching
  const fetchSkillsets = useCallback(async () => {
    try {
      const response = await fetch("/api/skillset/onLoadSkillSet");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching main skills:", error);
      setError("Failed to fetch main skills");
    }
  },[]);

  // Fetch subskills based on the selected main skill
  const fetchSubSkills = async (mainSkillId = "") => {
    try {
      const response = await fetch(
        mainSkillId 
          ? `/api/skillset/onLoadSubskill/${mainSkillId}` 
          : `/api/skillset/onLoadSubskill`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch subskills. Status: ${response.status}`);
      }
      const data = await response.json();
      setSubSkills(data);
    } catch (error) {
      console.error("Error fetching subskills:", error);
      setError("Failed to fetch subskills");
    }
  };

  // Fetch the report data for the Interview Dashboard
  const fetchReport = async (startDate, endDate, skillset) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({ startDate, endDate, skillset }).toString();
      const response = await fetch(`/api/dashboard/interview?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch report data");
      console.error("Error fetching report data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsets();
  }, [fetchSkillsets]);

  return {
    skills,
    subSkills,
    data,
    loading,
    error,
    fetchReport,
    fetchSubSkills,
    fetchSkillsets,
    setData,
  };
};

export default useInterviewDashboard;
