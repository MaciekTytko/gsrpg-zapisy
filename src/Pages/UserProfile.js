import { Box, Paper, Typography, Button, Container, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useAuthSignOut } from "../Hooks/useAuth";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuthSignIn, useAuthChangeUserData } from '../Hooks/useAuth';


const validationSchema = yup.object({
  nickname: yup
    .string('Enter your email')
    .required('Email is required'),
  role: yup
    .string('Enter your password')
    .required('Password is required'),
});

function UserProfile() {
  const user = useContext(AuthContext);
  const logout = useAuthSignOut();
  const changeUser = useAuthChangeUserData();

  const formik = useFormik({
    initialValues: {
      nickname: 'Turbo',
      role: 'admin',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //
      console.log(values, user);
      changeUser(values);
    },
  });


  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Profil użytkownika
      </Typography>
      <Box sx={{ width: 600, display: 'flex', justifyContent: 'right' }}>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => navigator('events')}
        >Przejdź do listy wydarzeń</Button>
      </Box>
      <Paper sx={{ width: 600, p: 2, m: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <Typography
            sx={{ m: 2 }}
            variant="h5">
            Twoje konto
          </Typography>
        </Box>
        <Grid sx={{ mb: 2, }} container spacing={2}>
          <Grid item xs={8}>
            <Paper sx={{
              mr: 2, pl: 2, pr: 2, height: '100%', minWidth: 200,
              display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
            }}>
              <Typography>{user.email}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">
              zmień email
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ mb: 2, }} container spacing={2}>
          <Grid item xs={8}>
            <Paper sx={{
              mr: 2, pl: 2, pr: 2, height: '100%', minWidth: 200,
              display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
            }}>
              <Typography># # # # # # # #</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">
              zmień hasło
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ width: 600, p: 2, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <Typography
            sx={{ m: 2 }}
            variant="h5">
            Twoje dane
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            sx={{ m: 2 }}
            id="nickname"
            name="nickname"
            label="Ksywa"
            value={formik.values.nickname}
            onChange={formik.handleChange}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            helperText={formik.touched.nickname && formik.errors.nickname}
          />
          <TextField
            fullWidth
            sx={{ m: 2 }}
            id="role"
            name="role"
            label="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          />
          <Button
            sx={{ m: 2 }}
            color="primary"
            variant="contained"
            fullWidth type="submit">
            Zapisz
          </Button>
        </form>

      </Paper>

      <Button variant="contained" onClick={logout}>Wyloguj</Button>
    </Container>
  )
}

export default UserProfile;