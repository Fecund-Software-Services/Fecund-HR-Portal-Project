import React from "react";
import "./SignupSuccessfully.css";
// import backgroundImage from "../assets/common-background-image.png"

const SignupSuccessfully = ({
  firstName,
  lastName,
  employeeId,
  email,
  answer1,
  answer2,
  answer3,
}) => {
  return (
    <div className="readonly-fields" >
      <div className="field-row">
        <div className="field-label">First Name</div>
        <div className="field-value">{firstName}</div>
      </div>
      <div className="field-row">
        <div className="field-label">Last Name</div>
        <div className="field-value">{lastName}</div>
      </div>
      <div className="field-row">
        <div className="field-label">Employee ID</div>
        <div className="field-value">{employeeId}</div>
      </div>
      <div className="field-row">
        <div className="field-label">Email</div>
        <div className="field-value">{email}</div>
      </div>
      <div className="field-row">
        <div className="field-label">What is your first pet name ?</div>
        <div className="field-value">{answer1}</div>
      </div>
      <div className="field-row">
        <div className="field-label">What was your childhood nickname ?</div>
        <div className="field-value">{answer2}</div>
      </div>
      <div className="field-row">
        <div className="field-label">What was your first mobile brand name ?</div>
        <div className="field-value">{answer3}</div>
      </div>
    </div>
  );
};

export default SignupSuccessfully;
