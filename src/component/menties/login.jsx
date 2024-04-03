import React, { useState } from 'react';
import '../style.css';
import GoogleButton from 'react-google-button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      localStorage.setItem('token', result.user.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); 

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      setSuccess('Login Successful!');
      // Redirect to home page upon successful login
      navigate("/mentieshome");
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>} 
      <form onSubmit={handleSubmit}>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
        <GoogleButton onClick={handleSignInWithGoogle}/>
        <div>
          Don't have an account? <Link to="/menties/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
