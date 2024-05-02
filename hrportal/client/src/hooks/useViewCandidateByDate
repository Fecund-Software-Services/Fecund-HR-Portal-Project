/*
Project: Hiring Portal Project
Author: Sanjay HS
Date: 02/05/2024
Sprint: Sprint 3
User Story: View By Date

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/
import { useState, useEffect } from 'react';

const useViewCandidateByDate = (viewBydate) => {
  
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/candidate/view-candidate-bydate?year=????&month=??`);
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

    if (viewBydate) {
      fetchData();
    }
  }, [viewBydate]); // Re-run effect when searchTerm changes

  return { searchResults, isLoading, error };
};

export default useViewCandidateByDate;

