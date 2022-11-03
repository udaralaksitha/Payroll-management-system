import { makeStyles } from "@mui/styles";

const drawerWidth = "12%";

const SidebarStyle = makeStyles(() => {
  return {
 

    drawerPaper: {
      width: drawerWidth,
      padding: "30px 0px",
      color: "white !important",
      backgroundColor: "#040528 !important",
  
    },

   

    appbar: {
      width: `calc(100% - ${drawerWidth}) !important`,
      maxHeight: "54px",
      padding: "5px 25px",
      backgroundColor: "white !important",
      position: "fixed",
    },
   
  };
});

export default SidebarStyle;
