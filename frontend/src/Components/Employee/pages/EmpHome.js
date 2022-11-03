import React, {  useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";


const EmpHome = () => {
  var loginRole = sessionStorage.getItem("loginRole");
  console.log(loginRole);
  return (
    <>
      <Layout>
        <div className="emphome_form_container">
        <div>
          <Stack spacing={10} direction="row" justifyContent="center" alignItems="center">
            <Button style={{height:"250px",width:"250px",fontSize:"18px",borderRadius:"40px"}}
              variant="contained"
              onClick={() => {
                window.location.href = "/userprofile";
              }}
            >
              User Profile
            </Button>

            <Button style={{height:"250px",width:"250px",fontSize:"18px",borderRadius:"40px"}}
              variant="contained"
              onClick={() => {
                window.location.href = "/empregister";
              }}
            >
              User Registration
            </Button>
          </Stack>
        </div>
       
        </div>
      </Layout>
    </>
  );
};

export default EmpHome;
