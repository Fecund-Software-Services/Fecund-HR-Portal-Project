/*
Project: Hiring Portal Project
Author: Vishal
Date: 17/04/2024
Sprint: Sprint 2
User Story: Authentication and Authorization - Login

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
17/4/2024     Vishal Garg                    2         Authentication & Authorization - Login
28/4/2024     Omkar And Vishal               3         View Candidate Details
8/07/2024   |   Vishal Garg             |    1       |    Front End Coding Navbar
-------------------------------------------------------------------------------------------------------
*/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import SignUpForm from "./components/SignupForm";
import "./App.css";
import ResetPassword from "./components/ResetPassword";
import HomePage from "./components/HomePage";
import ViewSearchCandidatePage from "./components/ViewSearchCandidatePage";
import NewCandidate from "./components/NewCandidate";
import NewPassword from "./components/NewPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import ViewCandidateDetail from "./components/ViewCandidateDetail";
import EditCanidateDetails from "./components/EditCandidateDetails";
import Layout from "./components/Layout";
import Navbar from './components/Navbar'
// import { useAuth } from "./context/AuthContext";

function App() {
  

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        {/* <Layout>
          <Navbar />
        </Layout> */}
<Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route exact path="/home" element={<ProtectedRoute />}>
              <Route exact path="/home" element={<HomePage />} />
            </Route>
            <Route
              exact
              path="/home/search-candidate"
              element={<ProtectedRoute />}
            >
              <Route
                exact
                path="/home/search-candidate"
                element={<ViewSearchCandidatePage />}
              />
            </Route>
            <Route
              exact
              path="/home/add-new-candidate"
              element={<ProtectedRoute />}
            >
              <Route
                exact
                path="/home/add-new-candidate"
                element={<NewCandidate />}
              />
            </Route>
            <Route
              exact
              path="/home/search-candidate/candiadte/:id"
              element={<ProtectedRoute />}
            >
              <Route
                exact
                path="/home/search-candidate/candiadte/:id"
                element={<ViewCandidateDetail />}
              />
            </Route>
            <Route
              exact
              path="/home/search-candidate/candiadte/editCandidateDetails/:id"
              element={<ProtectedRoute />}
            >
              <Route
                exact
                path="/home/search-candidate/candiadte/editCandidateDetails/:id"
                element={<EditCanidateDetails />}
              />
            </Route>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/new-password/:employeeId" element={<NewPassword />} />
          </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
