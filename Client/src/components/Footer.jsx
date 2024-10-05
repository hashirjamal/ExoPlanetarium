import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../public/saturn.png";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent:"center",
          gap:"20px",
          padding: "20px",
          backgroundColor: "rgb(15, 23, 42)",
          color: "white",
          marginTop: "auto",
          height:"34vh"
        }}
      >
        <img
          src={logo}
          alt="Exoplanetarium Logo"
          style={{ width: "50px", marginBottom: "10px" }}
        />
        <Typography variant="body1" sx={{ marginBottom: "5px" }}>
          All rights reserved
        </Typography>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} by Bro Code
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
