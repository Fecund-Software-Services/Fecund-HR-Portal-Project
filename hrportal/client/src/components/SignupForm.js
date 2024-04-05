import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/common-background-image.png";
import popupBackground from "../assets/popup-background.png";
import styles from "./SignupForm.module.css";
import SignupSuccessfully from "./SignupSuccessfully.js";
// import { useSignup } from "./useSignup.js";

const SignUpForm = () => {
  // State for form handling

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate1 = useNavigate();
  const navigate2 = useNavigate();

  // const signUp = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let signUpData = {
      firstName,
      lastName,
      employeeID,
      email,
      password,
      answer1,
      answer2,
      answer3,
    };
    console.log("Form submitted: ", signUpData);

    // const output = await signUp(signUpData)

    // const signup = async ({
    //   firstName,
    //   lastName,
    //   employeeID,
    //   email,
    //   password,
    //   answer1,
    //   answer2,
    //   answer3,
    // }) => {
      setisSubmitting(true);
      setError(null);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          employeeID,
          email,
          password,
          answer1,
          answer2,
          answer3,
        }),
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/user/signup",
          requestOptions
        );
        const data = await response.json();
        console.log(response);
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message);
        }
        if (response.ok) {
          setisSubmitting(false);
          setShowPopup(!showPopup);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setisSubmitting(false);
      }
    // };
    // signup(signUpData);
  };

  const handleCancel = (e) => navigate1("/");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    navigate2("/");
  };

  return (
    <div
      className={styles.signup_container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={handleSubmit} className={styles.signup_form}>
        <div className={styles.title_container}>
          <p className={styles.form_title}>Sign up to Hiring Portal</p>
        </div>
        <div className={styles.sub_container}>
          <label htmlFor="EmployeeFirstName" className={styles.label_type}>
            Employee First Name
          </label>
          <input
            type="text"
            value={firstName}
            // onChange={(e) => setEmployeeFirstName(e.target.value)}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.login_input}
            name="EmployeeFirstName"
            required
          />
        </div>
        <br />
        <div className={styles.sub_container}>
          <label htmlFor="EmployeeLastName" className={styles.label_type}>
            Employee Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.login_input}
            name="EmployeeLastName"
            required
          />
        </div>
        <br />
        <div className={styles.sub_container}>
          <label htmlFor="EmployeeID" className={styles.label_type}>
            Employee ID
          </label>
          <input
            type="number"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            className={styles.login_input}
            name="EmployeeID"
            required
          />
        </div>
        <br />
        <div className={styles.sub_container}>
          <label htmlFor="email" className={styles.label_type}>
            Email ID
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.login_input}
            name="email"
            required
          />
        </div>
        <br />
        <div className={styles.sub_container}>
          <label htmlFor="password" className={styles.label_type}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.login_input}
            name="password"
            required
          />
        </div>
        {/* <br /> */}
        <div>
          <div className={styles.sub_container_question}>
            <label className={styles.label_type}>Security Question 1</label>
            <p htmlFor="SecurityQuestion1" className={styles.p_type}>
              What is your first pet name ?
            </p>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label_type}>Answer</label>
            <input
              type="password"
              value={answer1}
              // onChange={(e) => setEmployeeFirstName(e.target.value)}
              onChange={(e) => setAnswer1(e.target.value)}
              className={styles.login_input}
              name="SecurityQuestion1"
              required
            />
          </div>
        </div>
        <div>
          <div className={styles.sub_container_question}>
            <label className={styles.label_type}>Security Question 2</label>
            <p htmlFor="SecurityQuestion1" className={styles.p_type}>
              What was your childhood nickname ?
            </p>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label_type}>Answer</label>
            <input
              type="password"
              value={answer2}
              // onChange={(e) => setEmployeeFirstName(e.target.value)}
              onChange={(e) => setAnswer2(e.target.value)}
              className={styles.login_input}
              name="SecurityQuestion2"
              required
            />
          </div>
        </div>
        <div>
          <div className={styles.sub_container_question}>
            <label className={styles.label_type}>Security Question 3</label>
            <p htmlFor="SecurityQuestion3" className={styles.p_type}>
              What was your first mobile brand name ?
            </p>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label_type}>Answer</label>
            <input
              type="password"
              value={answer3}
              // onChange={(e) => setEmployeeFirstName(e.target.value)}
              onChange={(e) => setAnswer3(e.target.value)}
              className={styles.login_input}
              name="SecurityQuestion3"
              required
            />
          </div>
        </div>
        <br />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <br />
        <div className={styles.Signup_button_container}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.Signup_button}
          >
            Cancel
          </button>
          <button
            type="submit"
            // onClick={() => setShowPopup(!showPopup)}
            className={styles.Signup_button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Signup"}
          </button>
        </div>
      </form>
      {showPopup && (
        <div className={styles.popup} onClick={togglePopup}>
          <div
            className={styles.popup_content}
            style={{ backgroundImage: `url(${popupBackground})` }}
          >
            <SignupSuccessfully
              firstName={firstName}
              lastName={lastName}
              employeeId={employeeID}
              email={email}
              answer1={answer1}
              answer2={answer2}
              answer3={answer3}
            />
            <p className={styles.popup_message}>
              Form submitted successfully!<a href="/"> Login Here</a>
            </p>
            <button className={styles.popup_close_button} onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
