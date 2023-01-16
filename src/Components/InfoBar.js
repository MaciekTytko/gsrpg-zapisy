import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";


function InfoBar(){
  const infobar = useContext(InfoBarContext);

  return (
    <Snackbar open={infobar.state.open} autoHideDuration={2500} onClose={() => infobar.dispatch({type: infoBarAction.CLOSE})}>
      <Alert onClose={() => infobar.dispatch({type: infoBarAction.CLOSE})} severity={infobar.state.severity} variant="filled" sx={{ width: '100%' }}>
        {infobar.state.message}
      </Alert>
    </Snackbar>
  )
}

export default InfoBar;