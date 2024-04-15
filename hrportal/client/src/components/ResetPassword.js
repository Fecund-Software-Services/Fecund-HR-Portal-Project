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

-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/common-background-image.png"; // Import the background image
import styles from "./ResetPassword.module.css"; // Import the CSS file
//import Login from './Login'; // Import the Login component

import { useForgotPassword } from '../hooks/useForgotPassword'

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
  const [securityQuestion, setSecurityQuestion] = useState("What is your first pet name ?");
  const [answer, setAnswer] = useState("");
  // const [showPopup, setShowPopup] = useState(false);

  const navigateToLogin = useNavigate();
  // const navigateToPopup = useNavigate();

  const { forgotPassword, error, isVerifying } = useForgotPassword()

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

    await forgotPassword(email, employeeId, securityQuestion, answer)


    // Implement logic to reset password based on user input
  
  };

  const handleCancel = (e) => navigateToLogin("/");

  // const togglePopup = () => {
  //   navigateToLogin("/");
  // };

  return (
    <div
      className={styles.reset_container}
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} className={styles.reset_password_form}>
        <h1 className={styles.reset_password_title}>Reset Password</h1>
        <div className={styles.form_field}>
          <label htmlFor="employeeId" className={styles.form_label}>
            Employee ID:
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
            Email ID:
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
            Security Question:
          </label>
          <select
            id="securityQuestion"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            required
            className={styles.form_input}
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
            Answer:
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
      {/* {showPopup && (
        <div className={styles.popup} onClick={togglePopup}>
          <div
            className={styles.popup_content}
            // style={{ backgroundImage: `url(${popupBackground})` }}
          >
            <p className={styles.popup_message}>
              Form submitted successfully!
              <br />
              <a href="/" className={styles.login_here}>
                {" "}
                Login Here
              </a>
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ResetPassword;
