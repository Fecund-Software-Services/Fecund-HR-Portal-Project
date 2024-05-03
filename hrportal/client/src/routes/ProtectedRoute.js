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
17/4/2024     Vishal Garg               |     2      |   configure Authorization
24/4/2024     Vishal Garg               |     3      |   Search Candidate
26/4/2024   |   Vishal                  |    3       |   View Candidate Details
-------------------------------------------------------------------------------------------------------
*/

// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
};

export default ProtectedRoute;
