import React, { createContext } from 'react'

// Object which also contains components
const AuthContext = createContext({
  isLoggedIn: false
})
export default AuthContext