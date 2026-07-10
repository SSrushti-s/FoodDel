import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';
import RazorpayModal from '../components/RazorpayModal';
import '../App.css';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ orderId: '', amount: 0, simulated: true });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Math calculations
  const subtotal = data.reduce((total, food) => total + parseFloat(food.price), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + deliveryFee + tax;

  if (data.length === 0) {
    return (
      <div className="container py-5 d-flex flex-column align-items-center justify-content-center min-vh-100 animate-fade-in">
        <div className="mb-4 text-center">
          <svg width="80" height="80" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h3 className="text-white font-weight-bold">Your Cart is Empty</h3>
          <p className="text-muted">Explore our menu and add items to your cart.</p>
        </div>
        <button className="btn btn-primary-custom px-5 py-3" onClick={() => navigate('/')}>
          Browse Food Items
        </button>
      </div>
    );
  }

  const startCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      let response = await fetch(`${API_BASE}/api/foodData`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const orderData = await response.json();
      
      if (orderData.success) {
        // Dual-mode integration
        if (!orderData.simulated && window.Razorpay) {
          const options = {
            key: orderData.keyId,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'GoFood',
            description: 'Food Delivery Payment',
            order_id: orderData.orderId,
            handler: async function (response) {
              await verifyAndCompleteOrder(response, false);
            },
            prefill: {
              email: localStorage.getItem('userEmail') || ''
            },
            theme: {
              color: '#10b981'
            }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          // Open mock simulation popup
          setPaymentDetails({
            orderId: orderData.orderId,
            amount: (orderData.amount / 100).toFixed(2),
            simulated: true
          });
          setShowModal(true);
        }
      } else {
        alert('Failed to initialize payment.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server. Is backend running?');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const verifyAndCompleteOrder = async (rzpResponse, isSimulated) => {
    try {
      const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      let response = await fetch(`${API_BASE}/api/foodData`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const verifyData = await response.json();

      if (verifyData.success) {
        let userEmail = localStorage.getItem('userEmail');
        const orderResponse = await fetch(`${API_BASE}/api/orderData`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
        });

        if (orderResponse.status === 200) {
          dispatch({ type: 'DROP' });
          setShowModal(false);
          alert('Order placed successfully! Enjoy your meal!');
          navigate('/');
        } else {
          alert('Payment verified, but failed to store order. Contact support.');
        }
      } else {
        alert('Payment verification failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying payment.');
    }
  };

  return (
    <div className="container py-5 animate-fade-in" style={{ minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <button className="btn back-btn d-flex align-items-center gap-2" onClick={() => navigate('/')}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Menu
        </button>
        <h2 className="mb-0 text-white font-weight-bold" style={{ fontWeight: '700' }}>Your Basket</h2>
      </div>

      <div className="row g-4">
        {/* Left Side: Cart Items list */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {data.map((food, index) => (
              <div key={`${food.id}-${food.size}-${index}`} className="card p-3 d-flex flex-row align-items-center gap-3" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <img 
                  src={food.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'} 
                  alt={food.name} 
                  className="rounded-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="text-white font-weight-bold mb-1" style={{ fontSize: '1.05rem' }}>{food.name}</h6>
                      <span className="badge bg-secondary-custom text-muted me-2" style={{ fontSize: '0.75rem' }}>Size: {food.size}</span>
                      <span className="text-muted" style={{ fontSize: '0.85rem' }}>Qty: {food.qty}</span>
                    </div>
                    <div className="text-end">
                      <div className="text-emerald font-weight-bold" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                        ₹{food.price}
                      </div>
                      <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                        ₹{parseFloat(food.price) / food.qty} each
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-outline-danger p-2 border-0 rounded-circle d-flex align-items-center justify-content-center"
                  onClick={() => dispatch({ type: 'REMOVE', index: index })}
                  style={{ width: '36px', height: '36px', transition: 'all 0.2s ease', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="col-lg-4">
          <div className="card p-4 glass-panel" style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h5 className="text-white font-weight-bold mb-4">Summary Invoice</h5>
            
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Items Subtotal</span>
                <span className="text-white">₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Delivery Charges</span>
                <span className={deliveryFee === 0 ? 'text-emerald' : 'text-white'}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">GST / Taxes (5%)</span>
                <span className="text-white">₹{tax}</span>
              </div>
              
              {subtotal < 500 && (
                <div className="alert alert-info py-2 px-3 m-0" style={{ fontSize: '0.8rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)', backgroundColor: 'rgba(59, 130, 246, 0.05)', color: '#93c5fd' }}>
                  💡 Add <b>₹{500 - subtotal}</b> more for free delivery!
                </div>
              )}
            </div>

            <hr className="mb-4" />

            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-white font-weight-bold fs-5">Grand Total</span>
              <span className="text-emerald font-weight-bold fs-4">₹{grandTotal}/-</span>
            </div>

            <button 
              className="btn btn-primary-custom w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
              onClick={startCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              Pay with Razorpay
            </button>

            <div className="text-center text-muted small d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '0.75rem' }}>
              <span>🔒 Secure checkout processed by Razorpay</span>
            </div>
          </div>
        </div>
      </div>

      <RazorpayModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        amount={paymentDetails.amount} 
        orderId={paymentDetails.orderId}
        onPaymentSuccess={(rzpResponse) => verifyAndCompleteOrder(rzpResponse, true)}
      />
    </div>
  );
}