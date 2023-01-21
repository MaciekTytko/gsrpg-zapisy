import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import AuthErrorLogin from "../../Pages/AuthErrorLogin";

export default function AuthCheck({children}){
  const {user} = useContext(AuthContext);

  return user 
    ? children
    : <AuthErrorLogin/> 
  ;
}

// Add when You want redirect to login if user is not clear.
//import { Navigate } from "react-router";
//<Navigate to="/login" replace />