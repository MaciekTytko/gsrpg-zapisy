import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import { useAuth_signInWithEmailAndPassword } from '../Hooks/useAuth';
import { useNavigate } from "react-router";

const validationSchema = yup.object({
  email: yup
    .string('Wpisz adres email')
    .email('Wpisz poprawny email')
    .required('Email jest wymagany'),
  password: yup
    .string('Wpisz hasło')
    .min(8, 'Hasło musi mieć minimum 8 znaków')
    .required('Hasło jest wymagane'),
});

function UserLoginForm() {
  const infoBar = useContext(InfoBarContext);
  const navigator = useNavigate();
  const [signIn, loading, error] = useAuth_signInWithEmailAndPassword();

  const login = async (values) => {
    const result = await signIn(values.email, values.password);
    result
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można zalogować użytkownika, sprawdź login i hasło' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Zalogowano użytkownika' })
    result && navigator('/user')
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values.email, values.password)
    },
  });


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Typography
          sx={{ m: 2 }}
          variant="h5">
          Zaloguj się
        </Typography>
      </Box>

      <Box>
        {error && <Alert severity="error">Nie można połączyć z bazą danych - sprawdź swoje połączenie</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            sx={{ m: 2 }}
            variant={loading ? "outlined" : "contained"}
            disabled={loading ? true : false}
            fullWidth type="submit">
            {loading ? 'Logowanie...' : 'Login'}
          </Button>
        </form>
      </Box>

    </>
  )
}

export default UserLoginForm;