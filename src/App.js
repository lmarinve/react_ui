import React, { useContext, useEffect } from 'react'
import { Router, Redirect } from '@reach/router'
import Context from './Context'
import UserContext, { UserProvider } from './Contexts/User'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Main from './pages/Main'
import WelcomeSignup from './pages/WelcomeSignup'
import WaitingActivation from './pages/WaitingActivation'
import ValidateAccount from './pages/ValidateAccount'
import { useState } from 'react'

export default () => {
  
  // const { isAuth } = useContext(Context)
  const [isAuth, setIsAuth] = useState(true) 
  const { data } = useContext(UserContext)
  useEffect(() => {
    !isAuth && window.localStorage.getItem('token')
      ? window.localStorage.removeItem('token')
      : null
  })

  return (
      <Router>
        <UserProvider path='/'>
          {isAuth && <Redirect noThrow from='/sign-up' to='/dashboard' />}
          {isAuth && <Redirect noThrow from='/sign-in' to='/dashboard' />}
          {isAuth && <Redirect noThrow from='/forgot-password' to='/dashboard' />}
          {!isAuth && <Redirect noThrow from='/' to='/sign-in' />}
          {!isAuth && <Redirect noThrow from='/dashboard' to='/sign-in' />}
          {!isAuth && <Redirect noThrow from='/my-dashboard' to='/sign-in' />}
          {!isAuth && <Redirect noThrow from='/my-campaigns' to='/sign-in' />}
          {!isAuth && <Redirect noThrow from='/campaign-wizard' to='/sign-in' />}
          {!isAuth && <Redirect noThrow from='/my-account' to='/sign-in' />}
          <Register path='/sign-up' />
          <ForgotPassword path='/forgot-password' />
          <Login path='/sign-in' />
          <Dashboard path='/' />
          <Dashboard path='/dashboard' />
          <Main path='/my-dashboard' />
          <Main path='/my-campaigns' />
          <Main path='/campaign-wizard' />
          <Main path='/my-account' />
          <WelcomeSignup path='/welcome-signup' />
          <WaitingActivation path='/waiting-for-activation' />
          <ValidateAccount path='/verify-email/:token' />
        </UserProvider>
      </Router>
  )
}
