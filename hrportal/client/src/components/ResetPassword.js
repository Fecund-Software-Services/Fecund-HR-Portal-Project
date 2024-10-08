/*
Project: Hiring Portal Project
Author: Omkar 
Date: 08/04/2024
Sprint: Sprint 2
User Story: Reset Password

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
09/05/2024  |   Harshini C              |   4        |    BG update to all screens
10/05/2024  |   Vishal                  |   4        |    CSS and alignment based on BG image
10/05/2024  |   Harshini C              |   4        |    Log Out button
14/05/2024  |   Harshini C              |   4        |    CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |    Front End Coding Navbar 
28/08/2024  |   Harshini C              |   4        |    Footer - Implementing the social media links
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./ResetPassword.module.css"; // Import the CSS file
import { useForgotPassword } from "../hooks/useForgotPassword";
import { FaTwitterSquare , FaFacebook , FaLinkedin , FaInstagramSquare } from "react-icons/fa";




const securityQuestions = [
  {
    value: "What is your first pet name ?",
    label: "What is your first pet name ?",
  },
  {
    value: "What was your childhood nickname ?",
    label: "What was your childhood nickname ?",
  },
  {
    value: "What was your first mobile brand name ?",
    label: "What was your first mobile brand name ?",
  },
];

function ResetPassword() {
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  // const [isAnswerCorrect, setIsAnswerCorrect ] = useState(false)
  const [securityQuestion, setSecurityQuestion] = useState(
    "What is your first pet name ?"
  );
  const [answer, setAnswer] = useState("");
  const [isSecurityQuestionCorrect, setIsSecurityQuestionCorrect] =
    useState(false);

  const navigateToLogin = useNavigate();

  const { forgotPassword, error, isVerifying } = useForgotPassword();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      employeeId: employeeId,
      email: email,
      securityQuestion: securityQuestion,
      answer: answer,
    };

    console.log(userData);
    // Implement back-end logic here
    const data = await forgotPassword(
      email,
      employeeId,
      securityQuestion,
      answer
    );

    if (data) {
      setIsSecurityQuestionCorrect(true);
    }
  };

  const handleCancel = (e) => navigateToLogin("/");

  return (
    <div className={styles.reset_container}>
      {!isSecurityQuestionCorrect && (
        <div className={styles.container}>
          <div>
            <p className={styles.rastanty_Cortez}>Reset&nbsp;&nbsp;Password</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.reset_password_form}>
            <div className={styles.form_field}>
              <label htmlFor="employeeId" className={styles.form_label}>
                <b>Employee ID:</b>
              </label>
              <input
                type="number"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                className={styles.form_input}
              />
            </div>
            <div className={styles.form_field}>
              <label htmlFor="emailId" className={styles.form_label}>
                <b>Email ID:</b>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.form_input}
              />
            </div>
            <div className={styles.form_field}>
              <label htmlFor="securityQuestion" className={styles.form_label}>
                <b>Security Question:</b>
              </label>
              <select
                id="securityQuestion"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                required
                className={styles.form_input_question}
              >
                {/* // <option value="">Select a question</option> */}
                {securityQuestions.map((question) => (
                  <option key={question.value} value={question.value}>
                    {question.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.form_field}>
              <label htmlFor="answer" className={styles.form_label}>
                <b>Answer:</b>
              </label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                className={styles.form_input}
              />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.Signup_button_container}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.Signup_button}
              >
                Cancel
              </button>

              <button
                type="submit"
                //onClick={() => setShowPopup(!showPopup)}
                className={styles.Signup_button}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </button>
            </div> 
            </form>
            <div className={styles.footerContainer}>
                <a className={styles.footer} href={"https://x.com/FecundSoftware"}><p><FaTwitterSquare /></p></a>&nbsp;
                <a className={styles.footer} href={"https://www.facebook.com/FECUNDServices"}><p><FaFacebook /></p></a>&nbsp;
                <a className={styles.footer} href={"https://www.linkedin.com/company/fecund-software-services-pvt-ltd-/mycompany/"}><p><FaLinkedin /></p></a>&nbsp;
                <a className={styles.footer} href={"https://www.instagram.com/fecundservices/"}><p><FaInstagramSquare /></p></a>&nbsp;
                <a className={styles.fecundWebsite} href={"https://www.fecundservices.com/"}>www.fecundservices.com</a>   
            </div> 
        </div>
      )}
      {isSecurityQuestionCorrect && (
        <div className={styles.link_container}>
          <p className={styles.verified_text}>
            <b>Security question verified. Proceed to set new password.</b>
          </p>
          <Link className={styles.link} to={`/new-password/${employeeId}`}>
            <b>Next</b>
          </Link>
        </div>
      )}
    </div>
    
  );
}

export default ResetPassword;
