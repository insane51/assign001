// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddUser from './components/AddUser';
import OrderDetails from './components/OrderDetails';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleSignup = (username) => {
    setCurrentUser(username);
  };

  const handleAddUser = (username, email) => {
    // Perform add user logic (e.g., API call)
    // For simplicity, we're just logging the username and email
    console.log(`Added user: ${username}, Email: ${email}`);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/add-order">Add Order</Link>
            </li>
            <li>
              <Link to="/get-order">Get Order</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Signup onSignup={handleSignup} />}
          />
          <Route
            path="/add-order"
            element={<AddUser onAddUser={handleAddUser} />}
          />
          <Route
            path="/get-order"
            element={<OrderDetails username={currentUser} />}
          />
        </Routes>

        {currentUser && <p>Welcome, {currentUser}!</p>}
      </div>
    </Router>
  );
};

export default App;
