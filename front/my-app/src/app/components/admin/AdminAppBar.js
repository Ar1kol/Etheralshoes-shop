import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectExpirationTime,
  doLogout,
} from "../../Slices/userSlice";
import Logo from "../../assets/ethereal-shoes-logo.svg";
//Mui import
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const AdminAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const exp = useSelector(selectExpirationTime);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pages = ["products", "orders", "users"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navMenu = (page) => {
    navigate(`admin/${page}`);
    handleCloseNavMenu();
  };

  useEffect(() => {
    if (token && exp) {
      if (new Date().getTime() > +exp * 1000) {
        dispatch(doLogout());
      }
    }
  });

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link style={{ color: "white" }} to="/">
                <img
                  src={Logo}
                  width={150}
                  height={100}
                  alt="ethereal shoes logo"
                ></img>
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => navMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
              }}
            >
              <Link style={{ color: "white" }} to="/">
                <img
                  src={Logo}
                  width={150}
                  height={100}
                  alt="ethereal shoes logo"
                ></img>
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Typography variant="h6">{page}</Typography>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default AdminAppBar;
