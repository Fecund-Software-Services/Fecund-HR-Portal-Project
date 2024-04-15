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

-------------------------------------------------------------------------------------------------------
*/

import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/common-background-image.png";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div
      className={styles.home_page_container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div class={styles.container}>
        
          <h1 className={styles.title}>Welcome to Fecund Hiring Portal </h1>
      
        <div className={styles.link_container}>
          <Link to="/search-candidate" className={styles.link}>
            <p>View/Search Candidate</p>
          </Link>
          <Link to="/add-new-candidate" className={styles.link}>
            <p>Add New Candidate</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
