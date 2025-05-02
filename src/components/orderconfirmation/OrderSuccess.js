import React,{ useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './OrderSuccess.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoginContext } from '../context/ContextProvider';

const OrderSuccess = () => {
  const { setAccount } = useContext(LoginContext);

  useEffect(() => {
    // Clear cart from localStorage
    localStorage.removeItem("cartItems");

    // Optional: clear other related data
    localStorage.removeItem("totalAmount");

    // Reset account context cart
    setAccount(prev => ({
      ...prev,
      carts: []
    }));
  }, []);
  
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">
          <CheckCircleIcon fontSize="large" />
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>
          Thank you for your order. Your order has been received and will be processed as soon as possible.
        </p>
        <p className="delivery-message">
          Your order will be delivered within 7 business days.
        </p>
        <div className="payment-info">
          <p>Payment Method: <strong>Cash on Delivery</strong></p>
        </div>
        <div className="button-container">
          <NavLink to="/" className="continue-shopping-btn">
            Continue Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 