/*
Project: Hiring Portal Project
Author: HS
Date: 04/09/2024
Sprint: Phase 2 Sprint 4

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase  |  Description 
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
// */

import { useState, useEffect } from 'react';

const useDeferredDashboard = (startDate, endDate, status) => {
  const [deferredCandidates, setDeferredCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeferredCandidates = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
      setError(null);

      try {
        let url = `/api/dashboard/deferred?startDate=${startDate}&endDate=${endDate}`;
        if (status) {
          url += `&status=${encodeURIComponent(status)}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch deferred candidates');
        }

        const data = await response.json();
        setDeferredCandidates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeferredCandidates();
  }, [startDate, endDate, status]);

  return { deferredCandidates, loading, error };
};

export default useDeferredDashboard;