import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Styles from "./SidebarStyle";
import Logo from "./images/iou.png";
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

const Sidebar = ({ children }) => {
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
  var loginName = user.empName;
  sessionStorage.setItem("loginRole", loginRole);
   sessionStorage.setItem("loginName", loginName);

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
      <AppBar  className={classes.appbar} sx={{ alignItems: "flex-end" }}>
        <Stack alignItems="center">
          <Avatar
            sx={{ width: 30, height: 30, marginLeft:"5px" }}
            src={`data:${mimetype};base64, ${base64String}`}
          />

          <Typography sx={{ color: "#040528",fontSize:"13px",fontFamily:"Verdana" }}>{user.empName}</Typography>
        </Stack>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className="logo">
          <img width="80px" height="40px"  src={Logo} />
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
            <ListItemIcon style={{ color: "white",marginTop:"10px",paddingBottom:"10px" }}>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{fontSize:"13px",marginLeft:"-25px",marginTop:"10px",paddingBottom:"10px"}} primary="Employees" />
          </ListItem>

          {loginRole === "Manager" ? (
            <ListItem
              button
              className={
                window.location.pathname === "/manshiftdash"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/manshiftdash";
              }}
            >
              <ListItemIcon style={{ color: "white" ,marginTop:"0px",paddingBottom:"10px"}}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:"13px", marginLeft:"-25px",marginTop:"0px",paddingBottom:"10px"}} primary="Shift Scheduling" />
            </ListItem>
          ) : (
            <ListItem
              button
              className={
                window.location.pathname === "/empshiftdash "
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/empshiftdash";
              }}
            >
              <ListItemIcon style={{ color: "white",marginTop:"0px",paddingBottom:"10px"}}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:"13px",marginLeft:"-25px",marginTop:"0px",paddingBottom:"10px"}} primary="Shift Scheduling" />
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
                window.location.pathname = "/manemptimesheet";
              }}
            >
              <ListItemIcon style={{ color: "white",marginTop:"0px",paddingBottom:"10px"}}>
                <WatchLaterIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:"13px",marginLeft:"-25px",marginTop:"0px",paddingBottom:"10px"}} primary="Time sheets" />
            </ListItem>
          ) : (
            <ListItem
              button
              className={
                window.location.pathname === "/emptimesheetdash"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/emptimesheetdash";
              }}
            >
              <ListItemIcon style={{ color: "white",marginTop:"0px",paddingBottom:"10px"}}>
                <WatchLaterIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:"13px",marginLeft:"-25px",marginTop:"0px",paddingBottom:"10px"}} primary="Time sheets" />
            </ListItem>
          )}

          {loginRole === "Manager" ? (
            <ListItem
              button
              className={
                window.location.pathname === "/AdmindashDe"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/AdmindashDe";
              }}
            >
              <ListItemIcon style={{ color: "white",marginTop:"0px",paddingBottom:"10px"}}>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:"13px",marginLeft:"-25px",marginTop:"0px",paddingBottom:"10px"}} primary="Salary" />
            </ListItem>
          ) : (
            <ListItem
              button
              className={
                window.location.pathname === "/empWelcome"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/empWelcome";
              }}
            >
              <ListItemIcon style={{ color: "white",marginTop:"0px",paddingBottom:"10px"}}>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:"13px",marginLeft:"-25px",marginTop:"0px",paddingBottom:"10px"}} primary="Salary" />
            </ListItem>
          )}

          {loginRole === "Manager" ? (
            <ListItem
              button style={{marginTop:"15px",paddingBottom:"0px",paddingTop:"0px"}}
              className={
                window.location.pathname === "/phome"
                  ? classes.active
                  : null
              }
              onClick={() => {
                window.location.pathname = "/phome";
              }}
            >
              <ListItemIcon style={{ color: "white",marginTop:"0px",paddingBottom:"10px"}}>
                <DataThresholdingIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:"12px",marginLeft:"-25px",paddingTop:"0px",paddingBottom:"10px"}} primary="Project Budgeting" />
            </ListItem>
          ) : null}

          <ListItem
            button
            onClick={() => {
              window.location.pathname = "/";
            }}
            style={{ marginTop: "20px",marginTop:"10px" }}
          >
            <ListItemIcon style={{ color: "white",marginTop:"0px",paddingBottom:"10px"}}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{fontSize:"13px",marginLeft:"-25px",marginTop:"0px",paddingBottom:"10px"}} primary="Logout" />
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

export default Sidebar;