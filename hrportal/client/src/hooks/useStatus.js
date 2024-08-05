import { useState, useEffect } from 'react';

const useStatus = () => {
  const [statuses, setStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchStatuses = async () => {
    try {
      const response = await fetch('/api/status/get-status');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStatuses(data);
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error fetching statuses:', error);
    }
  };

  const addStatus = async (name) => {
    try {
      const response = await fetch('/api/status/add-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setStatuses((prevStatuses) => [...prevStatuses, data]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error adding status:', error);
    }
  };

  const editStatus = async (id, name) => {
    try {
      const response = await fetch(`/api/status/edit-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setStatuses((prevStatuses) =>
        prevStatuses.map((status) => (status._id === id ? data : status))
      );
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return {
    statuses,
    errorMessage,
    addStatus,
    editStatus,
  };
};

export default useStatus;
