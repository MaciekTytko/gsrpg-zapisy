import { Autocomplete, Box, Button, Card, CardMedia, Checkbox, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import * as yup from 'yup';
import PropTypes from 'prop-types'

const validationSchema = yup.object({
  title: yup
    .string('Wpisz Tytuł sesji')
    .min(5, 'Postaraj się wpisać dłuższy tytuł')
    .max(50, 'Nie przekraczaj 50 znaków')
    .required('Tytuł jest wymagany, a i graczom będzie miło :)'),
  desc: yup
    .string('Wpisz Tytuł sesji')
    .min(50, 'Postaraj się wpisać dłuższy opis, tak na 50 znaków minimum')
    .max(500, 'Nie przekraczaj 500 znaków')
    .required('Opis jest wymagany, a i graczom będzie miło :)'),
  picsURL: yup
    .string('Podaj Link do obrazka')
    .url('To nie jest poprawny Link'),
  system: yup
    .string('Podaj System w jakim gracie')
    .max(50, 'Nie przekraczaj 50 znaków')
    .required('System jest wymagany, a i graczom będzie miło :)'),
  type: yup
    .array()
    .of(
      yup
        .string('Musisz podać typ sesji')
        .max(20, 'Każdy typ może mieć max 20 znaków')
    ).min(1, 'Musisz wybrać lub wpisać przynajmniej jeden'),
  vibe: yup
    .string('Wpisz klimat sesji')
    .max(100, 'Nie przekraczaj 100 znaków'),
  triggers: yup
    .array()
    .of(
      yup
        .string('Trigger musi być opisem')
        .max(20, 'Każdy trigger może mieć max 20 znaków')
    ),
  otherInfo: yup
    .string('Możesz przekazać inne informacje')
    .max(200, 'Nie przekraczaj 200 znaków'),
  usersCountMax: yup
    .number('Wpisz liczbę graczy')
    .min(2, 'Bez solówek')
    .max(4, 'Więcej niż 4 się do boksa nie zmieści')
    .required('Musisz podać maksymalną liczbę graczy'),
  userAgeMin: yup
    .number('Wpisz minimalny wiek na sesji')
    .min(6, 'Lepiej zagraj z rodzicami')
    .max(30, 'Każdy po 30 jest już stary, nie przesadzaj'),
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ProgramForm(props) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.submit(values);
    },
  });

  return (
    <Container fullWidth sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 600, display: 'flex', justifyContent: 'right' }}>
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
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={8}
            margin="dense"
            id="desc"
            name="desc"
            label="Opis sesji"
            value={formik.values.desc}
            onChange={formik.handleChange}
            error={formik.touched.desc && Boolean(formik.errors.desc)}
            helperText={formik.touched.desc && formik.errors.desc}
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
          <Autocomplete
            freeSolo
            options={['Warhammer', 'D&D']}
            value={formik.values.system}
            onChange={(event, newValue) => {
              formik.setFieldValue('system', newValue || '', true);
            }}
            renderInput={(params) => <TextField {...params}
              fullWidth
              margin="dense"
              id="system"
              name="system"
              label="System"
              error={formik.touched.system && Boolean(formik.errors.system)}
              helperText={formik.touched.system && formik.errors.system}
            />}
          />
          <Autocomplete
            freeSolo
            multiple
            id="type"
            name="type"
            options={['akcja', 'śledztwo', 'DungeonCrawl']}
            getOptionLabel={(x) => x}
            value={formik.values.type}
            onChange={(event, newValue) => {
              formik.setFieldValue('type', newValue, true);
            }}
            renderInput={(params) => <TextField {...params}
              fullWidth
              margin="dense"
              label="Typ sesji"
              placeholder="Możesz wpisać własny typ sesji"
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            />}
          />
          <TextField
            fullWidth
            margin="dense"
            id="vibe"
            name="vibe"
            label="Klimat sesji"
            value={formik.values.vibe}
            onChange={formik.handleChange}
            error={formik.touched.vibe && Boolean(formik.errors.vibe)}
            helperText={formik.touched.vibe && formik.errors.vibe}
          />
          <Autocomplete
            freeSolo
            multiple
            disableCloseOnSelect
            id="triggers"
            name="Triggery"
            options={['Krew', '18+', 'Narkotyki']}
            getOptionLabel={(x) => x}
            value={formik.values.triggers}
            onChange={(event, newValue) => {
              formik.setFieldValue('triggers', newValue, true);
            }}
            renderInput={(params) => <TextField {...params}
              fullWidth
              margin="dense"
              label="Triggery"
              placeholder="Możesz wpisać własny trigger"
              error={formik.touched.triggers && Boolean(formik.errors.triggers)}
              helperText={formik.touched.triggers && formik.errors.triggers}
            />}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
          />
          <TextField
            fullWidth
            margin="dense"
            id="otherInfo"
            name="otherInfo"
            label="Inne informacje"
            value={formik.values.otherInfo}
            onChange={formik.handleChange}
            error={formik.touched.otherInfo && Boolean(formik.errors.otherInfo)}
            helperText={formik.touched.otherInfo && formik.errors.otherInfo}
          />
          <TextField
            fullWidth
            type="number"
            margin="dense"
            id="usersCountMax"
            name="usersCountMax"
            label="Maksymalna ilość graczy na sesji"
            value={formik.values.usersCountMax}
            onChange={formik.handleChange}
            error={formik.touched.usersCountMax && Boolean(formik.errors.usersCountMax)}
            helperText={formik.touched.usersCountMax && formik.errors.usersCountMax}
          />
          <TextField
            fullWidth
            type="number"
            margin="dense"
            id="userAgeMin"
            name="userAgeMin"
            label="Minimalny wiek gracza"
            value={formik.values.userAgeMin}
            onChange={formik.handleChange}
            error={formik.touched.userAgeMin && Boolean(formik.errors.userAgeMin)}
            helperText={formik.touched.userAgeMin && formik.errors.userAgeMin}
          />

          <Button
            margin="dense"
            color="primary"
            variant="contained"
            fullWidth type="submit">
            Wyślij sesję
          </Button>
        </form>
      </Box>
    </Container>
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
    desc: '',
    picsURL: '',
    system: '',
    type: ['typ sesji', 'akcja'],
    vibe: '',
    triggers: [],
    otherInfo: '',
    usersCountMax: 4,
    userAgeMin: 16,
  }
}
ProgramForm.propTypes = propTypes;
ProgramForm.defaultProps = defaultProps;
export default ProgramForm;