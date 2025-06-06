import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch cart items from backend
  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const res = await fetch("/cartdetails", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
  
        const data = await res.json();
  
        if (res.status !== 201) {
          console.log("error fetching cart data");
          navigate('/');
        } else {
          const itemsWithQuantity = data.carts.map(item => ({
            ...item,
            quantity: 1
          }));
          setCartItems(itemsWithQuantity);
  
          let total = 0;
          itemsWithQuantity.forEach(item => {
            total += item.price.cost * (item.quantity || 1);
          });
          setTotalAmount(total);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
        navigate('/');
      }
    };
  
    // Check localStorage first
    const cart = localStorage.getItem('cartItems');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);
  
      let total = 0;
      parsedCart.forEach(item => {
        total += item.price.cost * (item.quantity || 1);
      });
      setTotalAmount(total);
      setLoading(false);
    } else {
      getCartDetails();
    }
  }, [navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value
    });
  };

  // Handle order submission
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address || 
        !orderDetails.city || !orderDetails.state || !orderDetails.pincode) {
      alert("Please fill all the fields");
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(orderDetails.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        items: cartItems,
        totalAmount,
        customerDetails: orderDetails,
        paymentMethod: 'Cash on Delivery',
        orderStatus: 'Pending'
      };

      const response = await fetch("/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.status === 201) {
        // Reset cart and redirect to order success page
        alert("Order placed successfully!");
        navigate('/ordersuccess');
      } else {
        alert("Failed to place order. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-confirmation-container">
      <div className="order-details">
        <h2>Order Confirmation</h2>
        
        <div className="order-items">
          <h3>Your Items</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.url} alt={item.title.shortTitle} />
              <div className="item-details">
                <h4>{item.title.shortTitle}</h4>
                <p>{item.title.longTitle}</p>
                <p>Quantity: {item.quantity || 1}</p>
                <p className="item-price">₹{item.price.cost}.00</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items ({cartItems.length}):</span>
            <span>₹{totalAmount}.00</span>
          </div>
          <div className="summary-row">
            <span>Delivery:</span>
            <span>FREE</span>
          </div>
          <div className="summary-row total">
            <span>Order Total:</span>
            <span>₹{totalAmount}.00</span>
          </div>
          <div className="payment-method">
            <span className="payment-label">Payment Method:</span>
            <span className="payment-value">Cash on Delivery</span>
          </div>
        </div>
      </div>

      <div className="customer-details">
        <h3>Delivery Details</h3>
        <form onSubmit={handleSubmitOrder}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={orderDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={orderDetails.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={orderDetails.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={orderDetails.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={orderDetails.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={orderDetails.pincode}
              onChange={handleChange}
              pattern="[0-9]{6}"
              required
            />
          </div>
          
          <button type="submit" className="confirm-order-btn">
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderConfirmation; 