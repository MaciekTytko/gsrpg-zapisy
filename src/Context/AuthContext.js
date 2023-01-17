import React from 'react'

const AuthContext = React.createContext(null);
const AuthReloadContext = React.createContext(null);

AuthContext.displayName = "AuthContext"
AuthReloadContext.displayName = "AuthReloadContext"

export { AuthContext, AuthReloadContext};