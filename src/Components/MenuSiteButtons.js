import { Button, Stack } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import {AuthContext} from "../Context/AuthContext";


function MenuSiteButtons(props) {
  const navigator = useNavigate();
  const user = useContext(AuthContext);

  const linkTo = path => navigator(path);

  return (
    <Stack direction="row" spacing={1}>
      <Button
        key="main"
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={() => linkTo('/')}
      >
        Strona główna
      </Button>
      <Button
        key="events"
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={() => linkTo('/events')}
      >
        Wydarzenia
      </Button>
      <Button
        key="Zaloguj"
        sx={{ my: 2, color: 'white', display: user ? 'none' : 'block' }}
        onClick={() => linkTo('/login')}
      >
        Zaloguj
      </Button>
      <Button
        key="profil"
        sx={{ my: 2, color: 'white', display: user ? 'block' : 'none' }}
        onClick={() => linkTo('/user')}
      >
        Profil
      </Button>
      <Button
        key="manage"
        sx={{ my: 2, color: 'white', display: user ? 'block' : 'none' }}
        onClick={() => linkTo('/manage')}
      >
        Manage
      </Button>
    </Stack>
  )
}

export default MenuSiteButtons;