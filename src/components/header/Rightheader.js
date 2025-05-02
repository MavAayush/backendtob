import { React, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { LoginContext } from '../context/ContextProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./rightheader.css"

const Rightheader = ({ logclose }) => {

    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();



    //added
    const handleCartClick = () => {
        logclose();
        navigate("/buynow");
    };
    ///till here


    const logoutuser = async () => {
        try {
            const res2 = await fetch("/lougout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            const data2 = await res2.json();
            console.log(data2);

            if (res2.status !== 201) {
                toast.info("You're already logged out.", {
                    position: "top-center"
                });
            } else {
                toast.success("Logout Successful", {
                    position: "top-center",
                    icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>,
                    style: {
                        background: "#fff",
                        color: "#000",
                    },
                    progressStyle: {
                        background: "#D7A86E",
                    },
                });

                setTimeout(() => {
                    logclose();
                    navigate("/");
                    setAccount(false);
                }, 1000);
            }
        } catch (error) {
            console.log("Logout error: ", error);
            toast.warning("Already Logged Out", {
                position: "top-center"
            });
        }
    };



    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account ? <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar" ></Avatar>
                    }
                    {
                        account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""
                    }
                </div>

                <div className="nav_btn" onClick={() => logclose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop by Category</NavLink>
                    <hr style={{ width: "100%", border: "1px solid #ccc", marginLeft: "-20px" }} />
                    <NavLink to="/login">Sign In</NavLink>

                    <div className="cart_redirect navlink-style" onClick={handleCartClick}>
                        Your Cart
                    </div>

                    <hr style={{ width: "100%", border: "1px solid #ccc", marginLeft: "-20px" }} />
                    <div className="navlink-style flag" onClick={logoutuser}>
                        <LogoutIcon style={{ fontSize: 16, fontWeight: 600, marginRight: 5 }} />
                        Sign Out
                    </div>
                </div>
            </div>
        </>

    )
}

export default Rightheader;
