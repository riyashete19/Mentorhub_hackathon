import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import App from './App';
import Login from './component/menties/login';
import Signup from './component/menties/signup'; 
import Protected from './component/protected';
import Home from './component/home';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="menties/login" element={<Login />} />
        <Route path="menties/signup" element={<Signup />} />
        <Route path="/" element={<Protected />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
