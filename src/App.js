import React, { useState, useEffect } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'
import AuthContext from './store/auth-context'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkLoggedIn()
  })

  const checkLoggedIn = () => {
    const isLogged = localStorage.getItem('isLoggedIn')
    storageLoggedIn(isLogged)
  }

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    console.log('logout handler')
    localStorage.clear('isLoggedIn')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  )

  function storageLoggedIn (isLogged) {
    if (isLogged === 'true') {
      setIsLoggedIn(true)
    }
  }
}

export default App
