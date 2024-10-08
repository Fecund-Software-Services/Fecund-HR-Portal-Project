/*
Project: Hiring Portal Project
Author:  Vishal
Date: 04/05/2024
Sprint: Sprint 4
User Story:Edit Candidate Details - Resume Handling

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |  Phase |  Description 
-------------------------------------------------------------------------------------------------------
5/9/2024    |   Vishal                  |   4        |   1    | Edit Candidate Details - Resume Handling
09/05/2024  |   Harshini C              |   4        |   1    | BG update to all screens
5/9/2024    |   Vishal                  |   4        |   1    | Resume handling - View/Edit candidate - Resume Handling - Back End
10/05/2024  |   Vishal                  |   4        |   1    | CSS and alignment based on BG image
10/05/2024  |   Harshini C              |   4        |   1    | Log Out button
10/05/2024  |   Harshini C              |   4        |   1    | CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |   1    | Front End Coding Navbar 
14/8/2024   |   Vishal Garg             |   3        |   2    | Admin role 
26/8/2024   |   Vishal Garg             |   3        |   2    | Add New Candidate - Total Relevant experience, Interview Date and Joining Date
03/09/2024  |   Harshini C              |   5        |   2    | UI fixes
19/09/2024  |   Harshini C              |   6        |   2    | QA Defect - Multiple UI Issues
-------------------------------------------------------------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import styles from "./EditCandidateDetails.module.css";
import popupBackground from "../assets/backgroundImages.png";

const EditCandiadteDetails = () => {
  const { id } = useParams(); // Get the Candidate ID from URL parameters
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    skillSet: "",
    subskillset: "",
    itExperience: "",
    totalRelevantExperience: "",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    currentCTCDisplay:"",
    expectedCTCDisplay:"",
    interviewDate: "",
    joiningDate: "",
    // statusUpdatedDate:"",F
    statusComments: "",
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
  const [statusOptions, setStatusOptions] = useState([]);
  const [skillSetOptions, setSkillSetOptions] = useState([]);
  const [subSkillSetOptions, setSubSkillSetOptions] = useState([]);
  const { userData } = useAuth();

  const nav = useNavigate();
  const navigateToHome = useNavigate();

  // Function to fetch Candidate details based on the ID (you can implement this logic)
  const fetchCandidateDetails = async (CandidateId) => {
    try {
      const response = await fetch(
        `/api/candidate/view-candidate/${CandidateId}`
      );
      const candidateData = await response.json();
      
      setEditedData({ ...candidateData });
      setEditedData((prevData) => ({ ...prevData, currentCTCDisplay:candidateData.currentCTC }))
      setEditedData((prevData) => ({ ...prevData, expectedCTCDisplay:candidateData.expectedCTC }))
    } catch (error) {
      console.error("Error fetching Candidate details:", error);
    }
  };

  useEffect(() => {
    console.log(editedData);
  }, [editedData]);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/status/get-status");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched main skills:", data);
      setStatusOptions(data);
      console.log(statusOptions);
    } catch (error) {
      console.error("Error fetching main skills:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

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
    console.log(mainSkillId);
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
    if (editedData.skillSet) {
      const desiredSkillName = editedData.skillSet;
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
  }, [editedData.skillSet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMobileNumberChange = (e) => {
    const { name } = e.target;
    const newMobileNumber = e.target.value.replace(/[^0-9]/g, "");
    setEditedData((prevData) => ({ ...prevData, [name]: newMobileNumber }));
  };

  const handleCancel = (e) => nav("/home");

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: !prevData.certified }));
  };

  const handleServingNoticePeriodChange = (e) => {
    const { name } = e.target;
    setEditedData((prevData) => ({
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
        setEditedData((prevData) => ({
          ...prevData,
          resume: e.target.files[0],
        }));
        console.log("in resume field ");
        setErrorMessage("");
      }
    }
  };

  // Fetch Candidate details when the component mounts
  useEffect(() => {
    fetchCandidateDetails(id);
  }, [id]);

  const handleKeyPress = (e) => {
    const key = e.key;
    const regex = /^[A-Za-z]+$/; // Allows only alphabets

    if (!regex.test(key)) {
      e.preventDefault(); // Prevent invalid character from being entered
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editedData);

    const formDataToSend = new FormData(); // Create a new FormData object

    // Append all form data fields to the FormData object
    formDataToSend.append("firstName", editedData.firstName);
    formDataToSend.append("lastName", editedData.lastName);
    formDataToSend.append("emailAddress", editedData.emailAddress);
    formDataToSend.append("mobileNumber", editedData.mobileNumber);
    formDataToSend.append("skillSet", editedData.skillSet);
    formDataToSend.append("subskillset", editedData.subskillset);
    formDataToSend.append("itExperience", editedData.itExperience);
    formDataToSend.append(
      "totalRelevantExperience",
      editedData.totalRelevantExperience
    );
    formDataToSend.append("currentCompany", editedData.currentCompany);
    formDataToSend.append("currentCTC", editedData.currentCTC);
    formDataToSend.append("expectedCTC", editedData.expectedCTC);
    formDataToSend.append("interviewDate", editedData.interviewDate);
    formDataToSend.append("joiningDate", editedData.joiningDate);
    
    formDataToSend.append("statusComments", editedData.statusComments);
    formDataToSend.append("noticePeriod", editedData.noticePeriod);
    formDataToSend.append(
      "servingNoticePeriod",
      editedData.servingNoticePeriod
    );
    formDataToSend.append("lastWorkingDay", editedData.lastWorkingDay);
    formDataToSend.append("status", editedData.status);
    formDataToSend.append("certified", editedData.certified);
    formDataToSend.append("comments", editedData.comments);

    // Append the resume file to the FormData object
    formDataToSend.append("resume", editedData.resume);

    const addCandidate = async (formDataToSend) => {
      console.log(formDataToSend);
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/candidate/edit-candidate/${id}`, {
          method: "PUT",
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
        <p className={styles.rastanty_Cortez}>Edit New Candidate</p>
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
              value={editedData.firstName}
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
              value={editedData.lastName}
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
              value={editedData.emailAddress}
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
              value={editedData.mobileNumber}
              onChange={handleMobileNumberChange}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="itExperience">
              <b>Total IT Experience<span className={styles.asterisk}>*</span>{" "}
              (Yrs):</b>
            </label>
            <input
              type="text"
              name="itExperience"
              id="totalITExperience"
              value={editedData.itExperience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="totalRelevantExperience">
              <b>Total Relevant Experience
              <span className={styles.asterisk}>*</span> (Yrs):</b>
            </label>
            <input
              type="text"
              name="totalRelevantExperience"
              id="totalRelevantExperience"
              value={editedData.totalRelevantExperience}
              onChange={(e) => {
                const experience = e.target.value;
                setEditedData((prevData) => ({
                  ...prevData,
                  totalRelevantExperience: experience,
                }));
              }}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="skillSet">
             <b> Skill Set<span className={styles.asterisk}>*</span>:</b>
            </label>
            <select
              name="skillSet"
              id="skillSet"
              value={editedData.skillSet}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Skills </option>
              {skillSetOptions.map((skillSetOptions, index) => (
                <option key={index} value={skillSetOptions.skillname}>
                  {skillSetOptions.skillname}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="subskillset">
              <b>Sub Skill Set<span className={styles.asterisk}>*</span>:</b>
            </label>
            <select
              name="subskillset"
              id="subskillset"
              value={editedData.subskillset}
              onChange={handleInputChange}
              className={styles.dropdown}
              required
            >
              <option value="">Select Skills </option>
              {subSkillSetOptions.map((subskillSetOptions, index) => (
                <option key={index} value={subskillSetOptions.subsetname}>
                  {subskillSetOptions.subsetname}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="currentCompany">
              <b>Current Company<span className={styles.asterisk}>*</span>:</b>
            </label>
            <input
              type="text"
              name="currentCompany"
              id="currentCompany"
              value={editedData.currentCompany}
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
              value={editedData.currentCTCDisplay}
              onChange={(e) => {
                const ctc = e.target.value;
                // Update the display value with the user's input
                setEditedData((prevData) => ({
                  ...prevData,
                  currentCTCDisplay: ctc,
                }));
              }}
              onBlur={() => {
                // When the user leaves the input field, round the value and store it
                const ctcRounded = Math.round(
                  parseFloat(editedData.currentCTCDisplay)
                );
                setEditedData((prevData) => ({
                  ...prevData,
                  currentCTC: editedData.currentCTCDisplay * 100000, // Convert to lacs as well
                  currentCTCDisplay: ctcRounded, // Update the display value to the rounded value
                }));
              }}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">
              <b>Notice Period<span className={styles.asterisk}>*</span> (Days):</b>
            </label>
            <input
              type="number"
              name="noticePeriod"
              id="noticePeriod"
              value={editedData.noticePeriod}
              onChange={handleInputChange}
              required
            />
          </div>

          {editedData.status === "Scheduled R1" ? (
            <div className={styles.sub_container}>
              <label htmlFor="interviewDate">
                <b>Interview Date<span className={styles.asterisk}>*</span>:</b>
              </label>
              <input
                type="date"
                name="interviewDate"
                id="interviewDate"
                value={editedData.interviewDate}
                onChange={handleInputChange}
                required
              />
            </div>
          ) : (
            ""
          )}

          {editedData.status === "Scheduled R2" ? (
            <div className={styles.sub_container}>
              <label htmlFor="interviewDate">
                <b>Interview Date<span className={styles.asterisk}>*</span>:</b>
              </label>
              <input
                type="date"
                name="interviewDate"
                id="interviewDate"
                value={editedData.interviewDate}
                onChange={handleInputChange}
                required
              />
            </div>
          ) : (
            ""
          )}

          {userData.role === "admin" ? (
            <div className={styles.sub_container}>
              <label htmlFor="expectedCTC">
                <b>Expected CTC<span className={styles.asterisk}>*</span>:</b>
              </label>
              <input
                type="number"
                name="expectedCTC"
                id="expectedCTC"
                value={editedData.expectedCTCDisplay}
                onChange={(e) => {
                  const expected = e.target.value;
                  // Update the display value with the user's input
                  setEditedData((prevData) => ({
                    ...prevData,
                    expectedCTCDisplay: expected,
                  }));
                }}
                onBlur={() => {
                  // When the user leaves the input field, round the value and store it
                  const expectedRounded = Math.round(
                    parseFloat(editedData.expectedCTCDisplay)
                  );
                  setEditedData((prevData) => ({
                    ...prevData,
                    expectedCTC: editedData.expectedCTCDisplay * 100000, // Convert to lacs as well
                    expectedCTCDisplay: expectedRounded, // Update the display value to the rounded value
                  }));
                }}
                required
              />
            </div>
          ) : (
            ""
          )}

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
                  checked={editedData.servingNoticePeriod === true} // Check if the value is 'Yes'
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
                  checked={editedData.servingNoticePeriod === false} // Check if the value is 'No'
                />
                <b>No</b>
              </label>
            </div>
          </div>

          <div className={styles.sub_container}>
            <label><b>Status</b><span className={styles.asterisk}>*</span>:</label>

            <select
              name="status"
              id="status"
              value={editedData.status}
              onChange={handleInputChange}
              onFocus={(e)=>{e.target.size = 5}}
              required
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status.name}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="statusComments"><b>Status Comments</b> <span className={styles.asterisk}>*</span>:</label>
            <textarea
              name="statusComments"
              id="statusComments"
              value={editedData.statusComments}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* <div className={styles.sub_container}>
            <label htmlFor="StatusUpadteDate">
              Status Update Day<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="date"
              name="StatusUpadteDate"
              id="StatusUpdateDate"
              value={editedData.statusUpdatedDate}
              onChange={handleInputChange}
            />
          </div> */}
          
          
          <div className={styles.sub_container}>
            <label htmlFor="certified">
              <b>Certified?</b><span className={styles.asterisk}>*</span>
            </label>
            <div className={styles.checkbox_container}>
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  // id="certified"
                  value="Yes"
                  onChange={handleCheckboxChange}
                  checked={editedData.certified === true} // Check if the value is 'Yes'
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
                  checked={editedData.certified === false} // Check if the value is 'No'
                />
               <b>No</b> 
              </label>
            </div>
          </div>
          {editedData.servingNoticePeriod === true && ( // Check if 'Yes' is selected
            <div className={styles.sub_container}>
              <label htmlFor="lastWorkingDay">
                <b>Last Working Day<span className={styles.asterisk}>*</span>:</b>
              </label>
              <input
                type="date"
                name="lastWorkingDay"
                id="lastWorkingDay"
                value={editedData.lastWorkingDay}
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
              value={editedData.comments}
              onChange={handleInputChange}
            ></textarea>
          </div>
            
          {editedData.status === "Offer Issued" ? (
            <div className={styles.sub_container}>
              <label htmlFor="joiningDate">
               <b>Joining Date<span className={styles.asterisk}>*</span>:</b> 
              </label>
              <input
                type="date"
                name="joiningDate"
                id="joiningDate"
                value={editedData.joiningDate}
                onChange={handleInputChange}
                required
              />
            </div>
          ) : (
            ""
          )}

          <div className={styles.sub_container}>
            <label htmlFor="resume"><b>Resume:</b></label>
            <input
              type="file"
              name="resume"
              id="resume"
              onChange={handleResumeChange}
              //   required
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
            {isLoading ? "Updating..." : "Update"}
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
              Candidate Details updated successfully!
              <br />
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

export default EditCandiadteDetails;
