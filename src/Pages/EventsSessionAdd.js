import { Autocomplete, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Title
// Desc
// System
// Type
// Vibe
// Triggers
// userAgeMax
// UserCountMax
// GameTime

const validationSchema = yup.object({
  title: yup
    .string('Wpisz Tytuł sesji')
    .min(5, 'Postaraj się wpisać dłuższy tytuł')
    .max(50, 'Nie przekraczaj 50 znaków')
    .required('Tytuł jest wymagany, a i graczom będzie miło :)'),
  desc: yup
    .string('Wpisz Tytuł sesji')
    .min(50, 'Postaraj się wpisać dłuższy opis')
    .max(500, 'Nie przekraczaj 500 znaków')
    .required('Opis jest wymagany, a i graczom będzie miło :)'),
  system: yup
    .string('Podaj System w jakim gracie')
    .max(50, 'Nie przekraczaj 50 znaków')
    .required('System jest wymagany, a i graczom będzie miło :)'),
  type: yup
    .array()
    .of(
      yup
        .string('Musisz podać typ sesji')
        .max(5, 'za dużo znaków')
    ),
  vibe: yup
    .string('Wpisz klimat sesji')
    .max(100, 'Nie przekraczaj 100 znaków'),
  triggers: yup
    .string('Wpisz triggery na sesji')
    .max(100, 'Nie przekraczaj 100 znaków'),
  usersCountMax: yup
    .number('Wpisz typ sesji')
    .min(2, 'Bez solówek')
    .max(4, 'Więcej niż 4 się do boksa nie zmieści')
    .required('Musisz podać maksymalną liczbę graczy'),
  userAgeMin: yup
    .number('Wpisz typ sesji')
    .max(30, 'Każdy po 30 jest już stary, nie przesadzaj'),
});

function EventsSessionAdd() {

  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      system: '',
      type: ['typ sesji', 'akcja'],
      vibe: '',
      triggers: '',
      usersCountMax: 4,
      userAgeMin: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //TODO on Submit
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          sx={{ m: 2 }}
          id="title"
          name="title"
          label="Tytuł"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          multiline
          maxRows={8}
          sx={{ m: 2 }}
          id="desc"
          name="desc"
          label="Opis sesji"
          value={formik.values.desc}
          onChange={formik.handleChange}
          error={formik.touched.desc && Boolean(formik.errors.desc)}
          helperText={formik.touched.desc && formik.errors.desc}
        />
        <Autocomplete
          fullWidth
          freeSolo
          sx={{ m: 2 }}
          options={['Warhammer', 'D&D']}
          value={formik.values.system}
          onChange={formik.handleChange}
          renderInput={(params) => <TextField {...params}
            id="system"
            name="system"
            label="System"
            error={formik.touched.system && Boolean(formik.errors.system)}
            helperText={formik.touched.system && formik.errors.system}
          />}
        />
        <Autocomplete
          fullWidth
          freeSolo
          multiple
          sx={{ m: 2 }}
          id="type"
          name="type"
          options={['akcja', 'śledztwo', 'DungeonCrawl']}
          getOptionLabel={(x) => x}
          value={formik.values.type}
          onChange={(event, newValue) => {
            formik.setFieldValue('type', newValue, true);
          }}
          renderInput={(params) => <TextField {...params}
            label="Typ sesji"
            placeholder="Możesz wpisać własny typ sesji"
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          />}
        />
        <div>{JSON.stringify(formik.values.type)}</div>
        <div>{JSON.stringify(formik.touched.type)}</div>
        <div>{JSON.stringify(formik.errors.type)}</div>
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

export default EventsSessionAdd;


// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import Stack from "@mui/material/Stack";

// export default function Playground() {
//   const [value, setValue] = React.useState(['rtu']);

//   return (
//     <Stack spacing={1} sx={{ width: 300 }}>
//       <Autocomplete
//         freeSolo
//         multiple
//         options={["raz", "dwa", "trzy", "cztery"]}
//         id="controlled-demo"
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(params) => (
//           <TextField {...params} label="controlled" variant="outlined" />
//         )}
//       />
//       <p>{value ? JSON.stringify(value) : "*"}</p>
//     </Stack>
//   );