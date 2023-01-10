import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from '../Context/AuthContext';
import { fbaseAuth } from "../Firebase/Firebase";


//

function Test() {
  const user = useContext(AuthContext);
  const logout = () => {
    fbaseAuth.createCustomToken('')
      .then((customToken) => {
        // Send token back to client
        console.log('token:', customToken);

      })
      .catch((error) => {
        console.log('Error creating custom token:', error);
      });

  };

  return (
    <>
      <h1> TEST </h1>

      <Button onClick={logout}>Wyloguj</Button>

      <ul>{user && Object.entries(user).map(x=><li>{x[0] + ': ' + x[1]}</li>)}</ul>
    </>
  )
}

export default Test;
