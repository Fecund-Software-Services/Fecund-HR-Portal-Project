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
// import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
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
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/new-password/:employeeId" element={<NewPassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
