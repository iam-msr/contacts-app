import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to store error message

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await register(username, password);
      navigate('/login');
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle specific errors or display a generic message
      if (error.response) {
        setError(error.response.data.error); // Set error message from server response
      } else {
        setError("An unexpected error occurred."); // Handle other types of errors
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
