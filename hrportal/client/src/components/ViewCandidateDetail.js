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
 18/07/2024 |   Vishal Garg             |   2        |    Front End Coding Navbar 
 14/8/2024  |   Vishal Garg             |Ph2  Sp 3   |   Admin role 
 26/8/2024  |   Vishal Garg             |ph2  sp 4   |   Add New Candidate - Total Relevant experience, Interview Date and Joining Date
 28/8/2024  |  HS                       | phase 2 sprint 4 | Status History Tracker
-------------------------------------------------------------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import useHistory and useParams hooks
import { useAuth } from "../context/AuthContext.js";
//import { FaDownload } from "react-icons/fa";
import styles from "./ViewCandidateDetail.module.css";

function ViewCandidateDetail() {
  // debugger;
  const { id } = useParams(); // Get the Candidate ID from URL parameters
  console.log(id);
  // State variables
  const [candidateDetails, setCandidateDetails] = useState({}); // Candidate details
  const [errorMessage, setErrorMessage] = useState("");
  const { userData } = useAuth();
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

  console.log(candidateDetails)

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
      console.log(fileName);
      // a.download = `${fileName.slice(0, fileName.lastIndexOf("."))}.pdf`;
      a.download = `${fileName}`;
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
              {candidateDetails.itExperience}
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
            <label>Sub Skill:</label>
            <p className={styles.text}>{candidateDetails.subskillset}</p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="currentCTC">Current CTC (LPA):</label>
            <p className={styles.text}>{candidateDetails.currentCTC}</p>
          </div>
          
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">Notice Period:</label>
            <p className={styles.text}>{candidateDetails.noticePeriod}</p>
          </div>
          {userData.role === "admin" ? (
            <div className={styles.sub_container}>
              <label htmlFor="expectedCTC">Expected CTC:</label>
              <p className={styles.text}>{candidateDetails.expectedCTC}</p>
            </div>
          ) : (
            ""
          )}
          <div className={styles.sub_container}>
            <label>Status:</label>
            <p className={styles.text}>{candidateDetails.status}</p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">Status Comments:</label>
            <p className={styles.text}>
              {candidateDetails.statusComments
                ? candidateDetails.statusComments
                : "No comments entered"}
            </p>
          </div>
          {candidateDetails.status === "Offer Issued" ? (
            <div className={styles.sub_container}>
              <label>Joining Date:</label>
              <p className={styles.text}>{candidateDetails.joiningDate}</p>
            </div>
          ) : (
            ""
          )}
           {
          candidateDetails.status === "Scheduled R1" ? (
            <div className={styles.sub_container}>
              <label>Interview Date:</label>
              <p className={styles.text}>{candidateDetails.interviewDate}</p>
            </div>
          ) : (
            ""
          )}
          {
          candidateDetails.status === "Scheduled R2" ? (
            <div className={styles.sub_container}>
              <label>Interview Date:</label>
              <p className={styles.text}>{candidateDetails.interviewDate}</p>
            </div>
          ) : (
            ""
          )}

          
          <div className={styles.sub_container}>
            <label htmlFor="certified">Certified?:</label>
            <p className={styles.text}>
              {candidateDetails.servingNoticePeriod ? "Yes" : "No"}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="servingNoticedPeriod">Serving Notice Period:</label>
            <p className={styles.text}>
              {candidateDetails.certified ? "Yes" : "No"}
            </p>
          </div>
          {candidateDetails.servingNoticePeriod === true && ( // Check if 'Yes' is selected
            <div className={styles.sub_container}>
              <label htmlFor="lastWorkingDay">Last Working Day</label>
              <p className={styles.text}>{candidateDetails.lastWorkingDay}</p>
            </div>
          )}
          <div className={styles.sub_container}>
            <label htmlFor="noticePeriod">Comments:</label>
            <p className={styles.text}>
              {candidateDetails.comments
                ? candidateDetails.comments
                : "No comments entered"}
            </p>
          </div>
          <div className={styles.sub_container}>
            <label htmlFor="resume">Resume:</label>
            <div onClick={fetchCandidateResume}>
              {candidateDetails.resume}&nbsp;&nbsp;
            </div>
          </div>

          <div className={styles.sub_container}></div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
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
