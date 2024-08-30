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
18/07/2024  |   Vishal Garg             |   2        |    Front End Coding Navbar 
28/08/2024  |   Harshini C              |   4        |    Footer - Implementing the social media links

-------------------------------------------------------------------------------------------------------
*/

import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

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
      <div className={styles.footerContainer}>
        <a className={styles.footer} href={"https://x.com/FecundSoftware"}><p><FaTwitterSquare /></p></a>&nbsp;
        <a className={styles.footer} href={"https://www.facebook.com/FECUNDServices"}><p><FaFacebook /></p></a>&nbsp;
        <a className={styles.footer} href={"https://www.linkedin.com/company/fecund-software-services-pvt-ltd-/mycompany/"}><p><FaLinkedin /></p></a>&nbsp;
        <a className={styles.footer} href={"https://www.instagram.com/fecundservices/"}><p><FaInstagramSquare /></p></a>&nbsp;
        <a className={styles.fecundWebsite} href={"https://www.fecundservices.com/"}>www.fecundservices.com</a>   
     </div>  
    </div>
  );
}

export default HomePage;
