import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { API_BASE } from '../apiConfig';

export default function Signup() {
  const [credentials, setcredentials] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/createuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      if (json.success) {
        setSuccessMsg('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrorMsg('Failed to create account. Please check details or use a different email.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ padding: '20px' }}>
      <div className="form-container animate-slide-up">
        <div className="text-center mb-4">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 className="display-6 font-weight-bold" style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
              fontWeight: '800'
            }}>GoFood</h2>
          </Link>
          <p className="text-muted mt-2">Create a new account to get started</p>
        </div>

        {errorMsg && (
          <div className="alert alert-danger d-flex align-items-center" role="alert" style={{ borderRadius: '12px', fontSize: '0.9rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
            <svg width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success d-flex align-items-center" role="alert" style={{ borderRadius: '12px', fontSize: '0.9rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <svg width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <div className="position-relative">
              <span className="position-absolute" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input 
                type="text" 
                className="form-control" 
                style={{ paddingLeft: '48px !important' }} 
                placeholder="John Doe" 
                name="name" 
                value={credentials.name} 
                onChange={onChange} 
                required 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <div className="position-relative">
              <span className="position-absolute" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input 
                type="email" 
                className="form-control" 
                style={{ paddingLeft: '48px !important' }} 
                placeholder="name@example.com" 
                name="email" 
                value={credentials.email} 
                onChange={onChange} 
                required 
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <span className="position-absolute" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input 
                type="password" 
                className="form-control" 
                style={{ paddingLeft: '48px !important' }} 
                placeholder="••••••••" 
                name="password" 
                value={credentials.password} 
                onChange={onChange} 
                minLength="5"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary-custom w-100 mb-3 d-flex align-items-center justify-content-center"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" className="text-success font-weight-bold" style={{ textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}