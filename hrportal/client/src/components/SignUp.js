import React, { useState } from "react";
import "./SignUp.css";
import backgroundImage from  "../asset/Other-screens-Background-Static-image.png";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [firstPet, setFirstPet] = useState("");
  const [childhoodNickname, setChildhoodNickname] = useState("");
  const [firstMobileBrand, setFirstMobileBrand] = useState("");
  const [collegeYear, setCollegeYear] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formCanceled, setFormCanceled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted: ", {
      firstName,
      lastName,
      employeeId,
      email,
      password,
      securityQuestion,
      securityAnswer,
      firstPet,
      childhoodNickname,
      firstMobileBrand,
      collegeYear,
    });
    setFormSubmitted(true);
  };

  const handleCancel = () => {
    setFormCanceled(true);
  };

  return (
    <div>
        <h1>Sign up to Hiring Portal</h1>
      <form onSubmit={handleSubmit} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <label>
          Employee First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Employee Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <br />
        <label>Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          Security Question:
          <input
            type="text"
            value={securityQuestion}
            onChange={(event) => setSecurityQuestion(event.target.value)}
          />
        </label>
        <br />
        <label>
          Security Answer:
          <input
            type="text"
            value={securityAnswer}
            onChange={(event) => setSecurityAnswer(event.target.value)}
          />
        </label>
        <br />
        <label>
          First Pet:
          <input
            type="text"
            value={firstPet}
            onChange={(event) => setFirstPet(event.target.value)}
          />
        </label>
        <br />
        <label>
          Childhood Nickname:
          <input
            type="text"
            value={childhoodNickname}
            onChange={(event) => setChildhoodNickname(event.target.value)}
          />
        </label>
        <br />
        <label>
          First Mobile Brand:
          <input
            type="text"
            value={firstMobileBrand}
            onChange={(event) => setFirstMobileBrand(event.target.value)}
          />
        </label>
        <br />
        <label>
          College Year:
          <input
            type="text"
            value={collegeYear}
            onChange={(event) => setCollegeYear(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      {formSubmitted && <p className="message">Form submitted successfully!</p>}
      {formCanceled && <p className="error">Form cancelled.</p>}
    </div>
  );
};

export default SignUp;