import { useEffect, createContext, useState } from 'react'

// Object which also contains components
const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (formEmail, formPassword) => {},
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storageLoggedIn = localStorage.getItem('isLoggedIn')
 
     if (storageLoggedIn === '1') {
       setIsLoggedIn(true)
     }
   }, [])

  const logoutHandler = () => {
    localStorage.clear("isLoggedIn")
    setIsLoggedIn(false)
  }

  const loginHandler = (loginData) => {
    localStorage.setItem("isLoggedIn", setIsLoggedIn(true))
    setIsLoggedIn(true)
  }

  return <AuthContext.Provider value = { {isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }} >{props.children}</AuthContext.Provider>
}

export default AuthContext
