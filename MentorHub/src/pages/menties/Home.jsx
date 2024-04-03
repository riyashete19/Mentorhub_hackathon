import React from 'react';
import { useNavigate } from 'react-router-dom'; 
function YourComponent() {
  const navigate = useNavigate();

  const handleChatboxClick = () => {
    navigate('/chatbox');
  };

  const handleProfileClick = () => {
    navigate('/menties/profile');
  };

  return (
    <>
      <button onClick={handleChatboxClick}>Open Chatbox</button>
      <button onClick={handleProfileClick}>Profile</button>
    </>
  );
}

export default YourComponent;
