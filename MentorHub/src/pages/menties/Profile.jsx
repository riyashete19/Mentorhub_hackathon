import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setPhoneNumber(userData.phoneNumber);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting user document:', error);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <img src={currentUser.photoURL} alt="Profile" className="profile-image" />
      <div className="profile-details">
        <h2>{currentUser.displayName}</h2>
        <p>{currentUser.email}</p>
        <p className="phone-number">{phoneNumber}</p>
      </div>
      <div className="profile-actions">
        <Link onClick={()=>signOut(auth)} to="/">Logout</Link>
      </div>
    </div>
  );
}

export default Profile;
