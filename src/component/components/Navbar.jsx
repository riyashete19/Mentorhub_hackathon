import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully.');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        {currentUser ? (
          <>
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={handleSignOut}>Logout</button>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
