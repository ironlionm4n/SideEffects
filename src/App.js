import React, { useState, useEffect } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'

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
    localStorage.clear("isLoggedIn")
    setIsLoggedIn(false)
  }

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  )

  function storageLoggedIn(isLogged) {
    if (isLogged === 'true') {
      setIsLoggedIn(true)
    }
  }
}

export default App
