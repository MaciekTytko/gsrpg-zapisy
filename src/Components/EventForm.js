import { Box, Button, Card, CardMedia, Checkbox, CircularProgress, FormControlLabel, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as yup from 'yup';
import PropTypes from 'prop-types'

const validationSchema = yup.object({
  title: yup
    .string('Wpisz Tytuł wydarzenia')
    .min(5, 'Postaraj się wpisać dłuższy tytuł')
    .max(50, 'Nie przekraczaj 50 znaków')
    .required('Tytuł jest wymagany'),
  date: yup
    .string('Wpisz datę wydarzenia')
    .min(5, 'Wybierz datę wydarzenia')
    .nullable(true)
    .required('Data jest wymagana'),
  picsURL: yup
    .string('Podaj Link do obrazka')
    .url('To nie jest poprawny Link'),
  desc: yup
    .string('Wpisz opis wydarzenia')
    .min(10, 'Postaraj się wpisać dłuższy opis')
    .max(5000, 'Nie przekraczaj 500 znaków')
    .required('Opis wydarzenia jest wymagany'),
  allowRegister: yup
    .boolean('Podaj opis wydarzenia'),
});

function EventForm(props) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.submit(values);
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Tytuł"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <DateTimePicker
          ampm={false}
          inputFormat="DD/MM/YYYY HH:mm"
          label="Data wydarzenia"
          value={formik.values.date}
          onChange={value => formik.setFieldValue('date', JSON.parse(JSON.stringify(value)), true)}
          renderInput={(params) => <TextField
            fullWidth
            margin="dense"
            id="date"
            name="date"
            {...params}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Card sx={{ mr: 1, maxWidth: 100, display: (formik.values.picsURL && !Boolean(formik.errors.picsURL) ? 'block' : 'none') }}>
            <CardMedia
              component="img"
              image={formik.values.picsURL}
              alt="Podgląd obrazka"
            />
          </Card>
          <TextField
            fullWidth
            margin="dense"
            id="picsURL"
            name="picsURL"
            label="Link do obrazka"
            value={formik.values.picsURL}
            onChange={formik.handleChange}
            error={formik.touched.picsURL && Boolean(formik.errors.picsURL)}
            helperText={formik.touched.picsURL && formik.errors.picsURL}
          />
        </Box>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={8}
          margin="dense"
          id="desc"
          name="desc"
          label="Opis wydarzenia"
          value={formik.values.desc}
          onChange={formik.handleChange}
          error={formik.touched.desc && Boolean(formik.errors.desc)}
          helperText={formik.touched.desc && formik.errors.desc}
        />

        <FormControlLabel sx={{ m: 0.5, display: 'flex', justifyContent: 'left' }} control={
          <Checkbox
            size="large"
            defaultChecked
            value={formik.values.allowRegister}
            onChange={event => formik.setFieldValue('allowRegister', event.target.checked, true)}
          />
        } label="Czy umożliwić dodawanie sesji do wydarzenia" />

        <Button
          variant={props.loading ? "outlined" : "contained"}
          disabled={props.loading ? true : false}
          color="primary"
          fullWidth
          type="submit">
          {props.loading ? <CircularProgress /> : "Zapisz wydarzenie"}
        </Button>
      </form>
    </LocalizationProvider>
  );
}

const propTypes = {
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  initialValues: PropTypes.object,
}
const defaultProps = {
  initialValues: {
    title: '',
    date: null,
    picsURL: '',
    desc: '',
    allowRegister: true,
  }
}
EventForm.propTypes = propTypes;
EventForm.defaultProps = defaultProps;

export default EventForm;