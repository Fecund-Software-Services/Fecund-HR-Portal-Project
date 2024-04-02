import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUpForm from './components/SignupForm';
import './App.css';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
