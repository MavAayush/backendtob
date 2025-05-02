import React, { useEffect, useState } from 'react';
import Option from './Option';
import Right from './Right';
import Subtotal from './Subtotal';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "./buynow.css";

const BASE_URL ="https://tob-pl9c.onrender.com";


const Buynow = () => {
    const [cartdata, setCartdata] = useState("");
    const navigate = useNavigate();

    const getdatabuy = async () => {
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
            console.log("error");
        } else {
            setCartdata(data.carts.map(item => ({
                ...item,
                quantity: 1 
            })));
        }
    };

    const handleQuantityChange = (id, newQty) => {
        const updatedCart = cartdata.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
        );
        setCartdata(updatedCart);
    };

    useEffect(() => {
        getdatabuy();
    }, []);

    return (
        <div className="buynow_section">
            <div className="buynow_container">
                {
                    cartdata.length ? (
                        <>
                            <div className='left_buy'>
                                <h1>Shopping Cart</h1>
                                <span className='leftbuyprice'>Price</span>
                                <hr style={{ width: "100%", border: "1px solid #ccc" }} />
                                {
                                    cartdata.map((e, k) => (
                                        <React.Fragment key={e.id}>
                                            <div className='item_container'>
                                                <img src={e.url} alt="prod1" />
                                                <div className='item_details'>
                                                    <h3>{e.title.longTitle}</h3>
                                                    <p className='unusuall'>Usually dispatched in 7 Days</p>
                                                    <p>Eligible for free delivery</p>
                                                    <Option
                                                        deletedata={e.id}
                                                        get={getdatabuy}
                                                        item={e}
                                                        onQuantityChange={handleQuantityChange}
                                                    />

                                                </div>
                                                <h3 className='item_price'>₹{e.price.cost}.00</h3>
                                            </div>
                                            <hr style={{ width: "100%", border: "1px solid #ccc" }} />
                                        </React.Fragment>
                                    ))
                                }
                                <Subtotal iteam={cartdata} />
                            </div>
                            <Right iteam={cartdata} />
                        </>
                    ) : (

                        <div className="empty_buy">
                            <img src={`${BASE_URL}/images/emptycart.jpg`} alt="empty cart" />
                            <div className="emptydata">
                                <h1>Your Shopping Cart is Empty</h1>
                                <p>Explore products and add to cart</p>
                                <NavLink to="/" className="empty_btn">Shop Now</NavLink>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Buynow;

