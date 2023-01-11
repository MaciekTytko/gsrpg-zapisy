import { Box, Paper, Typography, Button, Container, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { useAuthSignOut, useAuthChangeUserData } from "../Hooks/useAuth";
import { useFormik } from 'formik';
import * as yup from 'yup';

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

function UserDataForm(){

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


  return(
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
  )
}

export default UserDataForm;