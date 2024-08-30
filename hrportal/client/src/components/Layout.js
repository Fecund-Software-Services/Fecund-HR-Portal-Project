/*
Project: Hiring Portal Project phase 2
Author: Omkar & Vishal
Date: 8/07/2024
Sprint: Sprint 1
User Story: Phase 2 Admin Display

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
8/07/2024   |   Vishal Garg             |   1       |    Front End Coding Navbar
-------------------------------------------------------------------------------------------------------
*/



// components/Layout.jsx or Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the import according to your project structure

const Layout = ({ children }) => {
  const location = useLocation();

  // Determine if the current path should hide the Navbar
  const hideNavbarPaths = ['/', '/signup'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  console.log(shouldHideNavbar)

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;






// import React, {useEffect, useState} from 'react';
// import { useLocation } from 'react-router-dom';

// const Layout = ({ children }) => {

//     const location = useLocation()
//     const [showNavbar, setShowNavbar] = useState(true)

//     useEffect(() => {
//         console.log(location)
//         if(location.pathname === '/'){
//             setShowNavbar(false)
//         }
//     }, [location])

//     return (
//         <div>{showNavbar && children}</div>
//         // <div className="app-container">
//         //     {window.location.pathname !== '/'  && <Navbar />} {/* Conditional rendering */}
//         //     <main>{children}</main>
//         // </div>
//     );
// };

// export default Layout;