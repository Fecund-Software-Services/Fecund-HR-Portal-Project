/*
Project: Hiring Portal Project
Author: HS
Date: 04/09/2024
Sprint: Phase 2 Sprint 5

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------
5/09/2024   |    Omkar                  |      5     |   2     |  Clear the report when status changes, None condition
-------------------------------------------------------------------------------------------------------
// */


import { useState } from 'react';

const useDeferredDashboard = () => {
  const [deferredCandidates, setDeferredCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidates = async (startDate, endDate, status) => {
    if (!startDate || !endDate) return;

    setLoading(true);
    setError(null);

    try {
      let url = `/api/dashboard/deferred?startDate=${startDate}&endDate=${endDate}`;
      if (status!== 'None') {
        url += `&status=${encodeURIComponent(status)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        // If the response is not OK, parse the error message from the response
        const errorData = await response.json();  
        throw new Error(errorData.error || 'Failed to fetch deferred candidates');
      }

      const data = await response.json();
      setDeferredCandidates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deferredCandidates, loading, error, fetchCandidates, setDeferredCandidates };
};

export default useDeferredDashboard;
