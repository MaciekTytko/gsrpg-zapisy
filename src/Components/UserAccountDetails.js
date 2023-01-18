import { Box, Typography, } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import UserChangeEmail from "./UserChangeEmail";
import UserChangePassword from "./UserChangePassword";
import UserDeleteAccount from "./UserDeleteAccount";



function UserAccountDetails() {
  const {user} = useContext(AuthContext);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Typography
          sx={{ m: 2 }}
          variant="h5">
          Twoje konto
        </Typography>
      </Box>
      {user.providerId === "firebase" && <>
        <UserChangeEmail />
        <UserChangePassword />
        <UserDeleteAccount />
      </>}
    </>
  )
}

export default UserAccountDetails;