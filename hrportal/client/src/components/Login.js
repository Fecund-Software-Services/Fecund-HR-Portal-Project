/*
Project: Hiring Portal Project
Author: Omkar & Vishal
Date: 25/03/2024
Sprint: Sprint 1
User Story: Hiring Portal Login

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
17/4/2024   |   Vishal Garg             |   2        |    Authentication & Authorization - Login
09/05/2024  |   Harshini C              |   4        |    BG update to all screens
-------------------------------------------------------------------------------------------------------
*/


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
//import backgroundImage from "../assets/loginScreen.png";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");
  // Accessing login function and loading variable from AuthContext
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  // handleLogin is a function that triggers after clicking login button uses login hook
  const handleLogin = async (event) => {
    event.preventDefault();

    // Prevent form submission if loading is true
    if (isLoading) {
      return;
    }

    try {
      setError(null);
      await login(email, password);
      navigate('/home')
    } catch (error) {
      // Handle login failure
      setError(error.message);
    }
  };

  return (
    <div
      className={styles.login_container}
    >
    <div className={styles.title_container}>
      <p className={styles.water_brush_regular}>Hiring&nbsp;Portal</p>
    </div>
      <form onSubmit={handleLogin} className={styles.login_form}>
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

        {error && <p className={styles.errorMessage}>{error}</p>}
        <br />

        <button
          type="submit"
          className={styles.login_button}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <br />

        <a href="/reset-password" className={styles.login_link}>
          Reset Password
        </a>
        <br />

        <div>
          <a href="/signup" className={styles.signup_link}>
            Sign up to create new Account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;