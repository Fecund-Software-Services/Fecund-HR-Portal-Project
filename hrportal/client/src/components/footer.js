/*
Project: Hiring Portal Project
Author: Harshini
Date: 30/08/2024
Sprint: Sprint 4
Phase : 2
User Story: Footer - Implementing the social media links
 
Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |   Phase | Description
-------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------
*/

import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import styles from "./footer.module.css";

const footer = () => {
  
    return (
        <div className={styles.footerContainer}>
        <a className={styles.footer} href={"https://x.com/FecundSoftware"}><p><FaTwitterSquare /></p></a>&nbsp;
        <a className={styles.footer} href={"https://www.facebook.com/FECUNDServices"}><p><FaFacebook /></p></a>&nbsp;
        <a className={styles.footer} href={"https://www.linkedin.com/company/fecund-software-services-pvt-ltd-/mycompany/"}><p><FaLinkedin /></p></a>&nbsp;
        <a className={styles.footer} href={"https://www.instagram.com/fecundservices/"}><p><FaInstagramSquare /></p></a>&nbsp;
        <a className={styles.fecundWebsite} href={"https://www.fecundservices.com/"}>www.fecundservices.com</a>   
        </div>  
    );
};

export default footer;