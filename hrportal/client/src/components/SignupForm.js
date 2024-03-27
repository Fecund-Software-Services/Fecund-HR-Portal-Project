import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/common-background-image.png";
import popupBackground from "../assets/popup-background.png";
import "./SignupForm.css";
import SignupSuccessfully from "./SignupSuccessfully.js";

const SignUpForm = () => {
  // State for form handling

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");

  const [showPopup, setShowPopup] = React.useState(false);

  const navigate1 = useNavigate();
  const navigate2 = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      employeeId,
      email,
      password,
      answer1,
      answer2,
      answer3,
    };
    console.log("Form submitted: ", data);

    setShowPopup(true);
    e.preventDefault();
  };

  const handleCancel = (e) => navigate1("/");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    navigate2("/")

  }

  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="title-container">
          <p className="form-title">Sign up to Hiring Portal</p>
        </div>
        <div className="sub-container">
          <label htmlFor="EmployeeFirstName" className="label-type">
            Employee First Name
          </label>
          <input
            type="text"
            value={firstName}
            // onChange={(e) => setEmployeeFirstName(e.target.value)}
            onChange={(e) => setFirstName(e.target.value)}
            className="Signup-input"
            name="EmployeeFirstName"
            required
          />
        </div>
        <br />
        <div className="sub-container">
          <label htmlFor="EmployeeLastName" className="label-type">
            Employee Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="Signup-input"
            name="EmployeeLastName"
            required
          />
        </div>
        <br />
        <div className="sub-container">
          <label htmlFor="EmployeeID" className="label-type">
            Employee ID
          </label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="Signup-input"
            name="EmployeeID"
            required
          />
        </div>
        <br />
        <div className="sub-container">
          <label htmlFor="email" className="label-type">
            Email ID
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="Signup-input"
            name="email"
            required
          />
        </div>
        <br />
        <div className="sub-container">
          <label htmlFor="password" className="label-type">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            name="password"
            required
          />
        </div>
        {/* <br /> */}
        <div>
          <div className="sub-container-question">
            <label className="label-type">Security Question 1</label>
            <p htmlFor="SecurityQuestion1" className="p-type">
              What is your first pet name ?
            </p>
          </div>
          <div className="sub-container">
            <label className="label-type">Answer</label>
            <input
              type="text"
              value={answer1}
              // onChange={(e) => setEmployeeFirstName(e.target.value)}
              onChange={(e) => setAnswer1(e.target.value)}
              className="Signup-input"
              name="SecurityQuestion1"
              required
            />
          </div>
        </div>
        <div>
          <div className="sub-container-question">
            <label className="label-type">Security Question 2</label>
            <p htmlFor="SecurityQuestion1" className="p-type">
              What was your childhood nickname ?
            </p>
          </div>
          <div className="sub-container">
            <label className="label-type">Answer</label>
            <input
              type="text"
              value={answer2}
              // onChange={(e) => setEmployeeFirstName(e.target.value)}
              onChange={(e) => setAnswer2(e.target.value)}
              className="Signup-input"
              name="SecurityQuestion2"
              required
            />
          </div>
        </div>
        <div>
          <div className="sub-container-question">
            <label className="label-type">Security Question 3</label>
            <p htmlFor="SecurityQuestion3" className="p-type">
              What was your first mobile brand name ?
            </p>
          </div>
          <div className="sub-container">
            <label className="label-type">Answer</label>
            <input
              type="text"
              value={answer3}
              // onChange={(e) => setEmployeeFirstName(e.target.value)}
              onChange={(e) => setAnswer3(e.target.value)}
              className="Signup-input"
              name="SecurityQuestion3"
              required
            />
          </div>
        </div>
        <br />
        <div className="Signup-button-container">
          <button
            type="button"
            onClick={handleCancel}
            className="Signup-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => setShowPopup(!showPopup)}
            className="Signup-button"
          >
            Sign-up
          </button>
        </div>
      </form>
      {showPopup && (
        <div className="popup" onClick={togglePopup}>
          <div
            className="popup-content"
            style={{ backgroundImage: `url(${popupBackground})` }}
          >
            <SignupSuccessfully
              firstName={firstName}
              lastName={lastName}
              employeeId={employeeId}
              email={email}
              answer1={answer1}
              answer2={answer2}
              answer3={answer3}
            />
            <p className="popup-message">
              Form submitted successfully!<a href="/"> Login Here</a>
            </p>
            <button className="popup-close-button" onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* {formSubmitted && <p className="message">Form submitted successfully!</p>} */}
      {/* {formCanceled && <p className="error">Form cancelled.</p>} */}
    </div>
  );
};

export default SignUpForm;
