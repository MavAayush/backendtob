import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cart.css";

const BASE_URL = "https://tob-pl9c.onrender.com";

const Cart = () => {
    const { id } = useParams("");

    const history = useNavigate();

    const { account, setAccount } = useContext(LoginContext);

    const [inddata, setInddata] = useState("");
    console.log(inddata);

    const getinddata = async () => {
        try {
            const res = await fetch(`https://tob-pl9c.onrender.com/getproductsone/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log("Fetched Data:", data);

            if (res.status === 201 && data) {
                setInddata(data);
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        setTimeout(getinddata, 1000)
    }, [id]);

    //add cart function
    const addtocart = async (id) => {
        if (!account || !account._id) {
            // User is not logged in, redirect to sign-in
            toast.warning("Sign in to proceed", {
                position: "top-center",
            })
            history("/login");
            return;
        }
    
        try {
            const checkres = await fetch(`https://tob-pl9c.onrender.com/addcart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inddata }),
                credentials: "include"
            });
    
            const data1 = await checkres.json();
            console.log(data1);
    
            if (checkres.status === 401 || !data1) {
                console.log("User Invalid");
                alert("User Invalid");
            } else {
                toast.success("Item Added to Cart", {
                    position: "top-center",
                    icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>, // custom icon with color
                    style: {
                        background: "#fff",
                        color: "#000",
                    },
                    progressStyle: {
                        background: "#D7A86E",
                    },
                });
                history("/buynow");
                setAccount(data1);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    

    return (
        <div className="cart_section">
            <div className="cart_container">
                {inddata ? ( 
                    <>
                        <div className="left_cart">
                            <img
                                src={
                                    inddata?.url?.startsWith("http")
                                        ? inddata.url
                                        : `${BASE_URL}${inddata?.url}`
                                }
                                alt="cart_img"
                                onError={(e) => (e.target.src = "/fallback-image.png")}
                            />


                            <div className="cart_btn">
                                <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                                <button className="cart_btn2" onClick={() => addtocart(inddata.id)}>Buy Now</button>
                            </div>
                        </div>
                        <div className="right_cart">
                            <h3>{inddata?.title?.shortTitle || "Product Title"}</h3>
                            <h4>{inddata?.title?.longTitle || "Product Description"}</h4>
                            <hr style={{ width: "100%", border: "1px solid #ccc" }} />
                            <p className="mrp">M.R.P. : ₹{inddata?.price?.mrp || 599}</p>
                            <p>Deal of the Day : <span>₹{inddata?.price?.cost || 499}</span></p>
                            <p>You Save: <span>₹{inddata?.price?.mrp - inddata?.price?.cost || 100}</span></p>
                            <div className="discount_box">
                                <h4>Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Within 7-8 Days</span></h4>
                                <p>Fastest Delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
                            </div>
                            <p className="description">
                                About the Item: <span>{inddata?.description}</span>
                            </p>
                        </div>
                    </>
                ) : (
                    <p>Loading product details...</p>
                )}
            </div>
            {
                !inddata ? <div className='circle'>
                    <CircularProgress sx={{ color: '#D7A86E' }}/>
                    <h2>Loading...</h2>
                </div> : ""
            }
        </div>
    );
};

export default Cart;
