import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Right = ({ iteam }) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    totalAmount();
  }, [iteam])

  const totalAmount = () => {
    let price = 0;
    iteam.forEach(item => {
      price += item.price.cost * (item.quantity || 1);
    });
    setPrice(price);
  };

  const handleProceedToBuy = () => {
    localStorage.setItem('cartItems', JSON.stringify(iteam));
    navigate('/order-confirmation');
  };

  return (
    <div className='right_buy'>
      <img src="" alt="" />
      <div className='cost_right'>
        <p>Your order is eligible for FREE Delivery</p><br />
        <span style={{ color: "#565959" }}>Select this option at checkout</span>
        <h3>Sub Total ({iteam.length} items): <span style={{ fontweight: 700 }}>₹{price}.00</span></h3>
        <button className='rightbuy_btn' onClick={handleProceedToBuy}>Proceed to Buy</button>
      </div>
    </div>
  )
}

export default Right

