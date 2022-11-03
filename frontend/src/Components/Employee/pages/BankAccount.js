import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import axios from "axios";
import Layout from "../components/Layout";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useLocation } from "react-router-dom";

const BankAccount = () => {
  const location = useLocation();
  const id = location.state.id;
  const [inputs, setInputs] = useState({
    accNum: "",
    bankName: "",
    branch: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    inputs.empid = id;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputs.accNum === "") {
      alert("Account Number should not be empty");
    } else if (inputs.bankName === "") {
      alert("Bank Name should not be empty");
    } else if (inputs.branch === "") {
      alert("Bank Branch should not be empty");
    } else {
      axios
        .post("http://localhost:8400/employeebank/add", inputs)
        .then((res) => {
          alert("Added Successfully!!!");
          window.location.href = "/userprofile";
        })
        .catch(function (error) {
          if (inputs.accNum.type !== Number) {
            alert("Invalid type of account number");
          } else {
            alert("Duplicate value! Try with New Entry");
          }
        });
    }
  };

  return (
    <>
      <Layout>
        <div>
          <h1>Bank Account</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#040528",
                padding: "45px",
                borderRadius: "25px",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "15px",
                marginRight: "85px",
              }}
            >
              <form>
                <Stack direction="column" spacing={4}>
                  <Stack direction="row" spacing={11}>
                    <label className="label-editbank">Employee ID</label>{" "}
                    <input
                      id="textbox"
                      type="text"
                      name="empid"
                      value={inputs.empid || id}
                      readOnly
                    />
                  </Stack>

                  <Stack direction="row" spacing={7.2}>
                    <label className="label-editbank">Account Number</label>
                    <input
                      id="textbox"
                      type="text"
                      name="accNum"
                      value={inputs.accNum || ""}
                      onChange={handleChange}
                    />
                  </Stack>

                  <Stack direction="row" spacing={11.5}>
                    <label className="label-editbank">Bank Name</label>
                    <input
                      id="textbox"
                      type="text"
                      name="bankName"
                      value={inputs.bankName || ""}
                      onChange={handleChange}
                    />
                  </Stack>

                  <Stack direction="row" spacing={10.5}>
                    <label className="label-editbank">Bank Branch</label>
                    <input
                      id="textbox"
                      type="text"
                      name="branch"
                      value={inputs.branch || ""}
                      onChange={handleChange}
                    />
                  </Stack>
                </Stack>
              </form>
            </div>
          </div>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            marginRight="120px"
          >
            <Button
              sx={{ color: "black" }}
              onClick={() => {
                window.location.href = "/userprofile";
              }}
            >
              <ArrowLeftIcon sx={{ height: "50px", width: "50px" }} />
              <b>User Profile</b>
            </Button>
            <Button
              style={{
                color: "white",
                backgroundColor: "#040528",
                borderRadius: 15,
                width: "120px",
              }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Stack>
        </div>
      </Layout>
    </>
  );
};

export default BankAccount;
