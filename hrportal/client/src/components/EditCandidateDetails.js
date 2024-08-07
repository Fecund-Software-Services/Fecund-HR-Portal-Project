/*
Project: Hiring Portal Project
Author:  Vishal
Date: 04/05/2024
Sprint: Sprint 4
User Story:Edit Candidate Details - Resume Handling

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
5/9/2024    |   Vishal                  |   4        |   Edit Candidate Details - Resume Handling
09/05/2024  |   Harshini C              |   4        |   BG update to all screens
5/9/2024    |   Vishal                  |   4        |   Resume handling - View/Edit candidate - Resume Handling - Back End
10/05/2024  |   Vishal                  |   4        |   CSS and alignment based on BG image
10/05/2024  |   Harshini C              |   4        |   Log Out button
10/05/2024  |   Harshini C              |   4        |   CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |    Front End Coding Navbar 
-------------------------------------------------------------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./EditCandidateDetails.module.css";
import popupBackground from "../assets/PopupBackgroundImage.png";

// import { useAddCandidate } from "../hooks/useAddCandidate.js";

const EditCandiadteDetails = () => {
  const { id } = useParams(); // Get the Candidate ID from URL parameters
  const [editedData, setEditedData] = useState({
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
  const navigateToHome = useNavigate()

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

  const statusOptions = [
    "Submitted",
    "Cleared 1st Round",
    "Cleared 2nd Round",
    "Offer Issued",
    "On-Hold",
    "Rejected",
    "Candidate not Interested",
  ];

  // Function to fetch Candidate details based on the ID (you can implement this logic)
  const fetchCandidateDetails = async (CandidateId) => {
    try {
      const response = await fetch(
        `/api/candidate/view-candidate/${CandidateId}`
      );
      const candidateData = await response.json();
      // setCandidateDetails(candidateData);
      setEditedData({ ...candidateData });
    } catch (error) {
      console.error("Error fetching Candidate details:", error);
    }
  };

  //   const fetchCandidateResume = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/candidate/view-resume/${candidateDetails.fileId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(
  //           `Error fetching Candidate details: ${response.statusText}`
  //         );
  //       }
  //       // If the response is a PDF, create a blob and download it
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       // a.download = 'candidate_details.pdf';
  //       const fileName = candidateDetails.resume;
  //       a.download = `${fileName.slice(0, fileName.lastIndexOf("."))}.pdf`;
  //       document.body.appendChild(a);
  //       a.click();
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //     }
  //   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMobileNumberChange = (e) => {
    const { name } = e.target;
    const newMobileNumber = e.target.value.replace(/[^0-9]/g, '');
    setEditedData((prevData) => ({ ...prevData, [name]: newMobileNumber }));
  };

  const handleCancel = (e) => nav("/home");

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    // let newValue = checked;
    setEditedData((prevData) => ({ ...prevData, [name]: !prevData.certified }));
  };

  const handleServingNoticePeriodChange = (e) => {
    const { name} = e.target;
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
    formDataToSend.append("itExperience", editedData.itExperience);
    formDataToSend.append(
      "totalRelevantExperience",
      editedData.totalRelevantExperience
    );
    formDataToSend.append("currentCompany", editedData.currentCompany);
    formDataToSend.append("currentCTC", editedData.currentCTC);
    formDataToSend.append("expectedCTC", editedData.expectedCTC);
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
    navigateToPopup("/home");
  };

  const handleClick = (e) => {
    // Prevent default navigation to home page
    e.preventDefault();

    // Redirect to login page (replace with your login page URL)
    navigateToHome('/home');
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
              First Name<span className={styles.asterisk}>*</span>:
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
              Last Name<span className={styles.asterisk}>*</span>:
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
              Email ID<span className={styles.asterisk}>*</span>:
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
              Mobile Number<span className={styles.asterisk}>*</span>:
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
            <label htmlFor="totalRelevantExperience">
              Total Relevant Experience
              <span className={styles.asterisk}>*</span> (Yrs):
            </label>
            <input
              type="number"
              name="totalRelevantExperience"
              id="totalRelevantExperience"
              value={editedData.totalRelevantExperience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.sub_container}>
            <label htmlFor="itExperience">
              Total IT Experience<span className={styles.asterisk}>*</span>{" "}
              (Yrs):
            </label>
            <input
              type="number"
              name="itExperience"
              id="totalITExperience"
              value={editedData.itExperience}
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
              value={editedData.skillSet}
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
            <label htmlFor="currentCompany">
              Current Company<span className={styles.asterisk}>*</span>:
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
              Current CTC (LPA)<span className={styles.asterisk}>*</span>:
            </label>
            <input
              type="number"
              name="currentCTC"
              id="currentCTC"
              value={editedData.currentCTC}
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
              value={editedData.expectedCTC}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">
              Notice Period<span className={styles.asterisk}>*</span> (Days):
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
          <div className={styles.sub_container}>
            <label>Status:</label>

            <select
              name="status"
              id="status"
              value={editedData.status}
              onChange={handleInputChange}
              required
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
                  checked={editedData.servingNoticePeriod === true} // Check if the value is 'Yes'
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
                  checked={editedData.servingNoticePeriod === false} // Check if the value is 'No'
                />
                No
              </label>
            </div>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="certified">
              Certified?<span className={styles.asterisk}>*</span>
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
                Yes
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
                No
              </label>
            </div>
          </div>
          {editedData.servingNoticePeriod === true && ( // Check if 'Yes' is selected
            <div className={styles.sub_container}>
              <label htmlFor="lastWorkingDay">
                Last Working Day<span className={styles.asterisk}>*</span>:
              </label>
              <input
                type="date"
                name="lastWorkingDay"
                id="lastWorkingDay"
                value={editedData.lastWorkingDay}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className={styles.sub_container}>
            <label htmlFor="comments">Comments:</label>
            <textarea
              name="comments"
              id="comments"
              value={editedData.comments}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="resume">
              Resume:
            </label>
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
