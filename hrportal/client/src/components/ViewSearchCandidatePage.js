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
24/4/2024      Vishal                        3          Search Candidate
-------------------------------------------------------------------------------------------------------
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ViewSearchCandidatePage.module.css"; // Import CSS module
import backgroundImage from "../assets/common-background-image.png";

function ViewSearchCandidatePage() {
  const [searchType, setSearchType] = useState("date");
  const [searchData, setSearchData] = useState({
    year: "",
    month: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(2);

  // const data = [id = 12345, firstName = 'Vishal', lastName = 'garg', email = "vishal.garg@fecundservices.com", mobileNumber = 8728976049 ]

  const data = [
    {
      // Create an object to hold user data
      id: 12345,
      firstName: "Vishal",
      lastName: "Garg",
      email: "vishal.garg@fecundservices.com",
      mobileNumber: 8728976049,
      status: "Submitted",
    },
    {
      // Create an object to hold user data
      id: 123488,
      firstName: "Sanjay",
      lastName: "HS",
      email: "Sanjay.HS@fecundservices.com",
      mobileNumber: 9999999999,
      status: "Submitted",
    },
    {
      // Create an object to hold user data
      id: 12348,
      firstName: "Omkar",
      lastName: "Tajane",
      email: "Omkar.tajane@fecundservices.com",
      mobileNumber: 9999988888,
      status: "Submitted",
    },
    {
      // Create an object to hold user data
      id: 123,
      firstName: "Vandit",
      lastName: "Goel",
      email: "Vandit.goel@fecundservices.com",
      mobileNumber: 9999988888,
      status: "Submitted",
    },
    {
      // Create an object to hold user data
      id: 12346,
      firstName: "Deepika",
      lastName: "Polina",
      email: "Deepika.polina@fecundservices.com",
      mobileNumber: 9999988888,
      status: "Submitted",
    },
    {
      // Create an object to hold user data
      id: 12347,
      firstName: "Tushar",
      lastName: "Pareek",
      email: "Tushar.parik@fecundservices.com",
      mobileNumber: 9999988888,
      status: "Submitted",
    },
    {
      // Create an object to hold user data
      id: 12365,
      firstName: "Sanjay",
      lastName: "Rathi",
      email: "Sanjay.rathi@fecundservices.com",
      mobileNumber: 9999988888,
      status: "Submitted",
    },
  ];

  const nav = useNavigate();

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
  };

  const handleSearch = async () => {
    try {
      //   let response;
      //   if (searchType === 'date') {
      //     response = await fetch(`/api/data?year=${searchData.year}&month=${searchData.month}`);
      //   } else if (searchType === 'user') {
      //     response = await fetch(`/api/data?firstName=${searchData.firstName}&lastName=${searchData.lastName}&email=${searchData.email}`);
      //   }
      //   const data = await response.json();
      // setSearchResult(data);
      setSearchResult(data);
      console.log("done");
      console.log(searchResult)
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handleViewDetails = (id) => {
    // nav(`/home/search-candidate/candidate/${id}`)
    nav(`/home/search-candidate/candiadte`);
    // Handle view details logic, e.g., open modal or navigate to a new page
    console.log("View details for ID:", id);
  };

  // Logic for pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResult.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.search_container}>
      <div className={styles.title_container}>
        <p className={styles.form_title}>View/Serach Candidate</p>
      </div>
      <div className={styles.form_container}>
        <div className={styles.radio_group}>
          <div className={styles.flex_conatiner}>
            <input
              type="radio"
              id="dateSearch"
              name="searchType"
              value="date"
              checked={searchType === "date"}
              onChange={handleSearchTypeChange}
            />
            <label className={styles.radio_label} htmlFor="dateSearch">
              Search by Date
            </label>
          </div>
          <div className={styles.flex_conatiner}>
            <input
              type="radio"
              id="userSearch"
              name="searchType"
              value="user"
              checked={searchType === "user"}
              onChange={handleSearchTypeChange}
            />
            <label className={styles.radio_label} htmlFor="userSearch">
              Search by User Detail
            </label>
          </div>
        </div>
        {searchType === "date" && (
          <div className={styles.input_group}>
            <div className={styles.flex_conatiner}>
              <label className={styles.label}>Year:</label>
              <input
                type="text"
                name="year"
                value={searchData.year}
                onChange={handleInputChange}
                className={styles.input_field}
              />
            </div>
            <div className={styles.flex_conatiner}>
              <label className={styles.label}>Month:</label>
              <input
                type="text"
                name="month"
                value={searchData.month}
                onChange={handleInputChange}
                className={styles.input_field}
              />
            </div>
          </div>
        )}
        {searchType === "user" && (
          <div className={styles.input_group}>
            <div className={styles.flex_conatiner}>
              <label className={styles.label}>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={searchData.firstName}
                onChange={handleInputChange}
                className={styles.input_field}
              />
            </div>
            <div className={styles.flex_conatiner}>
              <label className={styles.label}>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={searchData.lastName}
                onChange={handleInputChange}
                className={styles.input_field}
              />
            </div>
            <div className={styles.flex_conatiner}>
              <label className={styles.label}>Email:</label>
              <input
                type="text"
                name="email"
                value={searchData.email}
                onChange={handleInputChange}
                className={styles.input_field}
              />
            </div>
          </div>
        )}
        <div className={styles.button_container}>
          <button onClick={handleSearch} className={styles.button}>
            Search
          </button>
        </div>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>View</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map((item, index) => (
              <tr key={index}>
                <td>
                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className={styles.button_view}
                  >
                    View
                  </button>
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {searchResult.length ? (
          <div className={styles.pagination}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastResult >= searchResult.length}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ViewSearchCandidatePage;
