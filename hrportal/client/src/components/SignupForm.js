/*
Project: Hiring Portal Project
Author: Omkar
Date: 01/04/2024
Sprint: Sprint 2
User Story: Sign up screen

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint   | Description 
-------------------------------------------------------------------------------------------------------
22/04/2024  | Harshini C              | 3        | Display Asterisk for mandatory Sign-up fields and mandatory note 
24/4/2024   | Vishal                  | 3        | Search Candidate
09/05/2024  | Harshini C              | 4        | BG update to all screens
10/05/2024  | Vishal                  | 4        | CSS and alignment based on BG image
10/05/2024  | Harshini C              | 4        | Log Out button
14/05/2024  | Harshini C              | 4        | CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |    Front End Coding Navbar 
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import popupBackground from "../assets/backgroundImages.png";
import styles from "./SignupForm.module.css";
// importing "useSignup" from hooks
import { useSignup } from "../hooks/useSignup.js";

const SignUpForm = () => {
  // State for form handling
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeID, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  //const [showPopup, setShowPopup] = React.useState(false);
  // using 'useSignup' for integrating with backend
  const { signup, error, isLoading, showPopup } = useSignup();
  const navigateToLogin = useNavigate();
  const navigateToPopup = useNavigate();

  // function that calls signup hok
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(
      firstName,
      lastName,
      employeeID,
      email,
      password,
      answer1,
      answer2,
      answer3
    );
  };

  const handleCancel = (e) => navigateToLogin("/");

  const togglePopup = () => {
  
    navigateToPopup("/");
  };

  const handleClick = (e) => {
    // Prevent default navigation to home page
    e.preventDefault();

    // Redirect to login page (replace with your login page URL)
    navigateToLogin('/');
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.title_container}>
        <p className={styles.rastanty_Cortez}>Sign up Form</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.signup_form}>
        <div className={styles.sub_container}>
          <label htmlFor="EmployeeFirstName" className={styles.label_type}>
            Employee First Name <span className={styles.asterisk}>*</span>:
          </label>
          <input
            type="text"
            value={firstName}
            // onChange={(e) => setEmployeeFirstName(e.target.value)}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.login_input}
            name="EmployeeFirstName"
            required
          />
        </div>
        <br />

        <div className={styles.sub_container}>
          <label htmlFor="EmployeeLastName" className={styles.label_type}>
            Employee Last Name <span className={styles.asterisk}>*</span>:
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.login_input}
            name="EmployeeLastName"
            required
          />
        </div>
        <br />

        <div className={styles.sub_container}>
          <label htmlFor="EmployeeID" className={styles.label_type}>
            Employee ID <span className={styles.asterisk}>*</span>:
          </label>
          <input
            type="number"
            value={employeeID}
            onChange={(e) => setEmployeeId(e.target.value)}
            className={styles.login_input}
            name="EmployeeID"
            required
          />
        </div>
        <br />

        <div className={styles.sub_container}>
          <label htmlFor="email" className={styles.label_type}>
            Email ID <span className={styles.asterisk}>*</span>:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.login_input}
            name="email"
            required
          />
        </div>
        <br />

        <div className={styles.sub_container}>
          <label htmlFor="password" className={styles.label_type}>
            Password <span className={styles.asterisk}>*</span>:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.login_input}
            name="password"
            required
          />
        </div>
        {/* <br /> */}

        <div>
  <div className={styles.sub_container_question}>
    <label className={styles.label_type_q} htmlFor="SecurityQuestion1">
      Security Question 1 <span className={styles.asterisk}>*</span>
    </label>
    <p className={styles.p_type}>
      What is your first pet name?
    </p>
  </div>
  <div className={styles.sub_container}>
    <label className={styles.label_type} htmlFor="answer1">
      Answer <span className={styles.asterisk}>*</span>:
    </label>
    <input
      type="password"
      value={answer1}
      onChange={(e) => setAnswer1(e.target.value)}
      className={styles.login_input}
      id="answer1"
      name="SecurityQuestion1"
      required
    />
  </div>
</div>

<div>
  <div className={styles.sub_container_question}>
    <label className={styles.label_type_q} htmlFor="SecurityQuestion2">
      Security Question 2 <span className={styles.asterisk}>*</span>
    </label>
    <p className={styles.p_type}>
      What was your childhood nickname?
    </p>
  </div>
  <div className={styles.sub_container}>
    <label className={styles.label_type} htmlFor="answer2">
      Answer <span className={styles.asterisk}>*</span>:
    </label>
    <input
      type="password"
      value={answer2}
      onChange={(e) => setAnswer2(e.target.value)}
      className={styles.login_input}
      id="answer2"
      name="SecurityQuestion2"
      required
    />
  </div>
</div>

<div>
  <div className={styles.sub_container_question}>
    <label className={styles.label_type_q} htmlFor="SecurityQuestion3">
      Security Question 3 <span className={styles.asterisk}>*</span>
    </label>
    <p className={styles.p_type}>
      What was your first mobile brand name?
    </p>
  </div>
  <div className={styles.sub_container}>
    <label className={styles.label_type} htmlFor="answer3">
      Answer <span className={styles.asterisk}>*</span>:
    </label>
    <input
      type="password"
      value={answer3}
      onChange={(e) => setAnswer3(e.target.value)}
      className={styles.login_input}
      id="answer3"
      name="SecurityQuestion3"
      required
    />
  </div>
</div>
<br />

       
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
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Signup"}
          </button>
        </div>
      </form>

      <div className={styles.disclaimer}>
        <p>
          Fields marked with an asterisk (<span className={styles.asterisk}>*</span>) are required.
        </p>
      </div>

      {showPopup && (
        <div className={styles.popup} onClick={togglePopup}>
          <div
            className={styles.popup_content}
            style={{ backgroundImage: `url(${popupBackground})` }}
          >
            <p className={styles.popup_message}>
              Form submitted successfully!
              <br />
              <button 
              type="button" 
              className={styles.login_here} 
              onClick={handleClick}
             >
              Login Here
             </button>

            </p>
            {/* <button className={styles.popup_close_button} onClick={togglePopup}>
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
