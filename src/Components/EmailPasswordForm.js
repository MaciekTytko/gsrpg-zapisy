import {  Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';

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

function EmailPasswordForm(props) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.submit(values);
    },
  });

  return (
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
        variant={props.loading ? "outlined" : "contained"}
        disabled={props.loading ? true : false}
        fullWidth type="submit">
        {props.loading ? <CircularProgress/> : `${props.buttonText}`}
      </Button>
    </form>
  )
}

export default EmailPasswordForm;