import React from "react";import { Link, useNavigate } from "react-router-dom";
import { Button, message, Checkbox, Form, Input } from "antd";
import "../styles/registerstyle.css";

import { useState } from "react";
const Register = () => {
  const navigate=useNavigate();
  const [message , setMessage]=useState('')
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "", 
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://yazhwin-assignment.vercel.app/api/createuser", {
      //this is post Api then form ka all data send there
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      }), //basically body me vo pass krege jo backend mei bhejna hai
    });
    const data =await response.json(); //ye response backend se aara hai

    if (data.isDuplicate) {
      setMessage('Duplicate value is not allowed');
      alert('Duplicate email is not allowed');
    } else {
      setMessage('Email submitted successfully');
      alert("Registered Successfully")
      navigate('/login')
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
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    id="username"
                    name="name"
                    value={credential.name}
                    onChange={onChange}
                  />
                </div>
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
                  Register
                </button>
                <Link to="/login" className="m-3 btn btn-danger">
                  Already! Signup
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
