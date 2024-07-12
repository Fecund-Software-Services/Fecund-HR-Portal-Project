// Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const { logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  const handleAdminDropdownToggle = (isOpen) => {
    setAdminDropdownOpen(isOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* <div className={styles.logo}>
        <Link to="/home">
          <img className={styles.img} src={logo} alt="Fecund Software Services" />
        </Link>
      </div> */}
      <ul className={styles.navLinks}>
        <li
          className={styles.adminLink}
          onMouseEnter={() => handleAdminDropdownToggle(true)}
          onMouseLeave={() => handleAdminDropdownToggle(false)}
        >
          <a
            className={styles.adminDropdownToggle}
            href="#"
            onClick={handleAdminDropdownToggle}
          >
            Admin
          </a>
          <ul
            className={`${styles.adminDropdown} ${
              adminDropdownOpen ? styles.show : ""
            }`}
          >
            <ul className={styles.link}>
              <Link to="/skillset">SkillSet</Link>
            </ul>
            <ul className={styles.link}>
              <Link to="/status">Status</Link>
            </ul>
          </ul>
        </li>
        <li className={styles.logoutLink}>
          <div
            class={styles.logout}
            title="Click here to Logout"
            onClick={handleLogout}
          >
            Logout{" "}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

// import React , {useState} from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css'; // Import CSS module

// const Navbar = () => {
// const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container_fluid}>
//         {/* Left Side */}
//         <ul className={styles.navList}>
//           <li className={styles.navItem}>
//             <Link to="/" className={styles.navLink}>
//               <img src="your-logo.png" alt="Company Logo" width="100" height="30" />
//             </Link>
//           </li>
//         </ul>
//         {/* Right Side */}
//         <ul className={styles.navList}>
//         <li className={styles.navLink}><a class="dropdown-toggle" data-toggle="dropdown" href="#">Admin <span class="caret"></span></a>
//         <ul className={styles.dropdown}>
//           <li><a href="#">SkillSet</a></li>
//           <li><a href="#">Status</a></li>
//         </ul>
//       </li>
//         {/* <li className={styles.navItem}>
//             <button className={styles.navLink} onClick={toggleDropdown}>
//               Admin {isOpen && <i className="fas fa-caret-down"></i>}
//             </button>
//             {isOpen && (
//               <ul className={styles.dropdown}>
//                 <li className={styles.dropdownLink}>

//                     Dashboard

//                 </li>
//                 <li className={styles.dropdownLink}>

//                     Users

//                 </li>
//                 {/* Add more dropdown items as needed */}
//               {/* </ul>
//             )}
//           </li> */}
//           <li className={styles.navItem}>
//             <Link to="/logout" className={styles.navLink}>
//               Logout
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
