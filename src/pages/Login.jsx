import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simulate login process
    setTimeout(() => {
      // Dummy success
      console.log('Logging in with:', { email, password });
      navigate('/');
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Log In to Eventify</h2>
        <p className="auth-subtitle">Welcome back! Please sign in to continue.</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="auth-actions">
            <button type="submit" className="btn-primary">
              Log In
            </button>
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>
        </form>
        
        <div className="auth-divider">
          <span>or</span>
        </div>
        
        <div className="auth-footer">
          <p>Don't have an account?</p>
          <Link to="/register" className="btn-outline">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;