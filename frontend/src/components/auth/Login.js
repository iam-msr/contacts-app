import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to store error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      console.log("Error ocurred in login",error.response.data);
      if (error.response) {
        setError(error.response.data.error); // Set error message from server response
      } else {
        setError("An unexpected error occurred."); // Handle other types of errors
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
