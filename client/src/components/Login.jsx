// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [logUser, setlogUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        logUser,
        password,
      });

      if(response.status === 202){
        const token = response.data.token;
  
        console.log(token);
  
        // Set the token in a cookie
        Cookies.set('jwtToken', token);
  
        console.log('Login successful', response.data);
        navigate(`/`);
      }else{
        setMessage("incorrect Credentials");
        console.log("incorrect Credentials");
      }

      // You can add further logic, such as redirecting the user or updating the UI
    } catch (error) {
      console.error('Login error', error.message);
      // Handle error, display an error message, etc.
    }
    onLogin(logUser);
  };

  return (
    <div>
      <h2>Login</h2>
      <h3>{message}</h3>
      <label>Email or Mobile:</label>
      <input type="text" value={logUser} onChange={(e) => setlogUser(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
