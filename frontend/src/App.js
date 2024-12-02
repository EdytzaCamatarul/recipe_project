import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import ProfilePage from './components/pages/ProfilePage';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';

function App() {
  return (
    <>
    <Router>
      <Navbar /> 
        <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/register' exact element={<Register/>} />
        <Route path='/login' exact element={<Login/>} />
        <Route path='/profile' exact element={<ProfilePage/>} />
        <Route path='/forgot-password' exact element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
