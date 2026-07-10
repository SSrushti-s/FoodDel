import React, { useState, useEffect } from 'react';
import { useDispatchCart } from './ContextReducer';
import '../App.css';

export default function Cards(props) {
  let dispatch = useDispatchCart();
  
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);

  const options = props.options || {};
  const priceKeys = Object.keys(options);
  const hasDirectPrice = props.foodItem?.price !== undefined && props.foodItem?.price !== null && props.foodItem?.price !== '';

  // Initialize size to first option
  useEffect(() => {
    const keys = Object.keys(props.options || {});
    if (keys.length > 0 && !size) {
      setSize(keys[0]);
    }
  }, [props.options, size]);

  const directPrice = hasDirectPrice ? parseInt(props.foodItem.price) : null;
  const unitPrice = directPrice !== null ? directPrice : (options[size] ? parseInt(options[size]) : 0);
  const finalPrice = qty * unitPrice;

  // Generate a visual mock rating based on name to keep it consistent
  const getMockRating = (name) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return (4.0 + (sum % 9) / 10).toFixed(1);
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem('authToken')) {
      alert('Please log in to add items to your cart.');
      return;
    }

    await dispatch({
      type: 'ADD',
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="card mt-4" style={{ width: '100%' }}>
      <div className="position-relative overflow-hidden" style={{ height: '180px' }}>
        <img 
          src={props.foodItem.img} 
          className="card-img-top w-100 h-100" 
          alt={props.foodItem.name} 
          style={{ objectFit: 'cover' }} 
        />
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-dark bg-opacity-75 text-white" style={{ backdropFilter: 'blur(4px)', fontSize: '0.8rem' }}>
            {props.foodItem.CategoryName}
          </span>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column justify-content-between p-3" style={{ minHeight: '190px' }}>
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title text-white mb-0" style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600',
              lineHeight: '1.3' 
            }}>{props.foodItem.name}</h5>
          </div>
          
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge-rating">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              {getMockRating(props.foodItem.name)}
            </span>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>(50+ ratings)</span>
          </div>
          
          
        </div>

        <div>
          <hr className="my-2" />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-2">
              <select className="custom-select" value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              
              {!hasDirectPrice && priceKeys.length > 0 && (
                <select className="custom-select" value={size} onChange={(e) => setSize(e.target.value)}>
                  {priceKeys.map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="text-emerald" style={{ fontWeight: '700', fontSize: '1.25rem' }}>
              ₹{finalPrice}/-
            </div>
          </div>

          <button 
            className={`btn w-100 d-flex align-items-center justify-content-center gap-2 ${
              added ? 'btn-success' : 'btn-primary-custom'
            }`} 
            onClick={handleAddToCart}
            style={{ fontSize: '0.9rem', padding: '10px' }}
          >
            {added ? (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Added to Cart
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}