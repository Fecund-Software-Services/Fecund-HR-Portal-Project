/*
Project: Hiring Portal Project
Author: Omkar
Date: 5/08/2024
Sprint: PHASE 2 Sprint 3
User Story: Phase 2 STATUS Screen Validation

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author            |   Sprint        |    Description 
-------------------------------------------------------------------------------------------------------

*/

import { useState } from 'react';

const useStatus = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      setErrorMessage(errorData.message);
      return null;
    }
    setErrorMessage('');
    return response.json();
  };

  const fetchStatuses = async () => {
    const response = await fetch('/api/status/get-status');
    return handleResponse(response);
  };

  const addStatus = async (name) => {
    const response = await fetch('/api/status/add-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  };

  const editStatus = async (id, name) => {
    const response = await fetch(`/api/status/edit-status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  };

  return {
    errorMessage,
    fetchStatuses,
    addStatus,
    editStatus,
  };
};

export default useStatus;
