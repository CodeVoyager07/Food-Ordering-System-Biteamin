import React, { useEffect, useState } from "react";
import { getallOrders } from "../../../../Backend/controllers/orderController";
import "./Orders.css";
import axios from "axios";


const OrdersComponent = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order/all`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        
        if (response.data.success) {
          console.log('Full API response:', JSON.stringify(response.data, null, 2));
          console.log('First order full data:', JSON.stringify(response.data.data[0], null, 2));
          console.log('First order user data structure:', Object.keys(response.data.data[0]?.user || {}));
          if (response.data.data && Array.isArray(response.data.data)) {
            const formattedOrders = response.data.data.map(order => {
              const customer = order.user || order.customerDetails || {};
              return {
                ...order,
                customerDetails: {
                  firstName: customer.firstName || customer.name?.split(' ')[0] || 'N/A',
                  lastName: customer.lastName || customer.name?.split(' ')[1] || 'N/A',
                  email: customer.email,
                  phone: customer.phone,
                  course: customer.course,
                  year: customer.year,
                  section: customer.section
                },
                items: Array.isArray(order.items) ? order.items : []
              };
            });
            setOrders(formattedOrders);
          } else {
            console.error("Invalid orders data format:", response.data);
            setOrders([]);
          }
        } else {
          console.error("Failed to fetch orders:", response.data.message);
          alert("Failed to load orders. Please try again.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [url]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) return <div>Loading orders...</div>;
  
  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container">
        <h2>Order Management</h2>
        <div className="no-orders">No orders found</div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Order Management</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <React.Fragment key={order._id}>
              <tr>
                <td>{order._id.substring(0, 8)}...</td>
                <td>
                  {order.customerDetails.firstName || 'N/A'}
                </td>
                <td>
                  {order.customerDetails.lastName || 'N/A'}
                </td>
                <td>{order.customerDetails.email}</td>
                <td>{order.customerDetails.phone || 'N/A'}</td>
                <td>₹{order.amount}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button 
                    onClick={() => toggleOrderDetails(order._id)}
                    className="details-btn"
                  >
                    {expandedOrder === order._id ? 'Hide' : 'Show'}
                  </button>
                </td>
              </tr>
              {expandedOrder === order._id && (
                <tr className="order-details-row">
                  <td colSpan="8">
                    <div className="order-details">
                      <h4>Complete Order Details</h4>
                      <p><strong>Full Order ID:</strong> {order._id}</p>
                <div className="customer-info-grid">
                  <div><strong>First Name:</strong> {order.customerDetails.firstName}</div>
                  <div><strong>Last Name:</strong> {order.customerDetails.lastName}</div>
                  <div><strong>Email:</strong> {order.customerDetails.email || 'N/A'}</div>
                  <div><strong>Phone:</strong> {order.customerDetails.phone || 'N/A'}</div>
                  <div><strong>Course:</strong> {order.customerDetails.course || 'N/A'}</div>
                  <div><strong>Section:</strong> {order.customerDetails.section || 'N/A'}</div>
                  <div><strong>Year:</strong> {order.customerDetails.year || 'N/A'}</div>
                </div>
                      <p><strong>Amount:</strong> ₹{order.amount}</p>
                      <div className="order-items-section">
                        <h3 className="order-items-title">Ordered Food Items</h3>
                        <div className="food-items-container">
                          {order.items.map((item, index) => (
                            <div key={index} className="food-item">
                              <div className="food-image-container">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="food-image"
                                  onError={(e) => e.target.src='/images/default-food.png'}
                                />
                              </div>
                              <div className="food-details">
                                <h4 className="food-name">{item.name}</h4>
                                <div className="food-info">
                                  <p><strong>Price:</strong> ₹{item.price}</p>
                                  <p><strong>Quantity:</strong> {item.quantity}</p>
                                  <p><strong>Item Total:</strong> ₹{item.price * item.quantity}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="order-summary">
                          <p><strong>Subtotal:</strong> ₹{order.amount}</p>
                          <p><strong>Total Items:</strong> {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        </div>
                      </div>
                      <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersComponent;
