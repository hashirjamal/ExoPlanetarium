import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import style from "../Pages/Home/Home.module.css";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrollPosition(true);
      } else {
        setScrollPosition(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "15px",
        backgroundColor: scrollPosition
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 1)",
        backdropFilter: scrollPosition ? "blur(8px)" : "none",
        border: scrollPosition ? "none" : "",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
        boxShadow: scrollPosition ? "0px 4px 20px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Ex
          <img className={style.spinAnimation} src="../../public/saturn.png" />
          Planetarium
        </Typography>
        <div className="flex flex-row gap-20">
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/exoplanet-quiz"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            Quiz
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/blogs"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            Blogs
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/chatbot"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            Chatbot
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
