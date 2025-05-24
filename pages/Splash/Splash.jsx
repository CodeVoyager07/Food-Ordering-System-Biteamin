import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Splash.css';
import logo from '../../assets/logo.png';
import food1 from '../../assets/food_1.png';
import food2 from '../../assets/food_2.png';
import food3 from '../../assets/food_3.png';
import food4 from '../../assets/food_4.png';
import food5 from '../../assets/food_5.png';
import food6 from '../../assets/food_6.png';
import food7 from '../../assets/food_7.png';
import food8 from '../../assets/food_8.png';

const Splash = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'visible';
  }, []);

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      const endpoint = isLogin ? '/api/user/login' : '/api/user/register';
      const response = await axios.post(`http://localhost:4000${endpoint}`, data);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setShowAuthModal(false);
        navigate('/home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="splash-container">
      {/* Floating food images */}
      <div className="floating-food">
        <img src={food1} className="food-1" alt="Food item" />
        <img src={food2} className="food-2" alt="Food item" />
        <img src={food3} className="food-3" alt="Food item" />
        <img src={food4} className="food-4" alt="Food item" />
        <img src={food5} className="food-5" alt="Food item" />
        <img src={food6} className="food-6" alt="Food item" />
        <img src={food7} className="food-7" alt="Food item" />
        <img src={food8} className="food-8" alt="Food item" />
      </div>

      {/* Main content */}
      <div className="splash-content">
        <div className="logo-container">
          <img src={logo} alt="Fresh Bite Logo" className="splash-logo" />
          <div className="logo-glow"></div>
        </div>
        <h1 className="splash-title">
          <span>Fresh</span>
          <span>Bite</span>
        </h1>
        <p className="splash-subtitle">Gourmet meals at your fingertips</p>
        <button 
          className="splash-button"
          onClick={handleGetStarted}
        >
          <span>Get Started</span>
          <div className="button-arrow">→</div>
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-content">
            <button 
              className="close-modal"
              onClick={() => setShowAuthModal(false)}
            >
              &times;
            </button>
            <div className="auth-tabs">
              <button
                className={isLogin ? 'active' : ''}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={!isLogin ? 'active' : ''}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
            {isLogin ? (
              <form className="login-form" onSubmit={handleAuthSubmit}>
                <h3>Login to Your Account</h3>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit" className="auth-submit">Login</button>
              </form>
            ) : (
              <form className="signup-form" onSubmit={handleAuthSubmit}>
                <h3>Create New Account</h3>
                <input name="name" type="text" placeholder="Full Name" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <input name="confirmPassword" type="password" placeholder="Confirm Password" required />
                <button type="submit" className="auth-submit">Sign Up</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Splash;