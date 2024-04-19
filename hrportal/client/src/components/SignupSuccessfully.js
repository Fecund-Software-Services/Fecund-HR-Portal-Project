/*
Project: Hiring Portal Project
Author: Omkar
Date: 4/04/2024
Sprint: Sprint 1
User Story: Successful Sign-up

 
Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description
-------------------------------------------------------------------------------------------------------
 
-------------------------------------------------------------------------------------------------------
*/
import React from "react";
import styles from "./SignupSuccessfully.module.css";
// import backgroundImage from "../assets/common-background-image.png"

const SignupSuccessfully = ({
  firstName,
  lastName,
  employeeId,
  email,
  answer1,
  answer2,
  answer3,
}) => {
  return (
    <div className={styles.readonly_fields} >
      <div className={styles.field_row}>
        <div className={styles.field_label}>First Name</div>
        <div className={styles.field_value}>{firstName}</div>
      </div>
      <div className={styles.field_row}>
        <div className={styles.field_label}>Last Name</div>
        <div className={styles.field_value}>{lastName}</div>
      </div>
      <div className={styles.field_row}>
        <div className={styles.field_label}>Employee ID</div>
        <div className={styles.field_value}>{employeeId}</div>
      </div>
      <div className={styles.field_row}>
        <div className={styles.field_label}>Email</div>
        <div className={styles.field_value}>{email}</div>
      </div>
      <div className={styles.field_row}>
        <div className={styles.field_label}>What is your first pet name ?</div>
        <div className={styles.field_value}>{answer1}</div>
      </div>
      <div className={styles.field_row}>
        <div className={styles.field_label}>What was your childhood nickname ?</div>
        <div className={styles.field_value}>{answer2}</div>
      </div>
      <div className={styles.field_row}>
        <div className={styles.field_label}>What was your first mobile brand name ?</div>
        <div className={styles.field_value}>{answer3}</div>
      </div>
    </div>
  );
};

export default SignupSuccessfully;
