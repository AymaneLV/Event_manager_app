import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';    
import './Register.css';  


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from URL if available
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlRole = searchParams.get('role');
    if (urlRole === 'user' || urlRole === 'admin') {
      setRole(urlRole);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      console.log('Registering with:', { name, email, password, role });
      navigate('/login');
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">
          {role === 'admin' ? 'Become an event organizer' : 'Find amazing events'}
        </p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="John Doe"
              required
            />
          </div>
          
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
          
          <div className="form-group">
            <label>Role</label>
            <div className="role-options">
              <label className="role-option">
                <input
                  type="radio"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                />
                <span className="role-label">Attendee</span>
              </label>
              
              <label className="role-option">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                />
                <span className="role-label">Organizer</span>
              </label>
            </div>
          </div>
          
          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>
        
        <div className="auth-divider">
          <span>or</span>
        </div>
        
        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="btn-outline">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;