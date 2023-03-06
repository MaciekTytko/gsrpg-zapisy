import { AppBar, Box, Toolbar, Container } from '@mui/material';
import { useContext } from 'react';
import MenuSiteButtons from '../Components/MenuSiteButtons';
import MenuSiteLogo from '../Components/MenuSiteLogo';
import MenuSiteUserAvatar from '../Components/MenuSiteUserAvatar';
import AuthContext from '../Context/AuthContext';
import MenuSiteMobileMenu from '../Components/MenuSiteMobileMenu';

function MenuSite() {
  const { user } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ displayPrint: 'none' }}>
      <Container sx={{ p: 0 }} maxWidth="xl">
        <Toolbar>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MenuSiteMobileMenu />
          </Box>
          <MenuSiteLogo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            <MenuSiteButtons />
          </Box>

          {user && <MenuSiteUserAvatar />}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MenuSite;