import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ProfessionalMentors() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followButton, setFollow] = useState("Follow");
  

  useEffect(() => {
    const db = getDatabase();
    const mentorsRef = ref(db, "professional mentor");

    onValue(mentorsRef, (snapshot) => {
      const mentorData = [];
      snapshot.forEach(childSnapshot => {
        const mentor = childSnapshot.val();
        mentorData.push(mentor);
      });
      setMentors(mentorData);
    }, {
      onlyOnce: true
    }, (error) => {
      console.error("Error fetching mentors:", error);
    });

  }, []);

  const handleMentorClick = (mentor) => {
    setSelectedMentor(mentor);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
    setFollow('follow');
  }

  const handleFollowToggle = () => {
    alert(`Following ${selectedMentor.displayName}`)
    setFollow('Following');
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="mentor-list">
          {mentors.map((mentor, index) => (
            <div className="infodiv" key={index} onClick={() => handleMentorClick(mentor)}>
              <img src={mentor.photoURL} alt={mentor.displayName} style={{ height: '30px', width: '30px' }} />
              <p>{mentor.displayName}</p>
              <i className="bi bi-info-square"></i>
            </div>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Selected Mentor Details"
          style={{
            content: {
              height: '300px', // Adjust height as needed
              width: '300px', // Adjust width as needed
              margin: 'auto', // Center the modal horizontally
              background: '#f9f9f9',
            }
          }} 
        >
          {selectedMentor && (
            <div>
              <i className="bi bi-x-lg clear-icon" onClick={handleClose}></i>
              <img src={selectedMentor.photoURL} alt={selectedMentor.displayName} style={{ height: '30px', width: '30px' }} />
              <p><strong>Name:</strong> {selectedMentor.displayName}</p>
              <p><strong>Email:</strong> {selectedMentor.email}</p>
              <p><strong>Phone Number:</strong> {selectedMentor.phoneNumber}</p>
              <div className="special">
                <button onClick={handleFollowToggle}>{followButton}</button>
                <Link to="/menties/chatbox"><button>Message</button></Link> {/* Fixed Link */}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}
export default ProfessionalMentors;
