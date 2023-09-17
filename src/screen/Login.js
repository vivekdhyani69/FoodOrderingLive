import React,{useState} from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "../styles/registerstyle.css";

import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const [message , setMessage]=useState('')
  const [credential, setCredential] = useState({

    email: "",
    password: "", 
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://yazhwin-assignment.vercel.app/api/loginUser", {
      //this is post Api then form ka all data send there
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       
        email: credential.email,
        password: credential.password,
      }), //basically body me vo pass krege jo backend mei bhejna hai
    });
    const data =await response.json(); //ye response backend se aara hai

    if (!data.isSuccess) {
      alert('Enter valid credential');
    } else {//if data aa raha hai then 
      alert("Login Successfully")
      localStorage.setItem("userEmail", credential.email)
      localStorage.setItem("authToken",data.authToken)
console.log(localStorage.getItem("authToken"));
navigate('/')
    }
 
  };
  const onChange = (event) => {
    
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };
    return (
      <>
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border-dark border rounded p-5">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
               
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                  required
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={credential.email}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                  required
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credential.password}
                    onChange={onChange}
                  />
                </div>

                <button type="submit" className="m-3 btn btn-primary">
                 Login
                </button>
                <Link to="/Register" className="m-3 btn btn-danger">
                I'm  a new  user
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
     );
};

export default Login;
