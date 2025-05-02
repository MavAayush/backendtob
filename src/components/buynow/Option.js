import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Option = ({ deletedata, get, item, onQuantityChange }) => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  // Handle quantity change
  const handleSelect = (e) => {
    const newQty = parseInt(e.target.value);
    onQuantityChange(item.id, newQty);
  };

  // Delete item from cart
  const removedata = async (req,res) => {
    try {
      const res = await fetch(`/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 400 || !data) {
        console.log("error");
      } else {
        console.log("Data Deleted");
        setAccount(data);
        toast.success("Removed From Cart", {
          position: "top-center",
          icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>,
          style: { background: "#fff", color: "#000" },
          progressStyle: { background: "#D7A86E" }
        });
        get();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className='add_remove_select'>
      <select value={item.quantity} onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}>
        {[1, 2, 3, 4].map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <p style={{ cursor: "pointer" }} onClick={removedata}>Delete</p><span>|</span>
      <p className='forremovemedia' style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}> Save For Later</p><span>|</span>
      <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>See More</p>
    </div>
  );
};

export default Option;

















// const Option = ({ deletedata, get }) => {

//   const { account, setAccount } = useContext(LoginContext);
//   const navigate = useNavigate();

//   const removedata = async (req, res) => {
//     try {
//       const res = await fetch(`/remove/${deletedata}`, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           "Content-type": "application/json"
//         },
//         credentials: "include"
//       });

//       const data = await res.json();
//       console.log(data);

//       if (res.status === 400 || !data) {
//         console.log("error");
//       } else {
//         console.log("data deleted");
//         setAccount(data);
//         toast.success("Removed From Cart", {
//           position: "top-center",
//           icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>, // custom icon with color
//           style: {
//               background: "#fff",
//               color: "#000",
//           },
//           progressStyle: {
//               background: "#D7A86E",
//           },
//       });
//         get();
//       }

//     } catch (error) {
//       console.log("error");
//     }
//   }


//   return (
//     <div className='add_remove_select '>
//       <select>
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//       </select>
//       <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>Delete</p><span>|</span>
//       <p className='forremovemedia' style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}> Save For Later</p><span>|</span>
//       <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>See more like this</p>
//       {/* <ToastContainer /> */}
//     </div>
//   )
// }

// export default Option


