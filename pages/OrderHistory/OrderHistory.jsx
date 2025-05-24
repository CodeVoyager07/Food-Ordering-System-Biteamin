import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('Please login to view your order history');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log('Fetching orders from:', `${url}/order/list`);
        console.log('Using token:', token ? 'Token present' : 'No token');

        const response = await axios.get(`${url}/order/list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000
        });

        console.log('API Response:', {
          status: response.status,
          data: response.data,
          headers: response.headers
        });

        if (response.data) {
          if (response.data.success === false) {
            const errorMsg = response.data.message || 'Server returned unsuccessful response';
            console.error('API Error:', errorMsg, response.data);
            throw new Error(errorMsg);
          }

          const ordersData = Array.isArray(response.data)
            ? response.data
            : (Array.isArray(response.data.data) ? response.data.data : null);

          if (!ordersData) {
            console.error('Invalid data format:', response.data);
            throw new Error('Received invalid orders data format from server');
          }

          console.log('Successfully loaded orders:', ordersData.length);
          setOrders(ordersData);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (error) {
        let errorMessage = 'Failed to load order history';
        let errorDetails = '';

        if (error.response) {
          errorDetails = JSON.stringify({
            status: error.response.status,
            data: error.response.data,
          }, null, 2);
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorDetails = 'The request was made but no response was received';
          errorMessage = 'No response from server. Please try again later.';
        } else {
          errorDetails = error.message;
          errorMessage = error.message || errorMessage;
        }

        setError(`${errorMessage}\n\n${errorDetails}`);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, url]);

  return (
    <div className="order-history">
      <h2>Your Complete Order History</h2>
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading your order history...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <h3>Error Loading Orders</h3>
          <pre>{error}</pre>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="orders-list">
          <div className="summary-header">
            <p>Showing {orders.length} orders</p>
          </div>
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <div className="order-meta">
                  <h3>Order #{index + 1}</h3>
                  <p className="order-date">
                    <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="customer-details">
                  <h4>Customer Information</h4>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span>{order.customerDetails.firstName} {order.customerDetails.lastName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span>{order.customerDetails.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Course:</span>
                    <span>{order.customerDetails.course}, Year {order.customerDetails.year}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Section:</span>
                    <span>{order.customerDetails.section}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Order ID:</span>
                    <span>{order._id || `ORD-${index + 1}`}</span>
                  </div>
                </div>
              </div>

              <div className="order-items-section">
                <h4>Ordered Items ({order.items.length})</h4>
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <div className="item-image-container">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <span className="item-quantity-badge">{item.quantity}</span>
                      </div>
                      <div className="item-details">
                        <h5 className="item-name">{item.name}</h5>
                        <div className="item-meta">
                          <div className="price-row">
                            <span>Price:</span>
                            <span>₹{item.price}</span>
                          </div>
                          <div className="total-row">
                            <span>Total:</span>
                            <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{order.amount}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Charges:</span>
                  <span>₹0.00</span>
                </div>
                <div className="summary-row grand-total">
                  <span>Total Amount:</span>
                  <span>₹{order.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
