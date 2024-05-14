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
 8/05/2024  |   Vishal                  |    4       |  View candidate details
 10/05/2024 |   Harshini C              |    4       |  Log Out button
 14/05/2024 |   Harshini C              |    4       |  CSS and alignment based on BG image
-------------------------------------------------------------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import useHistory and useParams hooks
import LogoutButton from "./LogoutButton";
import { FaDownload } from "react-icons/fa";
import styles from "./ViewCandidateDetail.module.css";

function ViewCandidateDetail() {
  // debugger;
  const { id } = useParams(); // Get the Candidate ID from URL parameters
  console.log(id);
  // State variables
  const [candidateDetails, setCandidateDetails] = useState({}); // Candidate details
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  // Function to fetch Candidate details based on the ID (you can implement this logic)
  const fetchCandidateDetails = async (CandidateId) => {
    try {
      const response = await fetch(
        `/api/candidate/view-candidate/${CandidateId}`
      );
      const candidateData = await response.json();
      if (!response.ok) {
        throw new Error(candidateData.message); // Re-throw with more context
      }
      setCandidateDetails(candidateData);
      // setEditedData({...candidateData})
    } catch (error) {
      setErrorMessage("Error fetching Candidate details:", error.message);
    }
  };

  const fetchCandidateResume = async () => {
    try {
      const response = await fetch(
        `/api/candidate/view-resume/${candidateDetails.fileId}`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching Candidate details: ${response.statusText}`
        );
      }
      // If the response is a PDF, create a blob and download it
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // a.download = 'candidate_details.pdf';
      const fileName = candidateDetails.resume;
      a.download = `${fileName.slice(0, fileName.lastIndexOf("."))}.pdf`;
      document.body.appendChild(a);
      a.click();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Function to handle edit mode toggle
  const toggleEditMode = () => {
    nav(`/home/search-candidate/candiadte/editCandidateDetails/${id}`);
  };

  // Fetch Candidate details when the component mounts
  useEffect(() => {
    fetchCandidateDetails(id);
  }, [id]);

  return (
    <div className={styles.search_container}>
      <div><LogoutButton/></div>
      <div className={styles.title_container}>
        <p className={styles.rastanty_Cortez}>View Candidate Details</p>
      </div>
      <div className={styles.addcandidateform_form}>
        <div className={styles.form_left}>
          <div className={styles.sub_container}>
            <label>First Name:</label>
            <p className={styles.text}>{candidateDetails.firstName}</p>
          </div>
          <div className={styles.sub_container}>
            <label>Last Name:</label>
            <p className={styles.text}>{candidateDetails.lastName}</p>
          </div>
          <div className={styles.sub_container}>
            <label>Email ID:</label>
            <p className={styles.text}>{candidateDetails.emailAddress}</p>
          </div>
          <div className={styles.sub_container}>
            <label>Mobile Number:</label>
            <p className={styles.text}>{candidateDetails.mobileNumber}</p>
          </div>
          <div className={styles.sub_container}>
            <label>Total IT Experience:</label>
            <p className={styles.text}>
              {candidateDetails.totalRelevantExperience}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label>Total Relevant Experience:</label>
            <p className={styles.text}>
              {candidateDetails.totalRelevantExperience}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label>Skill Set:</label>
            <p className={styles.text}>{candidateDetails.skillSet}</p>
          </div>
          <div className={styles.sub_container}>
            <label>Current Company:</label>
            <p className={styles.text}>{candidateDetails.currentCompany}</p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="currentCTC">Current CTC (LPA)</label>
            <p className={styles.text}>{candidateDetails.currentCTC}</p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="expectedCTC">Expected CTC</label>
            <p className={styles.text}>{candidateDetails.expectedCTC}</p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">Notice Period</label>
            <p className={styles.text}>{candidateDetails.noticePeriod}</p>
          </div>
          <div className={styles.sub_container}>
            <label>Status:</label>
            <p className={styles.text}>{candidateDetails.status}</p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="certified">Certified?</label>
            <p className={styles.text}>
              {candidateDetails.servingNoticePeriod ? "Yes" : "No"}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="servingNoticedPeriod">Serving Notice Period</label>
            <p className={styles.text}>
              {candidateDetails.certified ? "Yes" : "No"}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="lastWorkingDay">Last Working Day</label>
            <p className={styles.text}>
              {candidateDetails.lastWorkingDay
                ? candidateDetails.lastWorkingDay
                : " "}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">Comments:</label>
            <p className={styles.text}>
              {candidateDetails.comments
                ? candidateDetails.comments
                : "No comments entered"}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="resume">Resume</label>
            <div onClick={fetchCandidateResume}>{candidateDetails.resume}&nbsp;&nbsp;<FaDownload /></div>
          </div>
          <div className={styles.sub_container}></div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <div className={styles.button_container}>
            <button className={styles.cancel_button} onClick={toggleEditMode}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCandidateDetail;
