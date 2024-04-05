import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUpForm from './components/SignupForm';
import './App.css';
import HomePage from './components/HomePage';
import ViewSearchCandidatePage from './components/ViewSearchCandidatePage';
import NewCandidate from './components/NewCandidate';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/add-new-candidate" element={<NewCandidate/>} />
          <Route path="/search-candidate" element={<ViewSearchCandidatePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
