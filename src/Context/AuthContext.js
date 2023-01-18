import React from 'react'

const AuthContext = React.createContext({
  user: null,
  reloadUser: ()=>{},
  admin: false,
});

AuthContext.displayName = "AuthContext"

export default AuthContext;