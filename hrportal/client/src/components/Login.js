import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/login-background-static-image.png"; // Replace with the path to your background image
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate1 = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    try {
      console.log("hello");
      const response = await fetch(
        "http://localhost:8080/api/user/login",
        requestOptions
      );
      console.log(response);

      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      // handle successful login, e.g. set a token in local storage
      if(response.ok) {
        navigate1("/home")
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError("");
  // };

  return (
    <div
      className={styles.login_container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={handleSubmit} className={styles.login_form}>
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
