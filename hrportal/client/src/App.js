import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUpForm from './components/SignupForm';
import './App.css';
import Home from './components/Home';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
