import React,{ useState, useEffect } from 'react';
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Avatar } from "@mui/material";
import ProfileUpload from "../components/ProfileUpload";
import { Buffer } from "buffer";



const ProfileUpdate = () => {
const location = useLocation();
const user = location.state.user;

  let buffer = "";
  let base64String = "";
  let mimetype = "";
    console.log(user)
  if(user.profilePic) {
    buffer = user.profilePic.data;
    base64String = Buffer.from(buffer).toString("base64");
    mimetype = user.profilePic.contentType;
  }

  const [uploadedProfilePath, setUploadedProfilePath] = useState("");


  const [inputs, setInputs] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);
        axios
          .patch(`http://localhost:8400/employee/edit/profile/${user._id}`, inputs)
          .then((res) => {
            console.log(res.data);
            alert("Updated successfully");
            window.location.reload();
          })
          .catch(function (error) {
            alert("Please try again!!!");
            console.log(error);
          });
      }
  return (
    <div>
      <div className='profile_container'>
      <div className="profilepic_form_container">
        <div>
          <Stack spacing={10} direction="row" justifyContent="center" alignItems="center">
              <Avatar
                  sx={{ width: 200, height: 200,marginLeft:"100px"}}
                   src={`data:${mimetype};base64, ${base64String}`}
                />
      
              <ProfileUpload  setUploadedProfilePath={setUploadedProfilePath}
                setInputs={setInputs}
               />
                    <Button
                      style={{
                        backgroundColor: "#040528",
                        borderRadius: "20px",
                        width: "300px",
                        marginRight:"25px"
                      }}
                      onClick={onSubmit}
                      variant="contained"
                    >
                      Update
                    </Button>
          </Stack>
        </div>
        </div>

      </div>
        <Button
              sx={{ color: "black" }}
              onClick={() => {
                window.location.href = "/userprofile";
              }}
            >
              <ArrowLeftIcon sx={{ height: "50px", width: "50px" }} />{" "}
              <b>User Profile</b>
            </Button>
    </div>
  )
}

export default ProfileUpdate
