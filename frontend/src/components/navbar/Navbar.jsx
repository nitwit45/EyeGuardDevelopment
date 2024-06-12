import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/eyeguard.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Fb from "../../assets/facebook.png";
import Gm from "../../assets/gmail.png";
import X from "../../assets/x.png";
import "./Navbar.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Menu = () => (
  <>
    <p>
      <a href="#home">Home</a>
    </p>
    <p>
      <a href="#possibility">Libraries Used</a>
    </p>
    <p>
      <a href="#wgpt3">About</a>
    </p>
    <p>
      <a href="#features">Contact</a>
    </p>
    <p>
      <a href="#blog">Github</a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState(Cookies.get("username") || "");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(true);
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(
    Cookies.get("rememberMe") === "true"
  );

  useEffect(() => {
    const isEmpty = () => {
      if (username !== "" && password !== "") {
        setEmpty(false);
      }
    };

    isEmpty();
  }, [username, password]);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSignIn = () => {
    Cookies.set("username", username);
    Cookies.set("rememberMe", rememberMe);
    navigate("/dashboard");
  };
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <Button
          style={{
            backgroundColor: "transparent",
            textTransform: "capitalize",
          }}
          onClick={handleOpen}
        >
          Sign in
        </Button>
        <button type="button">Sign Up</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <Menu />
              <div className="gpt3__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <button type="button">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sign In
            </Typography>
            <TextField
              id="username"
              label="Username"
              variant="standard"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember Me"
              sx={{ mt: 2 }}
            />
            <br />
            <div className="model-footer">
              <p>------------------ OR ------------------</p>
            </div>
            <div className="model-img">
              <img src={Fb} style={{width:"30px"}}/>
              <img src={Gm} style={{width:"27px"}}/>
              <img src={X} style={{width:"20px"}}/>
            </div>
            <Button
              variant="contained"
              onClick={handleSignIn}
              disabled={empty}
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
