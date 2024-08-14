/*
Project: Hiring Portal Project
Author: Vishal
Date: 17/04/2024
Sprint: Sprint 2
User Story: Authentication and Authorization

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
17/4/2024     Vishal Garg                    2         Authentication & Authorization - Login
-------------------------------------------------------------------------------------------------------
*/

// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState({})

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        const { token } = data;
        console.log(data)
        setUser(data)
        
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const authContextValue = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
