// importing useState
import { useState } from "react";

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const resetPassword = async (employeeID, newPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeID, newPassword }),
      });

      const json = await response.json();
      console.log("password changed");

      if (!response.ok) {
        throw new Error(json.message);
      } else {
        setShowPopup(!showPopup);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { resetPassword, error, isLoading, showPopup };
};
