/*
Project: Hiring Portal Project
Author: Omkar & Vishal
Date: 01/04/2024
Sprint: Sprint 2
User Story:Add New Candidate

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
18/4/2024       Omkar & Vishal               2           Add New Candidate
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import styles from './NewCandidate.module.css';

const NewCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    skillSet: "",
    totalITExperience: 0,
    totalRelevantExperience: 0,
    currentCompany: "",
    currentCTC: 0,
    expectedCTC: 0,
    noticePeriod: 0,
    servingNoticePeriod: false,
    lastWorkingDay: "",
    certified: false,
    comments: "",
    resume: null,
  });

  const [showLastWorkingDay, setShowLastWorkingDay] = useState(false);

  const skillSetOptions = ["Java", "Python", "JavaScript", "C++"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let newValue = checked ? "Yes" : "No";
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleServingNoticePeriodChange = (e) => {
    const { name, checked } = e.target;
    let newValue = checked ? "Yes" : "No";
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    // let value = newValue = "Yes" ? true : false
    setShowLastWorkingDay(newValue);
  };

  const handleResumeChange = (e) => {
    setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className={styles.addcandidateform_container}>
      <div className={styles.title_container}>
        <p className={styles.form_title}>Add New Candidate</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.addcandidateform_form}>
        <div className={styles.form_left}>
          {/* Left side form fields here */}
          <div className={styles.sub_container}>
            <label htmlFor="firstName">First Name*:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="lastName">Last Name*:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="email">Email ID*:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="mobileNumber">Mobile Number*:</label>
            <input
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="skillSet">Skill Set*:</label>
            <select
              name="skillSet"
              id="skillSet"
              value={formData.skillSet}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Skill Set*</option>
              {skillSetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="totalRelevantExperience">
              Total Relevant Experience* (Yrs):
            </label>
            <input
              type="number"
              name="totalRelevantExperience"
              id="totalRelevantExperience"
              value={formData.totalRelevantExperience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="totalITExperience">
              Total IT Experience* (Yrs):
            </label>
            <input
              type="number"
              name="totalITExperience"
              id="totalITExperience"
              value={formData.totalITExperience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="currentCompany">Current Company*:</label>
            <input
              type="text"
              name="currentCompany"
              id="currentCompany"
              value={formData.currentCompany}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="currentCTC">Current CTC (LPA)*:</label>
            <input
              type="number"
              name="currentCTC"
              id="currentCTC"
              value={formData.currentCTC}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="expectedCTC">Expected CTC*:</label>
            <input
              type="number"
              name="expectedCTC"
              id="expectedCTC"
              value={formData.expectedCTC}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">Notice Period (Days)*:</label>
            <input
              type="number"
              name="noticePeriod"
              id="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="servingNoticePeriod">Serving Notice Period*:</label>
            <div className={styles.checkbox_conatiner}>
            <label>
              <input
                type="checkbox"
                name="servingNoticePeriod"
                onChange={handleServingNoticePeriodChange}
                checked={formData.servingNoticePeriod === "Yes"} // Check if the value is 'Yes'
              />
              Yes
            </label>
            <label>
              <input
                type="checkbox"
                name="servingNoticePeriod"
                onChange={handleServingNoticePeriodChange}
                checked={formData.servingNoticePeriod === "No"} // Check if the value is 'No'
              />
              No
            </label>
            </div>
            
            {/* <input
              type="checkbox"
              name="servingNoticePeriod"
              id="servingNoticePeriod"
              checked={formData.servingNoticePeriod}
              onChange={handleServingNoticePeriodChange}
            /> */}
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="certified">Certified?*</label>
            <div className={styles.checkbox_conatiner}>
              <label >
                <input
                  type="checkbox"
                  name="certified"
                  onChange={handleCheckboxChange}
                  checked={formData.certified === "Yes"} // Check if the value is 'Yes'
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  onChange={handleCheckboxChange}
                  checked={formData.certified === "No"} // Check if the value is 'No'
                />
                No
              </label>
            </div>

            {/* <input
              type="checkbox"
              name="certified"
              id="certified"
              checked={formData.certified}
              onChange={handleInputChange}
            /> */}
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="lastWorkingDay">Last Working Day*:</label>
            <input
              type="date"
              name="lastWorkingDay"
              id="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleInputChange}
              required={showLastWorkingDay}
              style={{ display: showLastWorkingDay ? "block" : "none" }}
            />
          </div>
          
          <div className={styles.sub_container}>
            <label htmlFor="comments">Comments:</label>
            <textarea
              name="comments"
              id="comments"
              value={formData.comments}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="resume">Resume*:</label>
            <input
              type="file"
              name="resume"
              id="resume"
              onChange={handleResumeChange}
              required
              className={styles.resume}
            />
          </div>
        </div>
        <div className={styles.button_container}>
          <button type="button" className={styles.cancel_button}>
            Cancel
          </button>
          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
        </div>
      </form>
      <div className={styles.disclaimer}>
      <p>Fields marked with an asterisk (*) are required.</p>
      </div>
    </div>
  );
};

export default NewCandidate;
