import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount, url, cartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      
      const orderData = {
        customerDetails: {
          firstName: e.target[0].value,
          lastName: e.target[1].value,
          email: e.target[2].value,
          phone: e.target[3].value,
          course: e.target[4].value,
          section: e.target[5].value,
          year: e.target[6].value,
        },
        items: Object.keys(cartItems).filter(itemId => cartItems[itemId] > 0).map(itemId => {
          const item = food_list.find(food => food._id === itemId);
          return {
            foodId: item._id,
            name: item.name,
            price: item.price,
            quantity: cartItems[itemId],
            image: item.image
          };
        }),
        amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 0)
      };

      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      // Send order data to the backend
      const response = await fetch("http://localhost:4000/api/order/submitOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });
      
      const data = await response.json(); // Parse JSON response
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      console.log("Order submitted successfully:", data);
      

      // const data = await response.json();

      if (data.success) {
        navigate('/qr', { 
          state: { 
            orderDetails: data,
            totalAmount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 0
          } 
        });
      } else {
        alert(`Order failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Order processing error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' required />
          <input type="text" placeholder='Last Name' required />
        </div>
        <input type="email" placeholder='Email address' required />
        <input type="tel" placeholder='Phone' required />
        <div className="multi-fields">
          <input type="text" placeholder='Course' required />
          <input type="text" placeholder='Section' required />
        </div>
        <input type="text" placeholder='Year' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 0}</p>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'SUBMITTING ORDER...' : 'PLACE ORDER'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
