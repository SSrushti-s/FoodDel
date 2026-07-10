import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrder = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/myOrderData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail })
        });
        const res = await response.json();
        if (res.orderData && res.orderData.order_data) {
          // Reverse to show latest orders first
          setOrderData(res.orderData.order_data.reverse());
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrder();
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container flex-grow-1 py-5 px-4 animate-fade-in">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <button className="btn back-btn d-flex align-items-center gap-2" onClick={() => navigate('/')}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Menu
          </button>
          <h2 className="mb-0 text-white font-weight-bold" style={{ fontWeight: '700' }}>Order History</h2>
        </div>

        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="spinner-border text-success mb-3" role="status"></div>
            <p className="text-muted">Loading your orders...</p>
          </div>
        ) : orderData.length === 0 ? (
          <div className="text-center py-5 glass-panel rounded-4">
            <svg width="60" height="60" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4"></path>
            </svg>
            <h4 className="text-white">No Orders Placed Yet</h4>
            <p className="text-muted">You haven't ordered any food items yet.</p>
            <button className="btn btn-primary-custom mt-3" onClick={() => navigate('/')}>
              Order Now
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {orderData.map((order, index) => {
              // Extract order date (stored as first element in splice)
              const orderDate = order[0]?.Order_date || 'Date not recorded';
              const items = order.slice(1);
              const orderTotal = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

              return (
                <div key={index} className="card p-4" style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: 'rgba(15, 23, 42, 0.65)'
                }}>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center pb-3 mb-3 border-bottom border-secondary border-opacity-25">
                    <div>
                      <div className="text-muted small" style={{ fontSize: '0.8rem' }}>ORDER PLACED</div>
                      <div className="text-white font-weight-bold" style={{ fontSize: '1rem' }}>{orderDate}</div>
                    </div>
                    <div className="mt-2 mt-sm-0 text-sm-end">
                      <div className="text-muted small" style={{ fontSize: '0.8rem' }}>TOTAL AMOUNT</div>
                      <div className="text-emerald font-weight-bold" style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹{orderTotal}/-</div>
                    </div>
                  </div>

                  <div className="row g-3">
                    {items.map((item, itemIdx) => (
                      <div key={itemIdx} className="col-12 col-md-6">
                        <div className="d-flex align-items-center gap-3 p-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                          <img 
                            src={item.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'} 
                            alt={item.name}
                            className="rounded-2"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="text-white mb-1" style={{ fontSize: '0.95rem', fontWeight: '600' }}>{item.name}</h6>
                            <div className="d-flex gap-2 align-items-center">
                              <span className="badge bg-secondary-custom text-muted" style={{ fontSize: '0.7rem' }}>Size: {item.size}</span>
                              <span className="text-muted" style={{ fontSize: '0.75rem' }}>Qty: {item.qty}</span>
                              <span className="text-emerald" style={{ fontSize: '0.85rem', fontWeight: '600' }}>₹{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
