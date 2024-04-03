import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import App from './App';
import MainHome from './Home';
import UserChoice from './choice'; 
import Chatbox from './pages/chatbox';
import MentiesLogin from './pages/menties/Login';
import MentiesRegiester from './pages/menties/Register'; 
import MentiesHome from './pages/menties/Home';
import MentiesPorfile from './pages/menties/Profile';

ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/menties/login" element={<MentiesLogin />} />
            <Route path="/menties/register" element={<MentiesRegiester />} />
            <Route path="/menties/home" element={<MentiesHome />} /> 
            <Route path="/menties/profile" element={<MentiesPorfile />} /> 
            <Route path="/chatbox" element={<Chatbox />} />
            <Route index element={<MainHome />} />
            <Route path="/choice" element={<UserChoice />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChatContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
