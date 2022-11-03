import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../components/css/logincss.css";
import Logo from "../components/Images/iou.png";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");

  const { token } = useParams();

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === "") {
      alert("Password should not be empty");
    } else {
      axios
        .post(`http://localhost:8400/new-password/${password}/${token}`)
        .then((res) => {
          alert("Password Updated Successfully!");
          window.location.href = "/";
        });
    }
  };

  return (
    <div>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left">
            <form className="form_container">
              <h1>Enter New Password</h1>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={password || ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
              Update Password
            </button>
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

export default ForgotPassword;
