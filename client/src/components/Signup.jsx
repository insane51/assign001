// Signup.js

import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        mobile,
        password,
        email,
      });

      console.log('Signup successful', response.data);
      // You can add further logic, such as redirecting the user or updating the UI
    } catch (error) {
      console.error('Signup error', error.message);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Mobile:</label>
      <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
