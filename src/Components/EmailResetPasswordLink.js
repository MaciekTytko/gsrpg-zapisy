import { Box, Typography, TextField, Button, DialogActions, DialogTitle, Dialog, DialogContent, Alert, IconButton, Link, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import { useAuth_sendEmailResetPassword } from "../Hooks/useAuth";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import InfoBarContext from "../Context/InfoBarContext";
import * as yup from 'yup';


const emailValidationSchema = yup.object({
  email: yup
    .string('Wpisz adres email')
    .email('Wpisz poprawny email')
    .required('Email jest wymagany'),
});

function EmailResetPasswordLink() {
  const infoBar = useContext(InfoBarContext);
  const [email, setEmail] = useState({
    value: '',
    openDialog: false,
    validateErrors: [],
    trigger: false,
  })
  const [sendEmail, loadingSendEmail] = useAuth_sendEmailResetPassword();

  const openDialog = () => setEmail({ ...email, openDialog: true, trigger: false });
  const closeDialog = () => setEmail({ ...email, openDialog: false });
  const onClickConfirm = async (values) => {
    setEmail({ ...email, trigger: true });
    if (email.validateErrors.length === 0) {
      await sendEmail(email.value);
      infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Email do zmiany hasła został wysłany na podany adres email' }) || closeDialog();
      // No info about bad auth because security.
      //https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
    }
  }

  const validateEmail = async (value) => {
    const newEmail = { ...email };
    newEmail.value = value;
    await emailValidationSchema.validate({ email: value })
      .then(() => newEmail.validateErrors = [])
      .catch(err => newEmail.validateErrors = err.errors);
    setEmail(newEmail);
  }

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'right' }}>
      <Typography
        variant="body2"
        sx={{ mr: 1 }}
      >
        Zapomniałeś hasła?
      </Typography>
      <Link
        component="button"
        variant="body2"
        onClick={openDialog}
        underline="none"
      >
        Wyślij email
      </Link>

      <Dialog
        maxWidth='xs'
        fullWidth
        open={email.openDialog}
        onClose={closeDialog}
      >
        <DialogTitle><Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          Wyślij email do zmiany hasła
          <IconButton aria-label="close" onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
        </DialogTitle>
        <DialogContent>
          <>
            <Typography
              variant="body">
              Wpisz swój adres e-mail
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={email.value}
              onChange={(event) => validateEmail(event.target.value)}
              error={email.trigger && email.validateErrors?.length > 0}
              helperText={email.trigger && email.validateErrors?.[0]}
            />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Anuluj</Button>
          {loadingSendEmail
            ? <CircularProgress />
            : <Button onClick={onClickConfirm}>Wyślij</Button>
          }
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default EmailResetPasswordLink;