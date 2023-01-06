import { Avatar, Button } from "@mui/material";
import ligaZMGimg from '../Assets/Logo/LigaZMG_Logo_03_kwadrat2.png'


function MenuSiteLogo() {
  return (
    <Button
      sx={{ display: { xs: 'none', md: 'flex' }, color: 'white' }}
      href="https://www.ligazmg.pl"
      startIcon={<Avatar alt="LigaZMG" src={ligaZMGimg} />}
    >
      Liga zmg
    </Button>
  )
}

export default MenuSiteLogo;