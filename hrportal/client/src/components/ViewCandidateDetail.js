import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import useHistory and useParams hooks

import styles from "./ViewCandidateDetail.module.css";

function ViewCandidateDetail() {
  const { id } = useParams(); // Get the Candidate ID from URL parameters
console.log(id)
  // State variables
  const [candidateDetails, setCandidateDetails] = useState({}); // Candidate details
  const [editMode, setEditMode] = useState(false); // Edit mode
  const [errorMessage, setErrorMessage] = useState("");
  const [showLastWorkingDay, setShowLastWorkingDay] = useState(false);
  const nav = useNavigate();

  const skillSetOptions = ['Guidewire BA (PC)','Guidewire BA (BC)','Guidewire BA (CC)','Guidewire QA (PC)','Guidewire QA (BC)','Guidewire QA (CC)','Guidewire DEV (PC)','Guidewire DEV (BC)','Guidewire DEV (CC)','Guidewire Lead (CC)',
  'Guidewire Lead (PC)','Guidewire Lead (BC)','Buisness Analyst','Technical Specialist','Guidewire Integration Developer','Guidewire Architect','Guidewire QA','Guidewire Portal','Guidewire Datahub','Guidewire Infocentre',
  'Recruitment Executive','Business Development Executive','Guidewire Backend Developer','Duckcreek Developer','Coldfusion Developer','Oneshield Designer','Digital Marketing Executive','Mulesoft Developer','Scrum Master',
  'Project Leader','Oneshield BA','Oneshield QA'];

  const statusOptions = ['Submitted', 'Cleared 1st Round','Cleared 2nd Round','Offer Issued','On-Hold','Rejected','Candidate not Interested']

  // Function to fetch Candidate details based on the ID (you can implement this logic)
  const fetchCandidateDetails = async (CandidateId) => {
      try {
        const response = await fetch(`/api/candidate/view-candidate/${CandidateId}`);
        const candidateData = await response.json();
        setCandidateDetails(candidateData);
        console.log(candidateData)
      } catch (error) {
        console.error("Error fetching Candidate details:", error);
      } 
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
        setCandidateDetails((prevData) => ({
          ...prevData,
          resume: e.target.files[0],
        }));
        setErrorMessage("");
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    let newValue = checked ;
    setCandidateDetails((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleServingNoticePeriodChange = (e) => {
    const { name, checked, value } = e.target;
    let newValue = checked ;
    setCandidateDetails((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    setShowLastWorkingDay(value);
  };

  // Function to handle edit mode toggle
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle cancel action
  const handleCancel = () => {
    // Navigate back to the SearchComponent
    nav("/home/search-candidate");
  };

  // Function to handle submit action (optional)
  const handleSubmit = () => {
    // Implement submit logic to update Candidate details (if needed)
    // For example, send a request to update Candidate details
    // After successful update, you can navigate back to the SearchComponent
    console.log("hello");
  };

  // Fetch Candidate details when the component mounts
  useEffect(() => {
    setTimeout(() =>fetchCandidateDetails(id) , 2000)
    ;
  }, [id]);

  return (
    <div className={styles.search_container}>
      <div className={styles.title_container}>
        <p className={styles.form_title}>View Candidate Details</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.addcandidateform_form}>
        <div className={styles.form_left}>
        <div className={styles.sub_container}>
          <label>First Name:</label>
          {editMode ? (
            <input
              type="text"
              value={candidateDetails.firstName || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  firstName: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.firstName}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label>Last Name:</label>
          {editMode ? (
            <input
              type="text"
              value={candidateDetails.lastName || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  lastName: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.lastName}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label>Email ID:</label>
          {editMode ? (
            <input
              type="email"
              value={candidateDetails.emailAddress || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  emailAddress: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.emailAddress}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label>Mobile Number:</label>
          {editMode ? (
            <input
              type="tel"
              value={candidateDetails.mobileNumber || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  MobileNumber: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.mobileNumber}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label>Total Relevant Experience:</label>
          {editMode ? (
            <input
              type="number"
              value={candidateDetails.totalRelevantExperience || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  totalRelevantExperience: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.totalRelevantExperience}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label>Skill Set:</label>
          {editMode ? (
            <select
              name="skillSet"
              id="skillSet"
              value={candidateDetails.skillSet || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  skillSet: e.target.value,
                })
              }
              required
            >
              <option value="">Select Skills </option>
              {skillSetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <p className={styles.text}>{candidateDetails.skillSet}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label>Current Company:</label>
          {editMode ? (
            <input
              type="text"
              value={candidateDetails.currentCompany || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  currentCompany: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.currentCompany}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="currentCTC">Current CTC (LPA)</label>
          {editMode ? (
            <input
              type="text"
              name="currentCTC"
              value={candidateDetails.currentCTC || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  currentCTC: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.currentCTC}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="expectedCTC">Expected CTC</label>
          {editMode ? (
            <input
              type="text"
              name="expectedCTC"
              value={candidateDetails.expectedCTC || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  expectedCTC: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.expectedCTC}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="noticePeriod">Notice Period</label>
          {editMode ? (
            <input
              type="text"
              name="noticePeriod"
              value={candidateDetails.noticePeriod || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  noticePeriod: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.noticePeriod}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label>Status:</label>
          {editMode ? (
            <select
              name="status"
              id="status"
              value={candidateDetails.status}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  status: e.target.value,
                })
              }
              required
            >
              <option value="">{candidateDetails.status} </option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <p>{candidateDetails.status}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="certified">Certified?</label>
          {editMode ? (
            <div
            className={styles.checkbox_container}
            >
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  value="Yes"
                  onChange={handleCheckboxChange}
                  checked={candidateDetails.certified === true} // Check if the value is 'Yes'
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  value="No"
                  onChange={handleCheckboxChange}
                  checked={candidateDetails.certified === false} // Check if the value is 'No'
                />
                No
              </label>
            </div>
          ) : (
            <p className={styles.text}>{candidateDetails.servingNoticePeriod ? 'Yes' : 'No'
            }</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="servingNoticedPeriod">Serving Notice Period</label>
          {editMode ? (
            <div
            className={styles.checkbox_container}
            >
              <label>
                <input
                  type="checkbox"
                  name="servingNoticePeriod"
                  value="Yes"
                  onChange={handleServingNoticePeriodChange}
                  checked={candidateDetails.servingNoticePeriod === true} // Check if the value is 'Yes'
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="servingNoticePeriod"
                  value="No"
                  onChange={handleServingNoticePeriodChange}
                  checked={candidateDetails.servingNoticePeriod === false} // Check if the value is 'No'
                />
                No
              </label>
            </div>
          ) : (
            <p className={styles.text}>{candidateDetails.certified ? 'Yes' : 'No'}</p>
          )}
        </div>
        <div className={styles.sub_container}
          style={{ display: showLastWorkingDay === "Yes" ? "flex" : "none" }}
        >
          <label htmlFor="lastWorkingDay">Last Working Day</label>
          {editMode ? (
            <input
              type="date"
              name="lastWorkingDay"
              value={candidateDetails.lastWorkingDay || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  lastWorkingDay: e.target.value,
                })
              }
            />
          ) : (
            <p className={styles.text}>{candidateDetails.lastWorkingDay}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="noticePeriod">Comments:</label>
          {editMode ? (
            <textarea
              name="comments"
              value={candidateDetails.comments || ' '}
              onChange={(e) =>
                setCandidateDetails({
                  ...candidateDetails,
                  comments: e.target.value,
                })
              }
            ></textarea>
          ) : (
            <p className={styles.text}>{candidateDetails.comments ? candidateDetails.comments : 'No comments entered'}</p>
          )}
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="resume">Resume</label>
          {editMode ? (
            <input
              type="file"
              name="resume"
              className={styles.resume}
              value={candidateDetails.resume}
              onChange={handleResumeChange}
            />
          ) : (
            <div>
              <a href={candidateDetails.resume} download>
                Download Resume
              </a>
              {/* <button onClick={() => window.open(candidateDetails.resume, '_blank')}>
                View Resume
              </button> */}
            </div>
          )}
        </div>
        <div className={styles.sub_container}></div>
        <div className={styles.button_container}>
        {editMode ? (
          <>
            <button className={styles.cancel_button} onClick={handleSubmit}>Submit</button>
            <button className={styles.cancel_button} onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className={styles.cancel_button} onClick={toggleEditMode}>Edit</button>
        )}
        </div>
        </div>
      </form>
    </div>
  );
}

export default ViewCandidateDetail;
