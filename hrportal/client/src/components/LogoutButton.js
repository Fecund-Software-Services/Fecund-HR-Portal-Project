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
17/4/2024   |   Vishal Garg             |   2        |   Authentication & Authorization - Login
10/05/2024  |   Harshini C              |   4        |   Log Out button
-------------------------------------------------------------------------------------------------------
*/

import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import styles from './LogoutButton.module.css'
//import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
    const { logout } = useAuth();
    const nav =  useNavigate();

    const handleLogout = () => {
        logout();
        nav('/')
    };

   // return <div class={styles.logOut} title="Click here to Logout" onClick={handleLogout}><FaSignOutAlt /> </div>
    
};

export default LogoutButton;