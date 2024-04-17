import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUpForm from './components/SignupForm';
import './App.css';
import ResetPassword from './components/ResetPassword';
import HomePage from './components/HomePage';
import ViewSearchCandidatePage from './components/ViewSearchCandidatePage';
//import NewCandidate from './components/NewCandidate';
import AddCandidateForm from './components/AddCandidateForm';
import NewPassword from './components/NewPassword'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/add-new-candidate" element={<AddCandidateForm/>} />
          <Route path="/search-candidate" element={<ViewSearchCandidatePage/>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password/:employeeId" element={<NewPassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
