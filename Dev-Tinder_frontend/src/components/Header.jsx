import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import { removeUser } from '../utils/userSlice';
import axios from 'axios';

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    { name: "Profile", path: "/profile" },
    { name: "About", path: "/about" },
    { name: "Connections", path: "/connections" },
    { name: "Requests", path: "/requests" }
  ];

  const handleLogout = async () => {
    try {

      await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true
        }
      );

      dispatch(removeUser());

      navigate("/login");

    } catch (error) {
      console.error(error);
    }
  };

  const settings = [
    {
      name: "Logout",
      action: handleLogout
    }
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
      
      <Container maxWidth="xl">

        <Toolbar disableGutters className="flex justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center">

            <AdbIcon
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1
              }}
            />

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: 700,
                letterSpacing: ".2rem",
                fontFamily: "monospace",
                display: { xs: 'none', md: 'flex' }
              }}
            >
              DevTinder
            </Typography>

            {/* MOBILE MENU */}
            {user && (
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  ml: 1
                }}
              >
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      component={Link}
                      to={page.path}
                      onClick={handleCloseNavMenu}
                    >
                      {page.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}

          </div>

          {/* MOBILE LOGO */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              textDecoration: "none",
              color: "white",
              fontWeight: 700,
              fontFamily: "monospace",
              letterSpacing: ".2rem"
            }}
          >
            DevTinder
          </Typography>

          {/* CENTER NAV LINKS */}
          {user && (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                flexGrow: 1,
                justifyContent: "center"
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "15px",
                    fontWeight: 500
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          {/* RIGHT SIDE */}
          {user && (
            <div className="flex items-center gap-4">

              <Typography
                variant="body1"
                sx={{
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Welcome, {user.firstName}
              </Typography>

              <Box>

                <Tooltip title="Open settings">

                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt={user.firstName}
                      src={user.photoURL}
                    />
                  </IconButton>

                </Tooltip>

                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => {
                        handleCloseUserMenu();
                        setting.action();
                      }}
                    >
                      {setting.name}
                    </MenuItem>
                  ))}
                </Menu>

              </Box>

            </div>
          )}

        </Toolbar>

      </Container>

    </AppBar>
  );
}

export default Header;