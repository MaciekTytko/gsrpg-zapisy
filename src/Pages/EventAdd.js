import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as yup from 'yup';
import { useDataBase_AddEvent } from '../Hooks/useDataBase';
import { useNavigate } from 'react-router';

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
  descShort: yup
    .string('Podaj krótki opis na kartę wydarzenia')
    .min(10, 'Postaraj się wpisać dłuższy opis')
    .max(150, 'Nie przekraczaj 50 znaków')
    .required('Krótki opis wydarzenia jest wymagany'),
  desc: yup
    .string('Podaj opis wydarzenia')
    .min(10, 'Postaraj się wpisać dłuższy opis')
    .max(500, 'Nie przekraczaj 500 znaków')
    .required('Opis wydarzenia jest wymagany'),
  allowRegister: yup
    .boolean('Podaj opis wydarzenia'),
});

function EventsSessionAdd() {
  const addEvent = useDataBase_AddEvent();
  const navigator = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      date: null,
      descShort: '',
      desc: '',
      allowRegister: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addEvent(values);
      navigator('..');
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            sx={{ m: 2 }}
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
            value={JSON.parse(formik.values.date)}
            onChange={value => formik.setFieldValue('date', JSON.stringify(value), true)}
            renderInput={(params) => <TextField
              fullWidth
              sx={{ m: 2 }}
              id="date"
              name="date"
              {...params}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />}
          />
          <TextField
            fullWidth
            multiline
            sx={{ m: 2 }}
            id="descShort"
            name="descShort"
            label="Skrócony opis wydarzenia"
            value={formik.values.descShort}
            onChange={formik.handleChange}
            error={formik.touched.descShort && Boolean(formik.errors.descShort)}
            helperText={formik.touched.descShort && formik.errors.descShort}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={8}
            sx={{ m: 2 }}
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
            sx={{ m: 2 }}
            color="primary"
            variant="contained"
            fullWidth type="submit">
            Zapisz wydarzenie
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default EventsSessionAdd;