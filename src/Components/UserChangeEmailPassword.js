import { Box, Paper, Typography, Button, Container, TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useAuthSignOut } from "../Hooks/useAuth";
import { useAuthChangeUserData } from '../Hooks/useAuth';
import UserDataForm from "../Components/UserDataForm";



function UserChangeEmailPassword() {
  return (

    <Paper sx={{ width: 600, p: 2, m: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Typography
          sx={{ m: 2 }}
          variant="h5">
          Twoje konto
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <TextField
          fullWidth
          sx={{ m: 1 }}
          id="nickname"
          name="nickname"
          label="Email"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          error={formik.touched.nickname && Boolean(formik.errors.nickname)}
          helperText={formik.touched.nickname && formik.errors.nickname}
        />
        <Button
          sx={{ m: 1 }}
          variant="contained"
          onClick={() => { }}
        >Zmień</Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <TextField
          fullWidth
          sx={{ m: 1 }}
          id="password"
          name="password"
          label="Hasło"
          type="password"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          error={formik.touched.nickname && Boolean(formik.errors.nickname)}
          helperText={formik.touched.nickname && formik.errors.nickname}
        />
        <Button
          sx={{ m: 1 }}
          variant="contained"
          onClick={() => { }}
        >Zmień</Button>
      </Box>
    </Paper>


  )
}

export default UserChangeEmailPassword;