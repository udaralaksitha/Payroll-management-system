import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Styles from "./Styles";
import Logo from "./Images/iou.png";
import "./css/indexEmp.css";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import axios from "axios";
import { Stack } from "@mui/system";
import { Buffer } from "buffer";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const Layout = ({ children }) => {
  var id = localStorage.getItem("logID");
  const [user, setUser] = useState([]);

  const [role, setRole] = useState("");

  const empData = () => {
    axios
      .get(`http://localhost:8400/employee/get/details/${id}`)
      .then((res) => {
        setUser(res.data.existingEmployee[0]);
      });
  };

  axios
    .get(`http://localhost:8400/department/details/show/${id}`)
    .then((res) => {
      if (res.data === 1) {
        axios.get(`http://localhost:8400/department/show/${id}`).then((res) => {
          setRole(res.data.existingDepartment.jobrole);
        });
      }
    });

  useEffect(() => {
    empData();
  }, []);

  var loginRole = role;
  sessionStorage.setItem("loginRole", loginRole);

  let buffer = "";
  let base64String = "";
  let mimetype = "";

  if (user.profilePic) {
    buffer = user.profilePic.data;
    base64String = Buffer.from(buffer).toString("base64");
    mimetype = user.profilePic.contentType;
  }

  const classes = Styles();
  return (
    <>
      <AppBar className={classes.appbar} sx={{ alignItems: "flex-end" }}>
        <Stack alignItems="center">
          <Avatar
            sx={{ width: 25, height: 25 }}
            src={`data:${mimetype};base64, ${base64String}`}
          />

          <Typography sx={{ color: "black" }}>{user.empName}</Typography>
        </Stack>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className="logo">
          <img width="100px" height="50px" src={Logo} />
        </div>
        <List>
          <ListItem
            button
            className={
              window.location.pathname === "/employees" ? classes.active : null
            }
            onClick={() => {
              window.location.pathname = "/employees";
            }}
          >
            <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>

          {loginRole === "Manager" ? (
            <ListItem
              button
              className={
                window.location.pathname === "/admindashde"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/empDash";
              }}
            >
              <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Shift Scheduling" />
            </ListItem>
          ) : (
            <ListItem
              button
              className={
                window.location.pathname === "/manshiftdash "
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/empleave";
              }}
            >
              <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Shift Scheduling" />
            </ListItem>
          )}

          {loginRole === "Manager" ? (
            <ListItem
              button
              className={
                window.location.pathname === "/manemptimesheet "
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/emptimesheet";
              }}
            >
              <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
                <WatchLaterIcon />
              </ListItemIcon>
              <ListItemText primary="Time sheets" />
            </ListItem>
          ) : (
            <ListItem
              button
              className={
                window.location.pathname === "/employees"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/employees";
              }}
            >
              <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
                <WatchLaterIcon />
              </ListItemIcon>
              <ListItemText primary="Time sheets" />
            </ListItem>
          )}

          {loginRole === "Manager" ? (
            <ListItem
              button
              className={
                window.location.pathname === "/employees"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/employees";
              }}
            >
              <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primary="Salary" />
            </ListItem>
          ) : (
            <ListItem
              button
              className={
                window.location.pathname === "/employees"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/employees";
              }}
            >
              <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primary="Salary" />
            </ListItem>
          )}

          {loginRole === "Manager" ? (
            <ListItem
              button
              className={
                window.location.pathname === "/employees"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/employees";
              }}
            >
              <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
                <DataThresholdingIcon />
              </ListItemIcon>
              <ListItemText primary="Project Budgeting" />
            </ListItem>
          ) : null}

          <ListItem
            button
            onClick={() => {
              window.location.pathname = "/";
            }}
            style={{ marginTop: "100px" }}
          >
            <ListItemIcon style={{ color: "white", fontSize: "5px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Footer>
          <Box></Box>
        </Footer>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.children}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
