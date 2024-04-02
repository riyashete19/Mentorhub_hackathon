import React, { useState } from 'react';
import './App.css';
import Login from './component/menties/login';
import Signup from './component/menties/signup';
import msignup from './component/mentors/mentorsignup';
import mlogin from './component/mentors/mentorlogin';

function App() {
  return (
    <>
      <Login />
      <Signup/>
      
    </>
  );
}

export default App;
