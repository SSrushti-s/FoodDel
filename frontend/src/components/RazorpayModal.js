import React, { useState, useEffect } from 'react';

export default function RazorpayModal({ show, onClose, amount, orderId, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking, wallet
  const [upiId, setUpiId] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  
  const [paymentState, setPaymentState] = useState('details'); // details, processing, otp, success
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    if (show) {
      setPaymentState('details');
      setUpiId('');
      setShowQr(false);
      setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
      setSelectedBank('');
      setSelectedWallet('');
      setOtp('');
      setOtpError('');
    }
  }, [show]);

  if (!show) return null;

  const handlePay = () => {
    // Basic validation
    if (paymentMethod === 'upi' && !upiId && !showQr) {
      alert('Please enter a UPI ID or select QR Code');
      return;
    }
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please fill out card details');
      return;
    }
    if (paymentMethod === 'netbanking' && !selectedBank) {
      alert('Please select a bank');
      return;
    }
    if (paymentMethod === 'wallet' && !selectedWallet) {
      alert('Please select a wallet');
      return;
    }

    setPaymentState('processing');
    
    // Simulate API delay for contacting payment servers
    setTimeout(() => {
      setPaymentState('otp');
    }, 2000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      setPaymentState('processing');
      // Simulate verification delay
      setTimeout(() => {
        setPaymentState('success');
        // Play simulated success callback
        setTimeout(() => {
          onPaymentSuccess({
            razorpay_order_id: orderId,
            razorpay_payment_id: 'pay_sim_' + Math.random().toString(36).substring(2, 11),
            razorpay_signature: 'sig_sim_' + Math.random().toString(36).substring(2, 15)
          });
        }, 1800);
      }, 1500);
    } else {
      setOtpError('Invalid OTP! Please enter "1234" to simulate success.');
    }
  };

  const autoFillOtp = () => {
    setOtp('1234');
    setOtpError('');
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{
      zIndex: 9999,
      backgroundColor: 'rgba(7, 10, 19, 0.85)',
      backdropFilter: 'blur(8px)',
      padding: '20px'
    }}>
      <div className="card shadow-2xl overflow-hidden animate-slide-up" style={{
        maxWidth: '700px',
        width: '100%',
        backgroundColor: '#0c101b',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 text-white" style={{
          backgroundColor: '#111726',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div className="d-flex align-items-center gap-2">
            <span style={{
              fontWeight: '900',
              fontSize: '1.25rem',
              color: '#3399FF'
            }}>Razorpay</span>
            <span className="badge bg-secondary-custom" style={{ fontSize: '0.7rem' }}>SIMULATOR</span>
          </div>
          <div className="text-end">
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>AMOUNT TO PAY</div>
            <div style={{ fontWeight: '700', fontSize: '1.15rem', color: '#10b981' }}>₹{amount}</div>
          </div>
        </div>

        {paymentState === 'details' && (
          <div className="row g-0" style={{ minHeight: '380px' }}>
            {/* Sidebar methods selector */}
            <div className="col-12 col-md-4" style={{ 
              backgroundColor: '#0e1422',
              borderRight: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div className="d-flex flex-row flex-md-column h-100">
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-100 border-0 p-3 text-start d-flex align-items-center gap-2 ${paymentMethod === 'upi' ? 'text-white' : 'text-muted'}`}
                  style={{
                    backgroundColor: paymentMethod === 'upi' ? '#161f32' : 'transparent',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>📱</span> UPI / QR Code
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`w-100 border-0 p-3 text-start d-flex align-items-center gap-2 ${paymentMethod === 'card' ? 'text-white' : 'text-muted'}`}
                  style={{
                    backgroundColor: paymentMethod === 'card' ? '#161f32' : 'transparent',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>💳</span> Cards (Credit/Debit)
                </button>
                <button 
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`w-100 border-0 p-3 text-start d-flex align-items-center gap-2 ${paymentMethod === 'netbanking' ? 'text-white' : 'text-muted'}`}
                  style={{
                    backgroundColor: paymentMethod === 'netbanking' ? '#161f32' : 'transparent',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🏦</span> Netbanking
                </button>
                <button 
                  onClick={() => setPaymentMethod('wallet')}
                  className={`w-100 border-0 p-3 text-start d-flex align-items-center gap-2 ${paymentMethod === 'wallet' ? 'text-white' : 'text-muted'}`}
                  style={{
                    backgroundColor: paymentMethod === 'wallet' ? '#161f32' : 'transparent',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>👛</span> Wallets
                </button>
              </div>
            </div>

            {/* Input Details Area */}
            <div className="col-12 col-md-8 p-4 d-flex flex-column justify-content-between">
              <div>
                <h6 className="text-white font-weight-bold mb-3">
                  {paymentMethod === 'upi' && 'Pay using UPI'}
                  {paymentMethod === 'card' && 'Enter Card Details'}
                  {paymentMethod === 'netbanking' && 'Choose Your Bank'}
                  {paymentMethod === 'wallet' && 'Select Your Wallet'}
                </h6>

                {/* UPI UI */}
                {paymentMethod === 'upi' && (
                  <div className="animate-fade-in">
                    {!showQr ? (
                      <div>
                        <div className="mb-3">
                          <label className="form-label">Enter UPI ID (VPA)</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="username@bank" 
                            value={upiId} 
                            onChange={(e) => setUpiId(e.target.value)} 
                          />
                          <small className="text-muted mt-1 d-block">e.g. user@okaxis, user@paytm</small>
                        </div>
                        <div className="text-center my-3 text-muted">— OR —</div>
                        <button 
                          className="btn btn-secondary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                          onClick={() => setShowQr(true)}
                        >
                          📷 Scan QR Code
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <div className="bg-white p-3 d-inline-block rounded-3 mb-2">
                          {/* Simulated QR Code using inline SVG */}
                          <svg width="150" height="150" viewBox="0 0 24 24" fill="black">
                            <path d="M0 0h6v6H0zm2 2v2h2V2zm6 0h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zM0 8h6v6H0zm2 2v2h2v-2zm6-2h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zM0 16h6v6H0zm2 2v2h2v-2zm6-2h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm-12 2h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                          </svg>
                        </div>
                        <p className="text-muted small mb-3">Scan this code using any UPI App to pay</p>
                        <button className="btn btn-sm btn-link text-decoration-none text-info" onClick={() => setShowQr(false)}>
                          ← Back to UPI ID
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Cards UI */}
                {paymentMethod === 'card' && (
                  <div className="animate-fade-in">
                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="4111 2222 3333 4444" 
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label">Expiry Date</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="MM/YY" 
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">CVV</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          placeholder="•••" 
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cardholder Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="John Doe" 
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* Netbanking UI */}
                {paymentMethod === 'netbanking' && (
                  <div className="animate-fade-in row row-cols-2 g-2">
                    {['SBI', 'HDFC', 'ICICI', 'AXIS', 'KOTAK', 'PNB'].map((bank) => (
                      <div className="col" key={bank}>
                        <button 
                          onClick={() => setSelectedBank(bank)}
                          className={`w-100 btn py-3 text-center border rounded-3 ${selectedBank === bank ? 'btn-success text-white border-success' : 'btn-secondary-custom'}`}
                          style={{ fontSize: '0.9rem' }}
                        >
                          🏦 {bank}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Wallets UI */}
                {paymentMethod === 'wallet' && (
                  <div className="animate-fade-in row row-cols-2 g-2">
                    {['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik'].map((wallet) => (
                      <div className="col" key={wallet}>
                        <button 
                          onClick={() => setSelectedWallet(wallet)}
                          className={`w-100 btn py-3 text-center border rounded-3 ${selectedWallet === wallet ? 'btn-success text-white border-success' : 'btn-secondary-custom'}`}
                          style={{ fontSize: '0.9rem' }}
                        >
                          👛 {wallet}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-secondary-custom px-4 py-2" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn-primary-custom flex-grow-1 py-2" onClick={handlePay}>
                  Pay ₹{amount}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processing State */}
        {paymentState === 'processing' && (
          <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center" style={{ minHeight: '380px' }}>
            <div className="spinner-border text-info mb-4" style={{ width: '3.5rem', height: '3.5rem' }} role="status"></div>
            <h5 className="text-white font-weight-bold">Processing payment...</h5>
            <p className="text-muted small mt-2">Do not close this window, press back, or refresh the page.</p>
            <div className="progress mt-4 w-75 bg-dark" style={{ height: '4px' }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style={{ width: '100%' }}></div>
            </div>
          </div>
        )}

        {/* OTP Simulation */}
        {paymentState === 'otp' && (
          <div className="p-4 d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '380px' }}>
            <div className="border border-secondary p-4 rounded-4 w-100" style={{ maxWidth: '400px', backgroundColor: '#0f172a' }}>
              <h5 className="text-white font-weight-bold mb-1">Bank OTP Verification</h5>
              <p className="text-muted small mb-4">We sent a simulated 4-digit code to your registered mobile number.</p>

              {otpError && (
                <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.85rem', borderRadius: '8px' }}>
                  {otpError}
                </div>
              )}

              <form onSubmit={handleOtpSubmit}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control text-center fs-4 tracking-widest" 
                    placeholder="••••"
                    maxLength="4"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setOtpError('');
                    }}
                    required
                  />
                  <div className="text-end mt-1">
                    <button type="button" className="btn btn-link text-info p-0 small text-decoration-none" style={{ fontSize: '0.8rem' }} onClick={autoFillOtp}>
                      Auto-fill OTP ("1234")
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary-custom w-100 py-2">
                  Verify & Complete Payment
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Payment Success */}
        {paymentState === 'success' && (
          <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center" style={{ minHeight: '380px' }}>
            {/* Visual Green Expanding Check Circle */}
            <div className="mb-4 d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 border border-success" style={{
              width: '100px',
              height: '100px',
              animation: 'pulse-ring 2s infinite'
            }}>
              <svg width="50" height="50" fill="none" stroke="#10b981" strokeWidth="3" viewBox="0 0 24 24" className="animate-fade-in">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h3 className="text-white font-weight-bold">Payment Successful</h3>
            <p className="text-muted mt-2">Your payment has been securely processed.</p>
            <div className="p-3 mt-4 rounded-3 w-100" style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              maxWidth: '380px'
            }}>
              <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.85rem' }}>
                <span className="text-muted">Order ID</span>
                <span className="text-white font-monospace">{orderId}</span>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: '0.85rem' }}>
                <span className="text-muted">Transaction Reference</span>
                <span className="text-white font-monospace">pay_sim_{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
              </div>
            </div>
            <p className="text-muted small mt-4">Redirecting you back to home shortly...</p>
          </div>
        )}
      </div>
    </div>
  );
}
