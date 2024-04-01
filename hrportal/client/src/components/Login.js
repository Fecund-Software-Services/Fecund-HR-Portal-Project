// Login.js

import React, { useState } from 'react';
import backgroundImage from '../assets/login-background-static-image.png'; // Replace with the path to your background image

import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    // Call API endpoint for login
    const login = async () => {
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        setError("Login failed, please check your email and password.");
        return;
      }

      // Redirect to another page if login is successful
      window.location.href = "/dashboard";
    };

    if (email && password) {
      login();
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
  };

  return (
    <div className={styles.login_container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <div className={styles.sub_container}>
          <label htmlFor="email" className={styles.label_type}>Email ID</label>
          <input 
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.login_input}
            name="email"
            required 
          />
        </div>
       
        <br />
        <div className={styles.sub_container}>
          <label htmlFor="password" className={styles.label_type}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.login_input}
            name="password"
            required 
          />
        </div>
        
        <br />
        <button type="submit" className={styles.login_button}>Login</button>
        <br />
        <a href="/reset-password" className={styles.login_link}>Reset Password</a>
        <br />
        <div>
         <a href="/signup" className={styles.signup_link}>Sign up to create new Account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;


