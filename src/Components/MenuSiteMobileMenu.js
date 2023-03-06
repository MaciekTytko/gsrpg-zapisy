import { IconButton, Menu, MenuItem,  Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';


export default function MenuSiteMobileMenu(props) {
  const navigator = useNavigate();
  const { user } = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const linkTo = path => {
    handleCloseNavMenu();
    navigator(path);
  };

  return (
    <>
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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuItem key="main" onClick={() => linkTo('/')}>
          <Typography textAlign="center">Strona główna</Typography>
        </MenuItem>
        <MenuItem key="events" onClick={() => linkTo('/events')}>
          <Typography textAlign="center">Wydarzenia</Typography>
        </MenuItem>

        {user
          ? <MenuItem key="profil" onClick={() => linkTo('/user')}>
            <Typography textAlign="center">Profil</Typography>
          </MenuItem>
          : <MenuItem key="Zaloguj" onClick={() => linkTo('/login')}>
            <Typography textAlign="center">Zaloguj</Typography>
          </MenuItem>
        }
      </Menu>
    </>
  )
}