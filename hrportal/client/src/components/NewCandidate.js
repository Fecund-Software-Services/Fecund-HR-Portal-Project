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
18/4/2024   |   Omkar & Vishal          |   2        |  Add New Candidate
24/4/2024   |   Vishal                  |   3        |  Search Candidate
29/4/2024   |   Vishal                  |   3        |  Add New Candidate Validations - Code Integration
09/05/2024  |   Harshini C              |   4        |  BG update to all screens
10/05/2024  |   Vishal                  |   4        |  CSS and alignment based on BG image
10/05/2024  |   Harshini C              |   4        |  Log Out button
14/05/2024  |   Harshini C              |   4        |  CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |    Front End Coding Navbar 
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewCandidate.module.css";
import popupBackground from "../assets/PopupBackgroundImage.png";

const NewCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    skillSet: "",
    itExperience: "",
    totalRelevantExperience: "",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    servingNoticePeriod: false,
    lastWorkingDay: "",
    certified: false,
    comments: "",
    status: "Submitted",
    resume: null,
  });

  const navigateToPopup = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(" ");
  const [isLoading, setIsLoading] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const nav = useNavigate();
  const navigateToHome = useNavigate();

  const skillSetOptions = [
    "Guidewire BA (PC)",
    "Guidewire BA (BC)",
    "Guidewire BA (CC)",
    "Guidewire QA (PC)",
    "Guidewire QA (BC)",
    "Guidewire QA (CC)",
    "Guidewire DEV (PC)",
    "Guidewire DEV (BC)",
    "Guidewire DEV (CC)",
    "Guidewire Lead (CC)",
    "Guidewire Lead (PC)",
    "Guidewire Lead (BC)",
    "Buisness Analyst",
    "Technical Specialist",
    "Guidewire Integration Developer",
    "Guidewire Architect",
    "Guidewire QA",
    "Guidewire Portal",
    "Guidewire Datahub",
    "Guidewire Infocentre",
    "Recruitment Executive",
    "Business Development Executive",
    "Guidewire Backend Developer",
    "Duckcreek Developer",
    "Coldfusion Developer",
    "Oneshield Designer",
    "Digital Marketing Executive",
    "Mulesoft Developer",
    "Scrum Master",
    "Project Leader",
    "Oneshield BA",
    "Oneshield QA",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMobileNumberChange = (e) => {
    const { name } = e.target;
    const newMobileNumber = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prevData) => ({ ...prevData, [name]: newMobileNumber }));
  };

  const handleCancel = (e) => nav("/home");

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    // let newValue = checked;
    setFormData((prevData) => ({ ...prevData, [name]: !prevData.certified }));
  };

  const handleServingNoticePeriodChange = (e) => {
    const { name } = e.target;
    // let newValue = checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData.servingNoticePeriod,
    }));
  };

  const handleResumeChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 250 * 1024) {
        // 250 KB (in bytes)
        setErrorMessage("File size exceeds 250 KB limit.");
      } else if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(selectedFile.type)
      ) {
        setErrorMessage(
          "Invalid file type. Only PDF, DOC, DOCX files are allowed."
        );
      } else {
        setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
        console.log("in resume field ");
        setErrorMessage("");
      }
    }
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    const regex = /^[A-Za-z]+$/; // Allows only alphabets

    if (!regex.test(key)) {
      e.preventDefault(); // Prevent invalid character from being entered
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const formDataToSend = new FormData(); // Create a new FormData object

    // Append all form data fields to the FormData object
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("emailAddress", formData.emailAddress);
    formDataToSend.append("mobileNumber", formData.mobileNumber);
    formDataToSend.append("skillSet", formData.skillSet);
    formDataToSend.append("itExperience", formData.itExperience);
    formDataToSend.append(
      "totalRelevantExperience",
      formData.totalRelevantExperience
    );
    formDataToSend.append("currentCompany", formData.currentCompany);
    formDataToSend.append("currentCTC", formData.currentCTC);
    formDataToSend.append("expectedCTC", formData.expectedCTC);
    formDataToSend.append("noticePeriod", formData.noticePeriod);
    formDataToSend.append("servingNoticePeriod", formData.servingNoticePeriod);
    formDataToSend.append("lastWorkingDay", formData.lastWorkingDay);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("certified", formData.certified);
    formDataToSend.append("comments", formData.comments);

    // Append the resume file to the FormData object
    formDataToSend.append("resume", formData.resume);

    const addCandidate = async (formDataToSend) => {
      console.log(formDataToSend);
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/candidate/add-candidate", {
          method: "POST",
          // headers: {'Content-Type': 'application/json'},
          body: formDataToSend,
        });
        console.log(response);

        const json = await response.json();
        console.log(json);

        if (!response.ok) {
          throw new Error(json.message);
        }
        if (response.ok) {
          setShowPopup(!showPopup);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    addCandidate(formDataToSend);
  };

  const togglePopup = () => {
    //setShowPopup(!showPopup);
    navigateToPopup("/home");
  };

  const handleClick = (e) => {
    // Prevent default navigation to home page
    e.preventDefault();

    // Redirect to login page (replace with your login page URL)
    navigateToHome("/home");
  };

  return (
    <div className={styles.addcandidateform_container}>
      <div className={styles.title_container}>
        <p className={styles.rastanty_Cortez}>Add New Candidate</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.addcandidateform_form}>
        <div className={styles.form_left}>
          {/* Left side form fields here */}
          <div className={styles.sub_container}>
            <label htmlFor="firstName">
              First Name<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="lastName">
              Last Name<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="emailAddress">
              Email ID<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="email"
              name="emailAddress"
              id="email"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="mobileNumber">
              Mobile Number<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="tel"
              name="mobileNumber"
              maxLength="10"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleMobileNumberChange}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="totalRelevantExperience">
              Total Relevant Experience (Yrs)
              <span className={styles.asterisk}>*</span>:
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
            <label htmlFor="itExperience">
              Total IT Experience (Yrs)
              <span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="number"
              name="itExperience"
              id="totalITExperience"
              value={formData.itExperience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="skillSet">
              Skill Set<span className={styles.asterisk}>*</span>:
            </label>
            <select
              name="skillSet"
              id="skillSet"
              value={formData.skillSet}
              onChange={handleInputChange}
              className={styles.dropdown}
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
            <label htmlFor="currentCompany">
              Current Company<span className={styles.asterisk}>*</span>:
            </label>
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
            <label htmlFor="currentCTC">
              Current CTC (LPA)<span className={styles.asterisk}>*</span>:
            </label>
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
            <label htmlFor="expectedCTC">
              Expected CTC<span className={styles.asterisk}>*</span>:
            </label>
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
            <label htmlFor="noticePeriod">
              Notice Period (Days)<span className={styles.asterisk}>*</span>:
            </label>
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
            <label htmlFor="servingNoticePeriod">
              Serving Notice Period<span className={styles.asterisk}>*</span>:
            </label>
            <div className={styles.checkbox_container}>
              <label>
                <input
                  type="checkbox"
                  name="servingNoticePeriod"
                  // id="servingNoticePeriod"
                  value="Yes"
                  onChange={handleServingNoticePeriodChange}
                  checked={formData.servingNoticePeriod === true} // Check if the value is 'Yes'
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="servingNoticePeriod"
                  // id="servingNoticePeriod"
                  value="No"
                  onChange={handleServingNoticePeriodChange}
                  checked={formData.servingNoticePeriod === false} // Check if the value is 'No'
                />
                No
              </label>
            </div>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="certified">
              Certified?<span className={styles.asterisk}>*</span>:
            </label>
            <div className={styles.checkbox_container}>
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  // id="certified"
                  value="Yes"
                  onChange={handleCheckboxChange}
                  checked={formData.certified === true} // Check if the value is 'Yes'
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  // id="certified"
                  value="No"
                  onChange={handleCheckboxChange}
                  checked={formData.certified === false} // Check if the value is 'No'
                />
                No
              </label>
            </div>
          </div>
          {formData.servingNoticePeriod === true && ( // Check if 'Yes' is selected
            <div className={styles.sub_container}>
              <label htmlFor="lastWorkingDay">
                Last Working Day<span className={styles.asterisk}>*</span>:
              </label>
              <input
                type="date"
                name="lastWorkingDay"
                id="lastWorkingDay"
                value={formData.lastWorkingDay}
                onChange={handleInputChange}
              />
            </div>
          )}

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
            <label htmlFor="resume">
              Resume<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              onChange={handleResumeChange}
              required
              className={styles.resume}
            />
          </div>
          <div className={styles.sub_container}></div>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <div className={styles.button_container}>
          <button
            type="button"
            className={styles.cancel_button}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submit_button}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      <div className={styles.disclaimer}>
        <p>
          Fields marked with an asterisk
          <span className={styles.asterisk}>(*)</span> are required.
        </p>
      </div>
      {showPopup && (
        <div className={styles.popup} onClick={togglePopup}>
          <div
            className={styles.popup_content}
            style={{ backgroundImage: `url(${popupBackground})` }}
          >
            <p className={styles.popup_message}>
              Candidate details submitted successfully!
              <br />
              {/* <a href="/home" className={styles.login_here}> */}
              <a href="#" className={styles.login_here} onClick={handleClick}>
                Go to Home Page Here
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCandidate;
