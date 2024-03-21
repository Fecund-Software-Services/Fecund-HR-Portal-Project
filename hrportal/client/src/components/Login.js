// Login.js

import React, { useState } from 'react';
import backgroundImage from '../assets/login-background-static-image.png'; // Replace with the path to your background image

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email , password)
    setEmail('')
    setPassword('')
  };

  

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form onSubmit={handleSubmit} className="login-form">
        <div className='sub-container'>
        <label htmlFor="email" className='labletype'>Email ID</label>
        <input 
          type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          name="email"
          required 
        />
        </div>
       
        <br />
        <div className='sub-container'>
        <label htmlFor="password" className='labletype'>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          name="password"
          required 
        />
        </div>
        
        <br />
        <button type="submit" className="login-button">Login</button>
        <br />
        <a href="/reset-password" className="login-link">Reset Password</a>
        <br />
        <div>
      <a href="/signup" className="signup-link">Sign up to create new Account</a>
      </div>
      </form>
      
      
      
    </div>
  );
};

export default Login;


