import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { updateProfile } from 'firebase/auth'; 
import NavBar from './Navbar';
import './style.scss'; 

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    bio: '',
    photoURL: '' 
  });

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setPhoneNumber(userData.phoneNumber);
           
            setFormData({
              displayName: userData.displayName || '',
              email: userData.email || '',
              phoneNumber: userData.phoneNumber || '',
              bio: userData.bio || '',
              photoURL: userData.photoURL || '' 
            });
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

  const handleEditProfile = () => {
    setEditProfileVisible(true);
  };

  const handleCancelEdit = () => {
    setEditProfileVisible(false);
  };

  const handleUpdateProfile = async () => {
    const confirmed = window.confirm("Are you sure you want to update your profile?");
    if (confirmed) {
      try {
        
        const docRef = doc(db, 'users', currentUser.uid);
        await updateDoc(docRef, formData);
        
        
        const updatedDocSnap = await getDoc(docRef);
        if (updatedDocSnap.exists()) {
          const updatedUserData = updatedDocSnap.data();
          setPhoneNumber(updatedUserData.phoneNumber);
          setFormData({
            displayName: updatedUserData.displayName || '',
            email: updatedUserData.email || '',
            phoneNumber: updatedUserData.phoneNumber || '',
            bio: updatedUserData.bio || '',
            photoURL: updatedUserData.photoURL || ''
          });
        }
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
      setEditProfileVisible(false); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <NavBar />
      <div className={`profile-container ${editProfileVisible ? 'hidden' : ''}`}>
        <img src={formData.photoURL} alt="Profile" className="profile-image" />
        <div className="profile-details">
          <h2>{formData.displayName}</h2>
          <p>{formData.email}</p>
          <p className="phone-number">{phoneNumber}</p>
          <p className="bio">{formData.bio}</p>
        </div>
        <div className="profile-actions">
          <button onClick={handleEditProfile}>Edit Profile</button>
          <Link onClick={()=>signOut(auth)} to="/">Logout</Link>
        </div>
      </div>

      <div className={`edit-profile-container ${editProfileVisible ? '' : 'hidden'}`}>
        <input 
          required 
          type="text" 
          placeholder="Full Name" 
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
        />
        <input 
          required 
          type="email" 
          placeholder="Email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          required 
          type="tel" 
          placeholder="Phone Number" 
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <input 
          required 
          type="text" 
          placeholder="Add Bio" 
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <button onClick={handleUpdateProfile}>Update</button>
        <button onClick={handleCancelEdit}>Cancel</button>
      </div>
    </>
  );
}

export default Profile;
