import React, { useState } from "react";
import axios from "axios";
import "../components/css/logincss.css";
import Logo from "../components/Images/iou.png";

const Reset = () => {
  const [inputs, setInputs] = useState({
    email: "",
    // empPwd: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputs.email === "") {
      alert("Employee ID should not be empty");
    // } else if (inputs.empPwd === "") {
    //   alert("Password should not be empty");
    } 
    else {
      axios
        .post(`http://localhost:8400/reset-password/${inputs.email}`)
        .then((res) => {     
        alert("Check Your Mail!");
        window.location.href="/"
        
        });
    }
  };

  return (
    <div>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left">
            <form className="form_container">
              <h1>Get Your Account Back</h1>
          
                 <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={inputs.email || ""}
                required
                className="input"
              />
           
            </form>

            <button
              type="button"
              className="signin_btn"
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Reset
            </button>

            <a href="/">
              <h4 style={{fontSize:"15px"}}>Login Page</h4>
            </a>
          </div>
          <div className="right">
            <h1>IOU Payroll System</h1>
            <div className="logo">
              <img src={Logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
