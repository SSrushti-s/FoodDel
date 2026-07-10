import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const navigate = useNavigate();
  const cartData = useCart();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('authToken');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top glass-panel" style={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 0',
      zIndex: 1030
    }}>
      <div className="container">
        <Link className="navbar-brand fs-2 font-weight-bold d-flex align-items-center" to="/" style={{
          fontStyle: 'italic',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
        FoodDel
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/" style={{ 
                color: '#f8fafc',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'color 0.2s ease'
              }}>Home</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/orderData" style={{ 
                  color: '#94a3b8',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'color 0.2s ease'
                }}>My Orders</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!isLoggedIn ? (
              <div className="d-flex gap-2">
                <Link className="btn btn-secondary-custom px-4 py-2" to="/login" style={{ fontSize: '0.9rem' }}>
                  Login
                </Link>
                <Link className="btn btn-primary-custom px-4 py-2" to="/createuser" style={{ fontSize: '0.9rem' }}>
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link className="btn btn-primary-custom px-4 py-2 d-flex align-items-center gap-2" to="/orderData" style={{ fontSize: '0.9rem' }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  My Cart
                  {cartData.length > 0 && (
                    <span className="badge bg-white text-success rounded-pill ms-1" style={{ 
                      fontSize: '0.75rem',
                      padding: '4px 8px',
                      fontWeight: '700'
                    }}>
                      {cartData.length}
                    </span>
                  )}
                </Link>
                <button className="btn btn-secondary-custom border-danger text-danger px-4 py-2" onClick={handleLogout} style={{ 
                  fontSize: '0.9rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.05)'
                }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}