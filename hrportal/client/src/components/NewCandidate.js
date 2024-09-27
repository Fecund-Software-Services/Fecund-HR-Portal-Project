/*
Project: Hiring Portal Project
Author: Omkar & Vishal
Date: 01/04/2024
Sprint: Sprint 2
User Story:Add New Candidate

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase   |  Description 
-------------------------------------------------------------------------------------------------------
18/4/2024   |   Omkar & Vishal          |   2        |  1       |  Add New Candidate
24/4/2024   |   Vishal                  |   3        |  1       |  Search Candidate
29/4/2024   |   Vishal                  |   3        |  1       |  Add New Candidate Validations - Code Integration
09/05/2024  |   Harshini C              |   4        |  1       |  BG update to all screens
10/05/2024  |   Vishal                  |   4        |  1       |  CSS and alignment based on BG image
10/05/2024  |   Harshini C              |   4        |  1       |  Log Out button
14/05/2024  |   Harshini C              |   4        |  1       |  CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |  1       |  Front End Coding Navbar 
26/8/2024   |   Vishal Garg             |   4        |  2       |  Add New Candidate - Total Relevant experience, Interview Date and Joining Date
28/08/2024  |   Harshini C              |   4        |  2       |  Footer - Implementing the social media links
-------------------------------------------------------------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewCandidate.module.css";
import popupBackground from "../assets/backgroundImages.png";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const NewCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    skillSet: "",
    subskillset: "",
    itExperience: "",
    itExperienceDisplay: "",
    totalRelevantExperience: "",
    totalRelevantExperienceDisplay:"",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    currentCTCDisplay:"",
    expectedCTCDisplay:"",
    // interviewDate:"",
    // joiningDate:"",
    // statusUpdatedDate:"",
    // statusComments:"",
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
  const [skillSetOptions, setSkillSetOptions] = useState([]);
  const [subSkillSetOptions, setSubSkillSetOptions] = useState([]);
  const [mainSkillId, setMainSkillId] = useState("");

  const nav = useNavigate();
  const navigateToHome = useNavigate();

  const fetchSkillsets = async () => {
    try {
      const response = await fetch("/api/skillset/onLoadSkillSet");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched main skills:", data);
      setSkillSetOptions(data);
      console.log(skillSetOptions);
    } catch (error) {
      console.error("Error fetching main skills:", error);
    }
  };

  useEffect(() => {
    fetchSkillsets();
  }, []);

  const fetchSubSkills = async (mainSkillId) => {
    if (!mainSkillId) {
      setSubSkillSetOptions([]);
      return;
    }

    console.log("Fetching sub skills for main skill ID:", mainSkillId);
    try {
      const response = await fetch(
        `/api/skillset/onLoadSubskill/${mainSkillId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received sub skills data:", data);
      setSubSkillSetOptions(data);
    } catch (error) {
      console.error("Error fetching sub skills:", error);
    }
  };

  useEffect(() => {
    console.log(subSkillSetOptions);
  }, [subSkillSetOptions]);

  useEffect(() => {
    if (formData.skillSet) {
      const desiredSkillName = formData.skillSet;
      const object = skillSetOptions.find(
        (skill) => skill.skillname === desiredSkillName
      );
      console.log(object);
      if (object) {
        fetchSubSkills(object._id);
      } else {
        console.error("Skill not found:", desiredSkillName);
        // Handle the case where the skill is not found, e.g., set subskills to an empty array
        setSubSkillSetOptions([]);
      }
    }
  }, [formData.skillSet]);

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

  const handleSubSkillSetChange = (e) => {
    console.log("hello");
    console.log("Selected sub skill:", e.target.value);
    setFormData({ ...formData, subskillset: e.target.value });
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
    formDataToSend.append("subskillset", formData.subskillset);
    formDataToSend.append("itExperience", formData.itExperience);
    formDataToSend.append(
      "totalRelevantExperience",
      formData.totalRelevantExperience
    );
    formDataToSend.append("currentCompany", formData.currentCompany);
    formDataToSend.append("currentCTC", formData.currentCTC);
    formDataToSend.append("expectedCTC", formData.expectedCTC);
    // formDataToSend.append("interviewDate", formData.interviewDate);
    // formDataToSend.append("joiningDate", formData.joiningDate);
    // formDataToSend.append("statusUpdatedDate", formData.statusUpdatedDate);
    // formDataToSend.append("statusComments", formData.statusComments);
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
              <b>First Name<span className={styles.asterisk}>*</span>:</b>
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
            <b>Last Name<span className={styles.asterisk}>*</span>:</b>
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
            <b>Email ID<span className={styles.asterisk}>*</span>:</b>
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
            <b>Mobile Number<span className={styles.asterisk}>*</span>:</b>
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
            <label htmlFor="itExperience">
            <b> Total IT Experience (Yrs)</b>
              <span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="number"
              name="itExperience"
              id="totalITExperience"
              value={formData.itExperienceDisplay}
              onChange={(e) => {
                const experience = e.target.value;
                // Update the display value with the user's input
                setFormData((prevData) => ({
                  ...prevData,
                  itExperienceDisplay: experience,
                }));
              }}
              onBlur={() => {
                // When the user leaves the input field, check if value is more than 25
                const experienceValue = parseFloat(formData.itExperienceDisplay);
                setFormData((prevData) => ({
                  ...prevData,
                  itExperience: experienceValue,
                }));
              }}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="totalRelevantExperience">
            <b> Total Relevant Experience (Yrs)</b>
              <span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="number"
              name="totalRelevantExperience"
              id="totalRelevantExperience"
              value={formData.totalRelevantExperienceDisplay}
              onChange={(e) => {
                const experience = e.target.value;
                // Update the display value with the user's input
                setFormData((prevData) => ({
                  ...prevData,
                  totalRelevantExperienceDisplay: experience,
                }));
              }}
              onBlur={() => {
                // When the user leaves the input field, check if value is more than 25
                const experienceValue = parseFloat(formData.totalRelevantExperienceDisplay);
                setFormData((prevData) => ({
                  ...prevData,
                  totalRelevantExperience: experienceValue,
                }));
              }}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="skillSet">
            <b>Skill Set<span className={styles.asterisk}>*</span>:</b>
            </label>
            <select
              name="skillSet"
              id="skillSet"
              value={formData.skillSet}
              onChange={handleInputChange}
              className={styles.dropdown}
              required
            >
              <option value="">Select Main Skill </option>
              {skillSetOptions.map((skillSetOptions, index) => (
                <option key={index} value={skillSetOptions.skillname}>
                  {skillSetOptions.skillname}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="subskillSet">
            <b>Sub Skill Set<span className={styles.asterisk}>*</span>:</b>
            </label>
            <select
              name="subskillSet"
              id="subskillSet"
              value={formData.subskillset}
              onChange={handleSubSkillSetChange}
              className={styles.dropdown}
              required
            >
              <option value="">Select Sub Skill </option>
              {subSkillSetOptions.map((subskillSetOptions, index) => (
                <option key={index} value={subskillSetOptions.subsetname}>
                  {subskillSetOptions.subsetname}
                </option>
              ))}
            </select>
          </div>

          {/* <div className={styles.sub_container}>
            <label htmlFor="subSkillSet">
              Sub Skill Set<span className={styles.asterisk}>*</span>:
            </label>
            <select
              name="subSkillSet"
              id="subSkillSet"
              value={formData.subskillset}
              onChange={handleInputChange}
              className={styles.dropdown}
              required
            >
              <option value="">Select Sub Skill </option>
              {skillSetOptions.map((subSkill, index) => (
                <option key={index} value={subSkill.subsetname} >
                  {subSkill.skillname}
                </option>
              ))}
            </select>
          </div> */}

          <div className={styles.sub_container}>
            <label htmlFor="currentCompany">
            <b>Current Company<span className={styles.asterisk}>*</span>:</b>
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
            <b>Current CTC (LPA)<span className={styles.asterisk}>*</span>:</b>
            </label>
            <input
              type="number"
              name="currentCTC"
              id="currentCTC"
              value={formData.currentCTCDisplay}
              onChange={(e) => {
                const ctc = e.target.value;
                // Update the display value with the user's input
                setFormData((prevData) => ({
                  ...prevData,
                  currentCTCDisplay: ctc,
                }));
              }}
              onBlur={() => {
                // When the user leaves the input field, round the value and store it
                const ctcRounded = Math.round(
                  parseFloat(formData.currentCTCDisplay)
                );
                setFormData((prevData) => ({
                  ...prevData,
                  currentCTC: formData.currentCTCDisplay * 100000, // Convert to lacs as well
                  currentCTCDisplay: ctcRounded, // Update the display value to the rounded value
                }));
              }}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="expectedCTC">
            <b>Expected CTC<span className={styles.asterisk}>*</span>:</b>
            </label>
            <input
              type="number"
              name="expectedCTC"
              id="expectedCTC"
              value={formData.expectedCTCDisplay}
              onChange={(e) => {
                const expected = e.target.value;
                // Update the display value with the user's input
                setFormData((prevData) => ({
                  ...prevData,
                  expectedCTCDisplay: expected,
                }));
              }}
              onBlur={() => {
                // When the user leaves the input field, round the value and store it
                const expectedRounded = Math.round(
                  parseFloat(formData.expectedCTCDisplay)
                );
                setFormData((prevData) => ({
                  ...prevData,
                  expectedCTC: formData.expectedCTCDisplay * 100000, // Convert to lacs as well
                  expectedCTCDisplay: expectedRounded, // Update the display value to the rounded value
                }));
              }}
              required
            />
          </div>
          {/* <div className={styles.sub_container}>
            <label htmlFor="interviewDate">
              Interview Date<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="date"
              name="interviewDate"
              id="interviewDate"
              value={formData.interviewDate}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="joiningDate">
              Joining Date<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="date"
              name="joiningDate"
              id="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="statusUpadteDate">
              Status Update Day<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="date"
              name="statusUpadteDate"s
              id="statusUpadteDate"
              value={formData.statusUpdatedDate}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="statusComments">Status Comments:</label>
            <textarea
              name="statusComments"
              id="statusComments"
              value={formData.statusComments}
              onChange={handleInputChange}
            ></textarea>
          </div> */}
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">
            <b> Notice Period (Days)<span className={styles.asterisk}>*</span>:</b>
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
            <b>Serving Notice Period<span className={styles.asterisk}>*</span>:</b>
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
                <b>Yes</b>
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
               <b>No</b> 
              </label>
            </div>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="certified">
            <b>Certified?<span className={styles.asterisk}>*</span>:</b>
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
                <b>Yes</b>
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
                <b>No</b>
              </label>
            </div>
          </div>
          {formData.servingNoticePeriod === true && ( // Check if 'Yes' is selected
            <div className={styles.sub_container}>
              <label htmlFor="lastWorkingDay">
              <b>Last Working Day<span className={styles.asterisk}>*</span>:</b>
              </label>
              <input
                type="date"
                name="lastWorkingDay"
                id="lastWorkingDay"
                value={formData.lastWorkingDay}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className={styles.sub_container}>
            <label htmlFor="comments"><b>Comments:</b></label>
            <textarea
              name="comments"
              id="comments"
              value={formData.comments}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="resume">
            <b> Resume<span className={styles.asterisk}>*</span>:</b>
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
      <div className={styles.footerContainer}>
          <a className={styles.footer} href={"https://x.com/FecundSoftware"}><p><FaTwitterSquare /></p></a>&nbsp;
          <a className={styles.footer} href={"https://www.facebook.com/FECUNDServices"}><p><FaFacebook /></p></a>&nbsp;
          <a className={styles.footer} href={"https://www.linkedin.com/company/fecund-software-services-pvt-ltd-/mycompany/"}><p><FaLinkedin /></p></a>&nbsp;
          <a className={styles.footer} href={"https://www.instagram.com/fecundservices/"}><p><FaInstagramSquare /></p></a>&nbsp;
          <a className={styles.fecundWebsite} href={"https://www.fecundservices.com/"}>www.fecundservices.com</a>   
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
