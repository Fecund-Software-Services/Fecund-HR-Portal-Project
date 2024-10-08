/*
Project: Hiring Portal Project
Author: Vishal
Date: 01/04/2024
Sprint: Sprint 1
User Story: Successful Login and Home Page

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
24/4/2024   |   Vishal                  |   3        |    Search Candidate
2/5/2024    |   Vishal                  |   3        |    Search Candidate Validations - Code Integration
10/05/2024  |   Harshini C              |   4        |    Log Out button
14/05/2024  |   Harshini C              |   4        |    CSS and alignment based on BG image
18/07/2024  |   Vishal Garg             |   2        |    Front End Coding Navbar 
28/08/2024  |   Harshini C              |   4        | Footer - Implementing the social media links
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ViewSearchCandidatePage.module.css"; // Import CSS module
//import { FaTwitterSquare , FaFacebook , FaLinkedin , FaInstagramSquare } from "react-icons/fa";


function ViewSearchCandidatePage() {
  const [searchType, setSearchType] = useState("date");
  const [searchData, setSearchData] = useState({
    year: "",
    month: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const nav = useNavigate();

  const handleSearchTypeChange = (event) => {
    setError(null)
    setSearchResults([])
    setSearchData({
      year: "",
      month: "",
      firstName: "",
      lastName: "",
      email: "",
    })
    setSearchType(event.target.value);
  };

  // Function to determine if the table should be shown based on search type
  const shouldShowTable = searchResults.length > 0;

  const handleInputChange = (event) => {
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
    console.log(searchData);
  };

  
  const handleSearch = () => {
    setSearchResults([]);
    setError(null);

    const fetchData = async (searchTerm) => {
      if (searchType === "user") {
        const { firstName, lastName, email } = searchTerm;

        // Constructing the query parameters based on user input
        // const queryParams = new URLSearchParams({
        //   searchTerm: `${firstName} ${lastName} ${email}`.trim(), // Concatenating firstName, lastName, and email
        // });
        
        const queryParams = new URLSearchParams()

        if (firstName) {
          queryParams.append('firstName', firstName.trim());
        }
        if (lastName) {
          queryParams.append('lastName', lastName.trim());
        }
        if (email) {
          queryParams.append('email', email.trim());
        }

        console.log(queryParams)
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/candidate/search-candidate?${queryParams.toString()}`
          );
          
          const data = await response.json();

          if (!response.ok) {
            setSearchResults([])
            throw new Error(data.message); // Re-throw with more context
          }
          setSearchResults(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        const { month, year } = searchTerm;
        // Constructing the query parameters based on user input
        const queryParams = new URLSearchParams({
          searchTerm: `${year} ${month}`.trim(), // Concatenating month and year with '&'
        });

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/candidate/view-candidate?${queryParams.toString()}`
          );
          
          const data = await response.json();
          if (!response.ok) {
            setSearchResults([])
            throw new Error(data.message); // Re-throw with more context
          }
          setSearchResults(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (searchData) {
      fetchData(searchData);
    }
  };

  const handleViewDetails = (id) => {
    // Handle view details logic, e.g., open modal or navigate to a new page
    nav(`/home/search-candidate/candiadte/${id}`)
    console.log("View details for ID:", id);
  };

  // Logic for pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.search_container}>
      <div className={styles.title_container}>
        <p className={styles.rastanty_Cortez}>View / Search Candidate</p>
      </div>
      <div className={styles.divide}>
        <div className={styles.form_container}>
          <div className={styles.radio_group}>
            <div className={styles.flex_conatiner_a}>
              <input
                type="radio"
                id="dateSearch"
                name="searchType"
                value="date"
                checked={searchType === "date"}
                onChange={handleSearchTypeChange}
                className={styles.checkbox}
              />
              <label className={styles.radio_label} htmlFor="dateSearch">
                <b>View the candidates applied in</b>
              </label>
            </div>
            <div className={styles.flex_conatiner_b}>
              <input
                type="radio"
                id="userSearch"
                name="searchType"
                value="user"
                checked={searchType === "user"}
                onChange={handleSearchTypeChange}
                className={styles.checkbox}
              />
              <label className={styles.radio_label} htmlFor="userSearch">
                <b>Search candidate</b>
              </label>
            </div>
          </div>
          {searchType === "date" && (
  <div className={styles.input_group}>
    <div className={styles.flex_conatiner}>
      <label className={styles.label} htmlFor="year">
        <b>Year<span className={styles.asterisk}>*</span>:</b>
      </label>
      <input
        type="text"
        id="year"              
        name="year"
        placeholder="YYYY"
        value={searchData.year}
        onChange={handleInputChange}
        className={styles.input_field}
      />
    </div>
    <div className={styles.flex_conatiner}>
      <label className={styles.label} htmlFor="month">
       <b>Month<span className={styles.asterisk}>*</span>:</b>
      </label>
      <select
        id="month"             
        name="month"
        value={searchData.month}
        onChange={handleInputChange}
        className={styles.input_field}
      >
        <option value="">Select Month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  </div>
)}
{searchType === "user" && (
  <div className={styles.input_group}>
    <div className={styles.flex_conatiner}>
      <label className={styles.label} htmlFor="firstName">
        <b>First Name:</b>
      </label>
      <input
        type="text"
        id="firstName"           /* Added id for label association */
        name="firstName"
        value={searchData.firstName}
        onChange={handleInputChange}
        className={styles.input_field}
      />
    </div>
    <div className={styles.flex_conatiner}>
      <label className={styles.label} htmlFor="lastName">
        <b>Last Name:</b>
      </label>
      <input
        type="text"
        id="lastName"            /* Added id for label association */
        name="lastName"
        value={searchData.lastName}
        onChange={handleInputChange}
        className={styles.input_field}
      />
    </div>
    <div className={styles.flex_conatiner}>
      <label className={styles.label} htmlFor="email">
        <b>Email:</b>
      </label>
      <input
        type="text"
        id="email"               /* Added id for label association */
        name="email"
        value={searchData.email}
        onChange={handleInputChange}
        className={styles.input_field}
      />
    </div>
  </div>
)}

          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.button_container}>
            <button
              onClick={handleSearch}
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
        {shouldShowTable && (
          <div className={styles.table_container}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <button
                        onClick={() => handleViewDetails(item._id)}
                        className={styles.button_view}
                      >
                        View
                      </button>
                    </td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.mobileNumber}</td>
                    <td>{item.emailAddress}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              {currentPage >= 2 ? <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.table_button}
              >
                Previous
              </button> : null}
              {/* <span>{currentPage}</span> */}
              {searchResults.length > resultsPerPage ? <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastResult >= searchResults.length}
                className={styles.table_button}
              >
                Next
              </button> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewSearchCandidatePage;
