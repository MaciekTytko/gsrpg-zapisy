

function MenuSiteButtons(props) {
  return (
    <>
      <Button
        key="Zaloguj"
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={() => linkTo('login')}
      >
        Zaloguj
      </Button>
      <Button
        key="wyda"
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={() => linkTo('events')}
      >
        Wydarzenia
      </Button>
      <Button
        key="profil"
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={() => linkTo('user')}
      >
        Profil
      </Button>
    </>
  )
}

export default MenuSiteButtons;