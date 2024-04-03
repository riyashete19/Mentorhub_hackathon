import React from 'react';
import { useNavigate } from 'react-router-dom';

function Mentieshome() {
  const navigate = useNavigate();

  const handleChatboxClick = () => {
    navigate('/chatbox');
  };

  return (
    <>
      <button onClick={handleChatboxClick}>Open Chatbox</button>
    </>
  );
}

export default Mentieshome;
