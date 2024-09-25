import React, { useState } from 'react';
import {Link} from "react-router-dom"
const Sign = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">UsernName</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your UserNmae"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
         <Link to="/todo"><button type="submit" className="login-btn" >
            Sign Up
          </button></Link> 
        </form>
      </div>
    </div>
  );
};

export default Sign;