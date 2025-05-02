import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./banner.css";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="banner-slider"   style={{
      backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSme198rpcv9sLYHcusEQ9j_7IkochXv4lT_Q&s)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>

      <Slider {...settings}>
        <div className="banner-slide1">
          <div className="banner-content">
            <h2>Our Rich Heritage</h2>
            <p>
              Each product is a reflection of our commitment to authenticity and quality.<br />
              Keshri Tobacco — where heritage meets quality, and tradition lives on.
            </p>
          </div>
        </div>

        <div className="banner-slide2"  style={{
    backgroundImage: 'url("/images/card2.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  }} >
          <div className="banner-content"  >
            <h2>Your Destination for Premium Tobacco</h2>
            <p> From carefully sourced leaves to masterful processing techniques.<br />
              Keshri Tobacco stands as a destination for those who seek elegance in every experience.
            </p>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default Banner




















// import React from 'react'
// import Slider from "react-slick";
// import "./banner.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Banner = () => {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true, 
//     autoplaySpeed: 2000,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };
//   return (
//     <div className="banner-slider">
//       <Slider {...settings}>
//         <div className="banner-slide1">
//           <div className="banner-content1">
//             <h1>Our Rich Heritage</h1>
//             <p>Founded in 1927 by our ancestors, Tabcoo has a proud legacy in the tobacco industry. Over the decades, we have transformed from a traditional business into a modern ecommerce platform, adapting to the evolving market while maintaining our core values. Our commitment to quality and customer satisfaction remains unwavering, ensuring that we deliver only the best products to our customers. As we continue to innovate, we honor our history and strive to provide a seamless shopping experience that reflects our long-standing dedication to excellence.</p>
//           </div>
//         </div>

//         <div className="banner-slide2">
//           <div className="banner-content2">
//             <h1>Your Destination for Premium Tobacco</h1>
//             <p>Welcome to Keshri Tabcoo, your premium online destination for the finest tobacco products. Explore our curated selection of tobacco and accessories, all designed to enhance your experience</p>
//           </div>
//         </div>
//       </Slider>
//     </div>
//   )
// }

// export default Banner
