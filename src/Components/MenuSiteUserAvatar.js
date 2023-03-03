import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import { useAuth_signOut } from "../Hooks/useAuth";

function MenuSiteUserAvatar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {user} = useContext(AuthContext);
  const [logout] = useAuth_signOut();
  const navigator = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToProfile = () => {
    navigator('/user');
    handleCloseUserMenu();
  }

  const logoutClick = () => {
    logout();
    navigator('/');
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={user?.displayName || ""} src={user?.photoURL || ""} />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="profile" onClick={goToProfile}>
          <Typography textAlign="center">Profil</Typography>
        </MenuItem>
        <MenuItem key="logout" onClick={logoutClick}>
          <Typography textAlign="center">Wyloguj</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default MenuSiteUserAvatar;