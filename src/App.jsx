import React from 'react';
import './App.css';
import "./style.scss";

import {Outlet} from 'react-router-dom';

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
