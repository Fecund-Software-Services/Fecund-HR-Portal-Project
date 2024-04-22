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

import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuth();
    const nav =  useNavigate();

    const handleLogout = () => {
        logout();
        nav('/')
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;