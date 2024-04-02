import React, { useState } from 'react';
import '../style.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    reenterPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if all fields are filled
    for (const field in formData) {
      if (!formData[field]) {
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

export default Signup;
