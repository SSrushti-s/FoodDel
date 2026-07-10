import React from 'react';

export default function Carousel({ search, setSearch }) {
  return (
    <div className="position-relative overflow-hidden mb-5" style={{
      height: '420px',
      background: 'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), #0f172a',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Decorative background visual */}
      <div className="position-absolute w-100 h-100" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=50")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        filter: 'grayscale(30%) contrast(110%)'
      }}></div>

      <div className="container h-100 position-relative d-flex flex-column justify-content-center text-center text-md-start" style={{ zIndex: 2 }}>
        <div className="row align-items-center">
          <div className="col-12 col-md-7 animate-slide-up">
            
            <h1 className="display-4 font-weight-bold mb-3" style={{ fontWeight: '800', letterSpacing: '-1.5px' }}>
              Delicious Meals,<br/>
              Delivered To <span style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900'
              }}>Your Doorstep</span>
            </h1>
            <p className="text-muted fs-5 mb-4" style={{ maxWidth: '500px' }}>
              Choose from a curated list of delicious Indian, Italian, and continental dishes. Order hot, fresh food anytime!
            </p>

            {/* Glassmorphic Search Bar */}
            <div className="p-2 rounded-4 glass-panel d-inline-block w-100" style={{ maxWidth: '540px' }}>
              <form className="d-flex align-items-center w-100" onSubmit={(e) => e.preventDefault()}>
                <span className="ps-3 text-muted">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input
                  className="form-control border-0 bg-transparent flex-grow-1 shadow-none"
                  style={{ color: 'white', fontSize: '1rem', padding: '10px 15px' }}
                  type="search"
                  placeholder="What are you craving today? (e.g. Pizza, Burger...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary-custom px-4 py-2" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          
          {/* Right side floating food visual (hidden on mobile) */}
          <div className="col-md-5 d-none d-md-block text-center position-relative">
            <div style={{
              animation: 'pulse-ring 6s infinite ease-in-out',
              position: 'relative'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" 
                alt="Delicious Burger" 
                className="img-fluid rounded-circle shadow-lg"
                style={{
                  width: '320px',
                  height: '320px',
                  objectFit: 'cover',
                  border: '8px solid rgba(255, 255, 255, 0.03)',
                  boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}