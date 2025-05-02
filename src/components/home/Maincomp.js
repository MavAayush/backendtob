import React, { useEffect } from 'react'
import Banner from './Banner.js'
import "./home.css";
import Slide from './Slide.js';
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux"


const Maincomp = () => {

    console.log("Maincomp is renderingooooooooooooooooooo...");

    const {products} = useSelector((state) => state.getproductsdata);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Dispatching getProducts...");
        dispatch(getProducts());
    }, [dispatch]);
    

    console.log(products);

    return (
        <div className="home_section">
            <div className="banner_part">
                <Banner />
            </div>
            <Slide title="Our Products" products={products} />
            <div className="center_img">
                <div className="overlay">
                    <h1>Shop Premium Tobacco Products</h1>
                    <p>Browse our extensive selection of premium tobacco products and more. Enjoy a seamless shopping experience from home.</p>
                </div>
            </div>
        </div>
    )
}

export default Maincomp
