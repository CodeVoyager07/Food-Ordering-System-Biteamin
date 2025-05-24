import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './QRPage.css';

const QRPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount = 0 } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/success');
    }, 60000); // 1 minute = 60000 milliseconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="qr-page">
      <div className="qr-container">
        <h2>Scan to Pay</h2>
        <img
          src="/qr1.jpg" // Replace with actual QR image path
          alt="QR Code"
          className="qr-image"
        />
        <div className="payment-details">
          <p className="total-amount">Total Amount: <strong>₹{totalAmount.toFixed(2)}</strong></p>
          <p className="upi-id">UPI ID: <strong>Q915966946@ybl</strong></p>
        </div>
        <p className="note">Use any UPI app like Google Pay, PhonePe, Paytm, etc.</p>
        <p className="note">Page will be redirected to success page after 1 minute...</p>
      </div>
    </div>
  );
};

export default QRPage;