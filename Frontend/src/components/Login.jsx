import React from 'react';
import { Link,Form} from "react-router-dom";

const Login = () => {

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <Form method="POST">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
              name='username'
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
              name='password'
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </Form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
