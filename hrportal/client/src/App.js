import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUpForm from './components/SignupForm';
import './App.css';
import HomePage from './components/HomePage';
import ViewSearchConadidatePage from './components/viewSearchCondidatePage';
import NewCondidate from './components/NewCondidate';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/add-new-candidate" element={<NewCondidate/>} />
          <Route path="/search-candidate" element={<ViewSearchConadidatePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
