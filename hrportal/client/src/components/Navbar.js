/*
Project: Hiring Portal Project phase 2
Author: Omkar & Vishal
Date: 8/07/2024
Sprint: Sprint 1
User Story: Phase 2 Admin Display

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
8/07/2024   |   Vishal Garg             |   1       |    Front End Coding Navbar
26/07/2024  |   Vishal Garg             | ph2 sp4   |    Navbar Dashboard Link Implementation
 4/09/2024  |    Omkar Tajane           |     5      |   Joining Dashboard Implmentation
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);

  const { logout, userData } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  const handleAdminDropdownToggle = (isOpen) => {
    setAdminDropdownOpen(isOpen);
    
  };

  const handleDashboDropdownToggle = (isOpen) => {
    setDashboardDropdownOpen(isOpen);
    
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li className={styles.adminLink}>
          <Link className={styles.adminDropdownToggle} to="/home"><b>Home</b></Link>
        </li>

        {/* Admin Dropdown */}
        {userData.role === "admin" ? (
          <li
            className={styles.adminLink}
            onMouseEnter={() => handleAdminDropdownToggle(true)}
            onMouseLeave={() => handleAdminDropdownToggle(false)}
          >
            <a className={styles.adminDropdownToggle} href="#">
              <b>Admin</b>
            </a>
            <ul
              className={`${styles.adminDropdown} ${
                adminDropdownOpen ? styles.show : ""
              }`}
            >
              <ul className={styles.link}>
                <Link to="/home/skillset"><b>SkillSet</b></Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/status"><b>Status</b></Link>
              </ul>
            </ul>
          </li>
        ) : (
          " "
        )}

        {userData.role === "admin" ? (
          <li
            className={styles.adminLink}
            onMouseEnter={() => handleDashboDropdownToggle(true)}
            onMouseLeave={() => handleDashboDropdownToggle(false)}
          >
            <a className={styles.adminDropdownToggle} href="#">
              <b>Dashboard</b>
            </a>
            <ul
              className={`${styles.adminDropdown} ${
                dashboardDropdownOpen ? styles.show : ""
              }`}
            >
              <ul className={styles.link}>
                <Link to="/home/periodicdashboard"><b>Periodical</b></Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/interviewdashboard"><b>Interview</b></Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/joiningdashboard"><b>Joining</b></Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/deferreddashboard"><b>Deferred</b></Link>
              </ul>
            </ul>
          </li>
        ) : (
          " "
        )}

        <li className={styles.logoutLink}>
          <div
            className={styles.logout}
            title="Click here to Logout"
            onClick={handleLogout}
          >
            <b>Logout{" "}</b>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
