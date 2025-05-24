import React from 'react';
import './SuccessPage.css'; // Import the matching CSS

const SuccessPage = () => {
  return (
    <div className="success-page-wrapper">
      <div className="success-page">
        <div className="success-icon">
          ✅
        </div>
        <h1>Success!</h1>
        <p>Your Payment has been successfully Completed.</p>
        <p>We hope you enjoy your meal!</p>
      </div>
    </div>
  );
};

export default SuccessPage;