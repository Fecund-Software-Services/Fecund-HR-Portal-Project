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
24/4/2024       Vishal                       3           Search Candidate
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [errorMessage, setErrorMessage] = useState('');

  const nav = useNavigate()

  const skillSetOptions = ["Java", "Python", "JavaScript", "C++"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = (e) => nav("/home");

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    let newValue = checked ? value : "";
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleServingNoticePeriodChange = (e) => {
    const { name, checked, value } = e.target;
    let newValue = checked ? value : "";
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    })); 
    setShowLastWorkingDay(value);
  };

  const handleResumeChange = (e) => {

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 250 * 1024) { // 250 KB (in bytes)
        setErrorMessage('File size exceeds 250 KB limit.');
      } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)) {
        setErrorMessage('Invalid file type. Only PDF, DOC, DOCX files are allowed.');
      } else {
        setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
        setErrorMessage('');
      }
    }
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
            <label htmlFor="firstName">First Name<span className={styles.asterisk}>*</span>:</label>
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
            <label htmlFor="lastName">Last Name<span className={styles.asterisk}>*</span>:</label>
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
            <label htmlFor="email">Email ID<span className={styles.asterisk}>*</span>:</label>
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
            <label htmlFor="mobileNumber">Mobile Number<span className={styles.asterisk}>*</span>:</label>
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
            <label htmlFor="totalRelevantExperience">
              Total Relevant Experience<span className={styles.asterisk}>*</span> (Yrs):
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
              Total IT Experience<span className={styles.asterisk}>*</span> (Yrs):
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
            <label htmlFor="skillSet">Skill Set<span className={styles.asterisk}>*</span>:</label>
            <select
              name="skillSet"
              id="skillSet"
              value={formData.skillSet}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Skills </option>
              {skillSetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="currentCompany">Current Company<span className={styles.asterisk}>*</span>:</label>
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
            <label htmlFor="currentCTC">Current CTC (LPA)<span className={styles.asterisk}>*</span>:</label>
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
            <label htmlFor="expectedCTC">Expected CTC<span className={styles.asterisk}>*</span>:</label>
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
            <label htmlFor="noticePeriod">Notice Period<span className={styles.asterisk}>*</span> (Days):</label>
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
            <label htmlFor="servingNoticePeriod">Serving Notice Period<span className={styles.asterisk}>*</span>:</label>
            <div className={styles.checkbox_container}>
            <label>
              <input
                type="checkbox"
                name="servingNoticePeriod"
                value="Yes"
                onChange={handleServingNoticePeriodChange}
                checked={formData.servingNoticePeriod === "Yes"} // Check if the value is 'Yes'
              />
              Yes
            </label>
            <label>
              <input
                type="checkbox"
                name="servingNoticePeriod"
                value="No"
                onChange={handleServingNoticePeriodChange}
                checked={formData.servingNoticePeriod === "No"} // Check if the value is 'No'
              />
              No
            </label>
            </div>
            
            
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="certified">Certified?<span className={styles.asterisk}>*</span></label>
            <div className={styles.checkbox_container}>
              <label >
                <input
                  type="checkbox"
                  name="certified"
                  value="Yes"
                  onChange={handleCheckboxChange}
                  checked={formData.certified === "Yes"} // Check if the value is 'Yes'
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  value="No"
                  onChange={handleCheckboxChange}
                  checked={formData.certified === "No"} // Check if the value is 'No'
                />
                No
              </label>
            </div>

          
          </div>
          <div  className={styles.sub_container} style={{ display: showLastWorkingDay === "Yes" ? "flex" : "none" }}>
            <label htmlFor="lastWorkingDay">Last Working Day<span className={styles.asterisk}>*</span>:</label>
            <input
              type="date"
              name="lastWorkingDay"
              id="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleInputChange}
              required={showLastWorkingDay}
              
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
          <div className={styles.sub_container} >
            <label htmlFor="resume">Resume<span className={styles.asterisk}>*</span>:</label>
            <input
              type="file"
              name="resume"
              id="resume"
              onChange={handleResumeChange}
              required
              className={styles.resume}
            />
          </div>
          <div className={styles.sub_container} >
           
          </div>
        </div>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <div className={styles.button_container}>
          <button type="button" className={styles.cancel_button}
          onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
        </div>
      </form>
      <div className={styles.disclaimer}>
      <p>Fields marked with an asterisk<span className={styles.asterisk}>(*)</span> are required.</p>
      </div>
    </div>
  );
};

export default NewCandidate;
