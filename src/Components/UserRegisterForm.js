import { Box, Alert} from "@mui/material";
import { useContext } from "react";
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import { useAuth_RegisterWithEmailAndPassword } from '../Hooks/useAuth';
import EmailPasswordForm from "./EmailPasswordForm";


function UserRegisterForm(props) {
  const infoBar = useContext(InfoBarContext);
  const [register, loading, error] = useAuth_RegisterWithEmailAndPassword();

  const login = async (values) => {
    console.log(values);
    const resultError = await register(values.email, values.password);
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można zarejestrować użytkownika' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Zarejestrowano nowego użytkownika' });
    props.loginResult(resultError);
  }

  return (
    <>
      <Box>
        {error && <Alert severity="error">Nie można zarejestrować użytkownika</Alert>}
        <EmailPasswordForm
          submit={login}
          loading={loading}
          buttonText="Rejestruj"
        />
      </Box>
    </>
  )
}

export default UserRegisterForm;