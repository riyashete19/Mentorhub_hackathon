import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import NavBar from "./Navbar";


Modal.setAppElement('#root');

function Menties() {
  const [menties, setMenties] = useState([]);
  const [selectedMenty, setSelectedMenty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followButton, setFollowButton] = useState("Follow");

  useEffect(() => {
    const db = getDatabase();
    const mentiesRef = ref(db, "menties");

    onValue(mentiesRef, (snapshot) => {
      const mentiesData = [];
      snapshot.forEach(childSnapshot => {
        const menty = childSnapshot.val();
        mentiesData.push(menty);
      });
      setMenties(mentiesData);
    }, {
      onlyOnce: true
    }, (error) => {
      console.error("Error fetching menties:", error);
    });

  }, []);

  const handleMentyClick = (menty) => {
    setSelectedMenty(menty);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
    setFollow('follow');
  }

  const handleFollowToggle = () => {
    alert(`Following ${selectedMenty.displayName}`)
    setFollowButton('Following');
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="menty-list">
          {menties.map((menty, index) => (
            <div className="infodiv" key={index} onClick={() => handleMentyClick(menty)}>
              <img src={menty.photoURL} alt={menty.displayName} style={{ height: '30px', width: '30px' }} />
              <p>{menty.displayName}</p>
              <i className="bi bi-info-square"></i>
            </div>
          ))}
        </div>
        <Modal
  isOpen={modalIsOpen}
  onRequestClose={handleClose}
  contentLabel="Selected Menty Details"
  style={{
    content: {
      height: '300px', // Adjust height as needed
      width: '300px', // Adjust width as needed
      margin: 'auto', // Center the modal horizontally
      background: '#f9f9f9',
    }
  }} 
>
  {selectedMenty && (
    <div className="detail">
      <i className="bi bi-x-lg clear-icon" onClick={handleClose}></i>
        <img 
            src={selectedMenty.photoURL} 
            alt={selectedMenty.displayName} 
            style={{ 
              height: '50px', 
              width: '50px',
              display: 'block', // Set display to block
              margin: 'auto'    // Set auto margin for horizontal centering
            }} />
            {/* Adjust image size */}
      <p><strong>Name:</strong> {selectedMenty.displayName}</p>
      <p><strong>Email:</strong> {selectedMenty.email}</p>
      <p><strong>Phone Number:</strong> {selectedMenty.phoneNumber}</p>
      <div className="special">
        <button onClick={handleFollowToggle}>{followButton}</button>
        <Link to="/mentors/chatbox"><button>Message</button></Link> {/* Fixed Link */}
      </div>
    </div>
  )}
</Modal>

      </div>
    </>
  );
}

export default Menties;
