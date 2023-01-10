import { Box, Paper, Typography, Button, Container, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useAuthSignOut } from "../Hooks/useAuth";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuthChangeUserData } from '../Hooks/useAuth';


const validationSchema = yup.object({
  nickname: yup
    .string('Podaj ksywę')
    .required('Ksywa jest wymagana byśmy mogli się spotkać'),
  contact: yup
    .string('Podaj kontakt do siebie')
    .required('Podaj kontakt do siebie telefon, mail, facebook, discord'),
  picsURL: yup
    .string('Podaj Link do Avatara')
    .url('To nie jest poprawny Link'),
});

function UserProfile() {
  const user = useContext(AuthContext);
  const logout = useAuthSignOut();
  const changeUser = useAuthChangeUserData();

  const formik = useFormik({
    initialValues: {
      nickname: '',
      contact: '',
      picsURL: '',
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
      <Paper sx={{ width: 600, p: 2, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <Typography
            sx={{ m: 2 }}
            variant="h5">
            Twoje dane
          </Typography>
        </Box>

        <Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
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
              margin="dense"
              id="contact"
              name="contact"
              label="Kontakt"
              value={formik.values.contact}
              onChange={formik.handleChange}
              error={formik.touched.contact && Boolean(formik.errors.contact)}
              helperText={formik.touched.contact && formik.errors.contact}
            />
            <TextField
              fullWidth
              margin="dense"
              id="picsURL"
              name="picsURL"
              label="Link do avatara"
              value={formik.values.picsURL}
              onChange={formik.handleChange}
              error={formik.touched.picsURL && Boolean(formik.errors.picsURL)}
              helperText={formik.touched.picsURL && formik.errors.picsURL}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth type="submit">
              Zapisz
            </Button>
          </form>
        </Box>

      </Paper>
    </Container >
  )
}

export default UserProfile;