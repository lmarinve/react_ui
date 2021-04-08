import React, { useState, useContext } from 'react'
import { login, unableUser } from '../../_services/user.service'
import { navigate, useNavigate } from '@reach/router'
import { Link } from '@reach/router'
import ErrorMessage from '../ErrorMessage'
import { globalValidator as Validator } from '../../_helpers/Validator'
import LogInput from './LogInput'
import LogButton from './LogButton'
import { useLoader } from '../../_helpers/Loader'
import Context from '../../Context'
import UserContext, { UserProvider } from '../../Contexts/User'

import Logo2 from '../../images/logo2.png'
import { useEffect } from 'react'

export default () => {
  const { activateUser } = useContext(Context)
  const { setData } = useContext(UserContext)
  const [UserInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: ''
  })
  const navigator = useNavigate()
  const Loader = useLoader()
  const [invalidCredentialsCount, setInvalidCredentialsCount] = useState({})

  const onChange = e => {
    setMessageError('')
    setUserInfo({
      ...UserInfo,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    if (Validator(UserInfo.username, 'text') !== 1 || Validator(UserInfo.email, 'email') !== 1 /*|| Validator(UserInfo.password, 'password') !== 1*/) {
          const setMessage = isNaN(Validator(UserInfo.email, 'email')) ? Validator(UserInfo.email, 'email') : Validator(UserInfo.password, 'password')
          return setMessageError(setMessage)
    } else {
          Loader.loading()
          return login(UserInfo)
            .then((response) => {
              if (response.data.key) {
                Loader.loaded()
                setData(response.data.key)
                activateUser(response.data.key)
              } 
            })
            .catch(e => {
              console.log(e.response)
              if (e.response.data.non_field_errors.length) {
                setMessageError(e.response.data.non_field_errors[0])
                  
                if (e.response.data.non_field_errors[0] === 'user account is inactive!')
                  setInvalidCredentialsCount({
                    ...invalidCredentialsCount,
                    [UserInfo.email]: 4
                  })
               
                else if (e.response.data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
                  setInvalidCredentialsCount({
                    ...invalidCredentialsCount,
                    [UserInfo.email]: invalidCredentialsCount[UserInfo.email]
                     ? ++invalidCredentialsCount[UserInfo.email]
                     : 1
                  })
                  Loader.loaded()
                }

                else
                  setMessageError('Your request could not be processed, please contact support@adfluencepro.com')
              }
              else {
                setMessageError('An error occurred, please contact support@adfluencepro.com')
              }
              e.response.data.status === 404 ? setMessageError('Invalid Credentials') : setMessageError('An error occurred while loggin in, please try again')
            })
            .finally(Loader.loaded)
    }
  }

  const [messageError, setMessageError] = useState('')

  useEffect(() => {
    if (invalidCredentialsCount[UserInfo.email] && invalidCredentialsCount[UserInfo.email] > 3) {
      unableUser(UserInfo.email, false)
        .finally(() => {
          Loader.loaded()
          navigator(`/forgot-password?email=${UserInfo.email}`, { replace: true }) 
        })
    }

    return () => {
      Loader.loaded()
    }
  }, [invalidCredentialsCount])

  return (
    <div className='login-form'>
      <img className='login-logo animated fadeInDown' src={Logo2} />
      <form>
        <LogInput animation="animated fadeInRight" icon='fal fa-user' typeInput="text" nameId='username' placeHolderText='Username' onChange={onChange} />
        <LogInput animation="animated fadeInLeft" icon='fal fa-envelope' typeInput="text" nameId='email' placeHolderText='User Email' onChange={onChange} />
        <LogInput animation="animated fadeInRight" icon='fal fa-lock' typeInput="password" nameId='password' placeHolderText='Password' onChange={onChange} />
        {messageError !== ''
          ? <ErrorMessage message={messageError} marginBottom='0.5rem' />
          : null}
        {/* Caso normal */}
        <LogButton onClick={onSubmit} animation="animated bounceInUp" goText="Login" loading={Loader.isLoading()} />
        {/* Caso si el usuario tiene su cuenta deshabilitada */}
        {/*<div className="disable-account-container">
          <p>Your account is disable.</p>
          <p>Do you want to send a message to request enable it?</p>
          <LogButton goText="Send message"/>
        </div> */}
        <div className='login-option animated fadeInLeft'>
          <Link to="/forgot-password" style={{ fontFamily: 'Arial', fontWeight: '500', fontSize: '12px' }}>Forgot Password?</Link>
        </div>
        <div className='login-option animated fadeInLeft'>
          <Link to="/sign-up" style={{ fontFamily: 'Arial', fontWeight: '500', fontSize: '12px' }}>Does not have an account? Sign Up</Link>
        </div>
      </form>
    </div>
  )
}
