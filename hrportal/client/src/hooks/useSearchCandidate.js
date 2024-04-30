/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 29/04/2024
Sprint: Sprint 3
User Story: Seach Candidate integration

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/
import { useState, useEffect } from 'react';

const useSearchCandidate = (searchTerm) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/candidate/search-candidate?searchTerm=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]); // Re-run effect when searchTerm changes

  return { searchResults, isLoading, error };
};

export default useSearchCandidate;