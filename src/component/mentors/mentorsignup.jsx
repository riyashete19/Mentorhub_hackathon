import React, { useState } from 'react';
import '../style.css';

function mentorsignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    reenterPassword: '',
    mentorCheckbox1: false,
    mentorCheckbox2: false,
    mentorCheckbox3: false,
    mentorCheckbox4: false,
    mentorCheckbox5: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if all fields are filled
    for (const field in formData) {
      if (!formData[field] && typeof formData[field] !== 'boolean') {
        setError('Please fill in all fields');
        return;
      }
    }

    // Check if passwords match
    if (formData.password !== formData.reenterPassword) {
      setError('Passwords do not match');
      return;
    }

    // Registration successful
    setSuccess('Registration successful!');
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mentor application Form for:</label>
          <input
            type="checkbox"
            name="mentorCheckbox1"
            checked={formData.mentorCheckbox1}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="mentorCheckbox2"
            checked={formData.mentorCheckbox2}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="mentorCheckbox3"
            checked={formData.mentorCheckbox3}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="mentorCheckbox4"
            checked={formData.mentorCheckbox4}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="mentorCheckbox5"
            checked={formData.mentorCheckbox5}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Re-enter Password:</label>
          <input
            type="password"
            name="reenterPassword"
            value={formData.reenterPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default mentorsignup;
