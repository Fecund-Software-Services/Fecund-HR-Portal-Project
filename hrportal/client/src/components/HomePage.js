/*
Project: Hiring Portal Project
Author: Omkar & Vishal
Date: 05/04/2024
Sprint: Sprint 1 
User Story: Successful Login and Home Page

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
17/4/2024   |   Vishal Garg             |   2        |    Authentication & Authorization - Login
09/05/2024  |   Harshini C              |   4        |    BG update to all screens
10/05/2024  |   Vishal                  |   4        |   CSS and alignment based on BG image
10/05/2024  |   Harshini C              |   4        |    Log Out button
8/07/2024   |   Vishal Garg             |   1        |    Front End Coding Navbar
-------------------------------------------------------------------------------------------------------
*/

import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.home_page_container}>
      <div className="wrapper"></div>
      
      <div className={styles.container}>
        <div className={styles.link_container}>
          <Link to="/home/search-candidate" className={styles.link}>
            <p>View/Search Candidate</p>
          </Link>
          <Link to="/home/add-new-candidate" className={styles.link}>
            <p>Add New Candidate</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
