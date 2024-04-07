import React, { useState } from "react";
import Add from "../../img/addAvatar.png";
import Rimage from "../../img/register.png";
import "./style.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage, realtime } from "../../firebase"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ref as databaseRef, set as setDatabase } from 'firebase/database';

const Register = () => {
  const [error, setErr] = useState(false);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');


  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const phoneNumber = e.target[2].value;
    const password = e.target[3].value;
    const confirmPassword = e.target[4].value;
    const mentorType = selectedValue; 
    const file = e.target[6].files[0];

    if (!displayName || !email || !phoneNumber || !password || !confirmPassword || !file) {
      setErr(true);
      setLoading(false);
      setSuccess(false);
      setErr('Please fill in all fields');
      return;
    }
  

    if (password !== confirmPassword) {
      setErr(true);
      setLoading(false);
      setSuccess(false);
      setErr('Passwords do not match');
      return;
    }
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
  
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
  
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              phoneNumber,
              mentorType, 
              photoURL: downloadURL,
            });
  
            
            if (mentorType === 'personal') {
              await setDatabase(databaseRef(realtime, 'personal mentor/' + res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                phoneNumber,
                mentorType,
                photoURL: downloadURL,
              });
            } else if (mentorType === 'professional') {
              await setDatabase(databaseRef(realtime, 'professional mentor/' + res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                phoneNumber,
                mentorType,
                photoURL: downloadURL,
              });
            }
            
            
            await setDoc(doc(db, "userChats", res.user.uid), {});

            setErr(false);
            setLoading(false);
            setSuccess('Registration successful!');
            
            setTimeout(() => {
              navigate("/mentors/profile");
            }, 3000);

          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };  

  return (
    <div className="formContainer">
      <div className="imageContainer">
        <img src={Rimage} alt="Error!" />
      </div>
      <div className="formWrapper">
        <span className="logo">Menties Side</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="Full Name" />
            <input required type="email" placeholder="Email" />
            <input required type="tel" placeholder="Phone Number" />
            <input required type="password" placeholder="Password" />
            <input required type="password" placeholder="Confirm Password" />
            <select value={selectedValue} onChange={handleSelectChange}>
              <option value="">Select Option</option>
              <option value="personal">Personal Mentor</option>
              <option value="professional">Professional Mentor</option>
            </select>
            <input required style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span>Add an avatar</span>
            </label>
            <button disabled={loading}>Sign up</button>
            {loading && "Loading please wait..."}
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
        <p>
          Already have an account? <Link to="/mentors/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
