
import React, { useState } from 'react';
import backgroundImage from '../assets/common-background-image.png'; // Import the background image
import './MyReset.css'; // Import the CSS file
//import Login from './Login'; // Import the Login component


const securityQuestions = [
    { value: 'What is your first pet name?', label: 'What is your first pet name?' },
    { value: 'What was your childhood nickname?', label: 'What was your childhood nickname?' },
    { value: 'What was your first mobile brand name?', label: 'What was your first mobile brand name?' },
  ];
  
  function MyReset() {
    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState(securityQuestions[0].value);
    const [answer, setAnswer] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Implement logic to reset password based on user input
      console.log('Employee ID:', employeeId);
      console.log('Email:', email);
      console.log('Security Question:', securityQuestion);
      console.log('Answer:', answer);
    };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h1 className="reset-password-title">Reset Password</h1>
        <div className="form-field">
          <label htmlFor="employeeId" className="form-label">
            Employee ID:
          </label>
          <input
            type="number"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="emailId" className="form-label">
            Email ID:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="securityQuestion" className="form-label">
            Security Question:
          </label>
          <select
            id="securityQuestion"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            required
            className="form-input"
          >
           {/* // <option value="">Select a question</option> */}
            {securityQuestions.map((question) => (
              <option key={question.value} value={question.value}>
                {question.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="answer" className="form-label">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-button-group">
          <button type="submit" className="form-button">
            Cancel
          </button>
          <button type="button"  className="form-button">
          Verify 
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyReset;