import React ,{useState} from "react";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge"
import { useNavigate } from "react-router-dom";
import Cart from "../screen/Cart";
import Modal from "../screen/Modal";
import { useCart } from "./ComponentReducer";
function Navbar() {
let data = useCart();
  const [cartView,setCartView]= useState(false);//modal view dikhega 
  const navigate = useNavigate();

  const handleLogOut=() => {
localStorage.removeItem("authToken");
navigate("/login");

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
  {
    (localStorage.getItem("authToken")) ? 
    <li className="nav-item active">
    <Link className="nav-link active fs-5" to="/myOrder">
      My order(User Order History)
    </Link>
  </li> :""
  }
          
          </ul>
{///if we have no any authToken in localStorage then login and signup button is visible
(!localStorage.getItem("authToken")) ?
<div className="d-flex">
<Link className="btn bg-white text-success mx-1" to="./Login">
  Login
</Link>

<Link className="btn bg-white text-success mx-1" to="./Register">
  Register
</Link>
</div>
 : 
 <div>
  {/* //jesa he yahaa click krege onClick true then model khul jayega */}
<div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
  My Cart {" "}
  <Badge pill bg="danger" >{data?.length}</Badge>
</div>  
{/* ///and yaha model false closed   */}
{cartView ? <Modal onClose={()=>{
  setCartView(false)
}}><Cart/></Modal> : null}

<div className="btn bg-white text-danger mx-2" onClick={handleLogOut} >
  Logout
</div>


</div>
}
       </div>
      </nav>
    </div>
  );
}

export default Navbar;
