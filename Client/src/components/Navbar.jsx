import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { UserContext } from "../store/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import style from "../Pages/Home/Home.module.css";
import zIndex from "@mui/material/styles/zIndex";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrollPosition(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{
        width: 250,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        height: "100%",
        }}
    >
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/exoplanet-quiz">
          <ListItemText primary="Quiz" />
        </ListItem>
        <ListItem button component={Link} to="/blogs">
          <ListItemText primary="Blogs" />
        </ListItem>
        {user?.role === "admin" && (
          <ListItem button component={Link} to="/create-post">
            <ListItemText primary="Create Post" />
          </ListItem>
        )}
        {user?.role === "admin" && (
          <ListItem button component={Link} to="/add-quiz">
            <ListItemText primary="Add Question" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/chatbot">
          <ListItemText primary="Chatbot" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { xs: "100%", md: "100%", lg: "100%" },
          margin: "0 auto",
          padding: "10px",
          backgroundColor: scrollPosition
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 1)",
          backdropFilter: scrollPosition ? "blur(8px)" : "none",
          borderBottom: scrollPosition
            ? "none"
            : "1px solid rgba(255, 255, 255, 0.3)",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
          boxShadow: scrollPosition
            ? "0px 4px 20px rgba(0, 0, 0, 0.1)"
            : "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            Ex
            <img
              className={style.spinAnimation}
              src="/saturn.png"
              alt="Saturn Logo"
              style={{ height: "25px" }}
            />
            Planetarium
          </Typography>

          <div className="hidden md:flex gap-4">
            <Button
              color="inherit"
              component={Link}
              to="/home"
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
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
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
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
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              Blogs
            </Button>
           {user?.role === "admin" && (
             <Button
             color="inherit"
             component={Link}
             to="/create-post"
             sx={{
               color: "white",
               "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
             }}
           >
             Create Post
           </Button>
           )}
           {user?.role === "admin" && (
             <Button
             color="inherit"
             component={Link}
             to="/add-quiz"
             sx={{
               color: "white",
               "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
             }}
           >
             Add Question
           </Button>
           )}
            <Button
              color="inherit"
              component={Link}
              to="/chatbot"
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              Chatbot
            </Button>
          </div>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { xs: "block", md: "none" },
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            marginTop: "64px",
            width: "120px",
          },
        }}
      >
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Navbar;
