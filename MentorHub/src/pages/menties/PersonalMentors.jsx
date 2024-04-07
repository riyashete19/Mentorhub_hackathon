// PersonalMentors.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import NavBar from "./Navbar";
import Modal from 'react-modal';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

Modal.setAppElement('#root');

function PersonalMentors() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followButtonLabel, setFollowButtonLabel] = useState("Follow"); // Renamed followobut to followButtonLabel

  useEffect(() => {
    const db = getDatabase();
    const mentorsRef = ref(db, "personal mentor");

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
    setFollowButtonLabel('Follow');
  }

  const handleFollowToggle = () => {
    alert(`Following ${selectedMentor.displayName}`)
    setFollowButtonLabel('Following');
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  return (
    <>
      <NavBar />
      <div className="mentor-list-container">
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
            <div className="men">
              <i className="bi bi-x-lg clear-icon" onClick={handleClose}></i>
              <img src={selectedMentor.photoURL} alt={selectedMentor.displayName} style={{ height: '30px', width: '30px' }} />
              <p><strong>Name:</strong> {selectedMentor.displayName}</p>
              <p><strong>Email:</strong> {selectedMentor.email}</p>
              <p><strong>Phone Number:</strong> {selectedMentor.phoneNumber}</p>
              <div className="special">
                <button onClick={handleFollowToggle}>{followButtonLabel}</button>
                <Link to="/menties/chatbox"><button>Message</button></Link> {/* Fixed Link */}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default PersonalMentors;
