/*
Project: Hiring Portal Project
Author: Vishal
Date: 12/04/2024
Sprint: Sprint 2
User Story: Enter New Password


Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
12/02/2024  |   Vishal                  |   2        |    Enter New Password
09/05/2024  |   Harshini C              |   4        |    BG update to all screens
10/05/2024  |   Harshini C              |   4        |    Log Out button
14/05/2024  |   Harshini C              |   4        |    CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |    Front End Coding Navbar 
28/08/2024  |   Harshini C              |   4        |    Footer - Implementing the social media links
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backgroundImages.png";
import popupBackground from "../assets/backgroundImages.png";
import styles from "./NewPassword.module.css"; // Import the CSS file
import { useResetPassword } from "../hooks/useResetPassword";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

function NewPassword() {
  // Set employee ID from previous screen
  const { employeeId } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigateToPopup = useNavigate();

  const { resetPassword, error, isLoading, showPopup } = useResetPassword();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement logic to reset password with new password
    await resetPassword(employeeId, newPassword);
  };

  const togglePopup = () => {
    //setShowPopup(!showPopup);
    navigateToPopup("/");
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
      <p className={styles.rastanty_Cortez}>Enter New Password</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.formField}>
          <label htmlFor="employeeId" className={styles.fieldLabel}>
            Employee ID:
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            readOnly
            className={styles.formInput}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="newPassword" className={styles.fieldLabel}>
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            required
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.formInput}
          />
        </div>
        <br />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.button}
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Sunmitting..." : "Reset Password"}
          </button>
        </div>
      </form>
      {showPopup && (
        <div className={styles.popup} onClick={togglePopup}>
          <div
            className={styles.popup_content}
            style={{ backgroundImage: `url(${popupBackground})` }}
          >
            <p className={styles.popup_message}>
              Password change successfully!
              <br />
              <a href="/" className={styles.login_here}>  
                Login Here
              </a>
            </p>
          </div>
        </div>
      )}
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

export default NewPassword;
