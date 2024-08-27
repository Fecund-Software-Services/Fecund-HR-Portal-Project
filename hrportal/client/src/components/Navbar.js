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
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
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
    // console.log(adminDropdownOpen);
  };

  const handleDashboDropdownToggle = (isOpen) => {
    setDashboardDropdownOpen(isOpen);
    // console.log(adminDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        {userData.role === "admin" ? (
          <li
            className={styles.adminLink}
            onMouseEnter={() => handleAdminDropdownToggle(true)}
            onMouseLeave={() => handleAdminDropdownToggle(false)}
          >
            <a className={styles.adminDropdownToggle} href="#">
              Admin
            </a>
            <ul
              className={`${styles.adminDropdown} ${
                adminDropdownOpen ? styles.show : ""
              }`}
            >
              <ul className={styles.link}>
                <Link to="/home/skillset">SkillSet</Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/status">Status</Link>
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
              Dashboard
            </a>
            <ul
              className={`${styles.adminDropdown} ${
                dashboardDropdownOpen ? styles.show : ""
              }`}
            >
              <ul className={styles.link}>
                <Link to="/home/periodical">Periodical</Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/interview">Interview</Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/joining">Joining</Link>
              </ul>
              <ul className={styles.link}>
                <Link to="/home/defferred">Defferred</Link>
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
            Logout{" "}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
