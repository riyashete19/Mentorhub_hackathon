import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import App from './App';
import Login from './component/menties/login';
import Signup from './component/menties/signup'; 
import MentorsLogin from './component/mentors/mentorlogin';
import Home from './component/home';
import Choice from './choice'; 
import Chatbox from './component/chatbox';
import Mentieshome from './component/menties/mentieshome';

ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="menties/login" element={<Login />} />
            <Route path="menties/signup" element={<Signup />} />
            <Route path="mentors/login" element={<MentorsLogin />} /> 
            <Route path="/mentieshome" element={<Mentieshome />} /> 
            <Route path="*" element={<Chatbox />} />
            <Route index element={<Home />} />
            <Route path="choice" element={<Choice />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChatContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
