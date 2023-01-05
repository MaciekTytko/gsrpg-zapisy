import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router";
import ligaZMGimg from '../Assets/Logo/LigaZMG_Logo_03_kwadrat2.png'


function MenuSiteLogo() {
  const navigator = useNavigate();
  const linkTo = path => navigator(path);

  return (
    <Button
      sx={{ display: { xs: 'none', md: 'flex' }, color: 'white' }}
      onClick={() => linkTo('/')}
      startIcon={<Avatar alt="LigaZMG" src={ligaZMGimg} />}
    >
      Liga zmg
    </Button>
  )
}

export default MenuSiteLogo;