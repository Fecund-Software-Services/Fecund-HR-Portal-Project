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
17/4/2024     Vishal Garg                    2         configure Authorization
-------------------------------------------------------------------------------------------------------
*/

import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/common-background-image.png";
import styles from "./HomePage.module.css";
import LogoutButton from "./LogoutButton";

function HomePage() {
  return (
    <div
      className={styles.home_page_container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Fecund Hiring Portal </h1>

        <div className={styles.link_container}>
          <Link to="/home/search-candidate" className={styles.link}>
            <p>View/Search Candidate</p>
          </Link>
          <Link to="/home/add-new-candidate" className={styles.link}>
            <p>Add New Candidate</p>
          </Link>
          <div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
