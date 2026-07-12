import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { API_BASE } from '../apiConfig';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/loginuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();

      if (json.success) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        navigate('/');
      } else {
        setErrorMsg(json.errors || 'Invalid credentials. Please try again.');
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
          <p className="text-muted mt-2">Welcome back! Please enter your details</p>
        </div>

        {errorMsg && (
          <div className="alert alert-danger d-flex align-items-center" role="alert" style={{ borderRadius: '12px', fontSize: '0.9rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
            <svg width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
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
            Sign In
          </button>
        </form>

        <div className="text-center my-3">
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>or continue with</span>
        </div>

        <div className="row g-2 mb-4">
          <div className="col">
            <button className="btn btn-secondary-custom w-100 d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '0.9rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.62 4.45 1.635l2.427-2.428C17.65 1.93 15.115 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.795 0 10.24-4.065 10.24-10.24 0-.695-.08-1.355-.22-1.955H12.24z"/>
              </svg>
              Google
            </button>
          </div>
          <div className="col">
            <button className="btn btn-secondary-custom w-100 d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '0.9rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08 1.15.08 2.81-1.33z"/>
              </svg>
              Apple
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
            New to GoFood? <Link to="/createuser" className="text-success font-weight-bold" style={{ textDecoration: 'none', fontWeight: '600' }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}