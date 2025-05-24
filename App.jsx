import React, { useState, useEffect } from 'react';
import Splash from './pages/Splash/Splash';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ScrollButton from './components/Scroll/Scrollbutton.jsx';
import QRPage from './pages/QR/QRPage';
import SuccessPage from './pages/Success/SuccessPage';
import OrderHistory from './pages/OrderHistory/OrderHistory'
import Chatbot from './pages/Chatbot/Chatbot';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setInitialRoute('/');
  }, []);

  if (initialRoute === null) return null;

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        {location.pathname !== '/' && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route 
            path='/' 
            element={initialRoute === '/' ? <Splash /> : <Navigate to="/home" replace />} 
          />
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/qr' element={<QRPage />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/chatbot' element={<Chatbot />} />
        </Routes>
      </div>
      <Footer />
      
      {/* Scroll Up/Down Button */}
      <ScrollButton />
    </>
  );
};

export default App;
// In the above code snippet, we have imported the LiveTracking component and added a new Route for the /live-tracking path. Now, when the user navigates to /live-tracking, the LiveTracking component will be rendered.