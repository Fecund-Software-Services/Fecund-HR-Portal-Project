// Login.js
import React, { useState } from 'react';
// Replace with the path to your background image
import backgroundImage from '../assets/login-background-static-image.png'; 
import styles from './Login.module.css';
// importing "useLogin" from hooks
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // using 'useLogin' hook
  const { login, error, isLoading} = useLogin()
 

  // handleLogin is a function that triggers after clicking login button uses login hook
  const handleLogin= async (event) => {
    event.preventDefault();
    await login(email, password)
  }
    

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError("");
  // };

  return (
    <div className={styles.login_container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form onSubmit={handleLogin} className={styles.login_form}>

        <div className={styles.sub_container}>
          <label htmlFor="email" className={styles.label_type}>Email ID</label>
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
        <br/>

        <button 
        type="submit" className={styles.login_button} disabled={isLoading}>
          {isLoading ? "Logging in...": "Login"} 
        </button>
        <br />

        <a href="/reset-password" className={styles.login_link}>Reset Password</a>
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
