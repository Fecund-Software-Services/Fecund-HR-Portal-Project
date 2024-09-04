import { useState, useEffect, useCallback } from "react";
const CACHE_EXPIRATION = 60 * 60 * 1000;

const useInterviewDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [subSkills, setSubSkills] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    }, []);

    // Fetch subskills based on selected main skill
  const fetchSubSkills = async (mainSkillId = "") => {
    const cacheKey = `subSkills_${mainSkillId}`;
    const cachedSubSkills = getCachedData(cacheKey);
    if (cachedSubSkills) {
      setSubSkills(cachedSubSkills);
    } else {
      try {
        const response = await fetch(
          `/api/skillset/onLoadSubskill/${mainSkillId}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch subskills. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setSubSkills(data);
        setCachedData(cacheKey, data);
      } catch (error) {
        console.error("Error fetching subskills:", error);
        setError("Failed to fetch subskills");
      }
    }
  };

  // Fetch subskills based on the selected main skill
  // const fetchSubSkills = async (mainSkillId = "") => {
  //   try {
  //     const response = await fetch(
  //       mainSkillId 
  //         ? `/api/skillset/onLoadSubskill/${mainSkillId}` 
  //         : `/api/skillset/onLoadSubskill`
  //     );
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch subskills. Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setSubSkills(data);
  //   } catch (error) {
  //     console.error("Error fetching subskills:", error);
  //     setError("Failed to fetch subskills");
  //   }
  // };

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
       // If the response is not OK, parse the error message from the response
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch report data");
      }

      const result = await response.json();
      setData(result);
      
    } catch (err) {
       // Display the backend error message
    setError(err.message);
    console.error("Error fetching report data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsets();
  }, [fetchSkillsets]);

  useEffect(() => console.log(data),[data])

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
