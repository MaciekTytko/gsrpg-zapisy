import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { useAuthSignIn } from '../Hooks/useAuth';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function UserLogin() {
  const login = useAuthSignIn();
  const navigator = useNavigate();

  const loginToProfile = async(email,password)=>{
    const status = await login(email,password);
    if(status) navigator('/user');
  }

  const formik = useFormik({
    initialValues: {
      email: 'turborozpruwacz@wp.pl',
      password: 'lol123123',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginToProfile(values.email,values.password)
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          sx={{ m: 2 }}
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
          sx={{ m: 2 }}
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
          color="primary"
          variant="contained"
          fullWidth type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default UserLogin;