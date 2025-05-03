import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';
import "./signup.css";

const BASE_URL = "https://tob-pl9c.onrender.com";

const SignUp = () => {
    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { account } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target;
        setUdata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const senddata = async (e) => {
        e.preventDefault();

        if (account) {
            toast.warning("You are already logged in", {
                position: "top-center",
                autoClose: 2000,
            });
            navigate("/");
            return;
        }

        const { fname, email, mobile, password, cpassword } = udata;

        // Frontend validation
        if (!fname || !email || !mobile || !password || !cpassword) {
            toast.warning("Please fill in all fields", { position: "top-center" });
            return;
        }

        if (password.length < 6) {
            toast.warning("Password must be at least 6 characters", { position: "top-center" });
            return;
        }

        if (password !== cpassword) {
            toast.warning("Passwords do not match", { position: "top-center" });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fname, email, mobile, password, cpassword })
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                toast.warning("Invalid Details", {
                    position: "top-center",
                });
            } else {
                toast.success("Registered Successfully", {
                    position: "top-center",
                    icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>,
                    style: { background: "#fff", color: "#000" },
                    progressStyle: { background: "#D7A86E" },
                });

                setUdata({ fname: "", email: "", mobile: "", password: "", cpassword: "" });

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Something went wrong. Please try again.", { position: "top-center" });
        }

        setLoading(false);
    };

    return (
        <section className='sign_section_x'>
            <div
                className='sign_container_x'
                style={{
                    backgroundImage: `url(${BASE_URL}/images/card4.jpg)`,
                }}
            >
                <div className='sign_form_x'>
                    <form method='POST' onSubmit={senddata}>
                        <h1 style={{ color: '#fff' }}>Sign-Up</h1>

                        <div className='form_data_x'>
                            <label htmlFor="fname" style={{ color: '#fff' }}>Your Name</label>
                            <input type="text" name="fname" id="fname" required
                                value={udata.fname} onChange={adddata} />
                        </div>

                        <div className='form_data_x'>
                            <label htmlFor="email" style={{ color: '#fff' }}>Email</label>
                            <input type="email" name="email" id="email" required
                                value={udata.email} onChange={adddata} />
                        </div>

                        <div className='form_data_x'>
                            <label htmlFor="mobile" style={{ color: '#fff' }}>Mobile</label>
                            <input type="text" name="mobile" id="mobile" required
                                value={udata.mobile} onChange={adddata} />
                        </div>

                        <div className='form_data_x'>
                            <label htmlFor="password" style={{ color: '#fff' }}>Password</label>
                            <input type="password" name="password" id="password" required
                                placeholder="At least 6 characters"
                                value={udata.password} onChange={adddata} />
                        </div>

                        <div className='form_data_x'>
                            <label htmlFor="cpassword" style={{ color: '#fff' }}>Confirm Password</label>
                            <input type="password" name="cpassword" id="cpassword" required
                                placeholder="Enter same password"
                                value={udata.cpassword} onChange={adddata} />
                        </div>

                        <button className='signin_btn_x' type="submit" disabled={loading}>
                            {loading ? "Registering..." : "Continue"}
                        </button>

                        <div className='signin_info'>
                            <p style={{ color: '#fff' }}>Already have an account!</p>
                            <br />
                            <NavLink to="/login" style={{ color: '#fff', fontSize: '18px' }}>
                                Sign In
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default SignUp;
