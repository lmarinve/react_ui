import React, { useState, useContext } from 'react'
import { useNavigate } from '@reach/router'
import { Link } from '@reach/router'
import LogInput from './LogInput'
import LogButton from './LogButton'
import { register, getEmailAvailability } from '../../_services/user.service'
import ErrorMessage from '../ErrorMessage'
import { globalValidator as Validator, checkPasswordPattern, usePasswordCheck } from '../../_helpers/Validator'
import MustContainItem from './MustContainItem'
import { useLoader } from '../../_helpers/Loader'
import Context from '../../Context'

import Logo2 from '../../images/logo2.png'

export default () => {
  const { activateUser } = useContext(Context)
  const navigator = useNavigate()
  const [UserInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
  })
  const [messageError, setMessageError] = useState('')
  const Loader = useLoader()

  const { onPasswordChange, passwordsToCheck, get, passwordsMatch } = usePasswordCheck({ 
    password: {
      value: '',
      uppercase: false,
      lowercase: false,
      number: false,
      specialCharacter: false,
      longEnough: false
    },
    confirmedPassword: {
      value: '',
      uppercase: false,
      lowercase: false,
      number: false,
      specialCharacter: false,
      longEnough: false
    }
  })

  const onChange = e => {
    setMessageError('')
    setUserInfo({
      ...UserInfo,
      [e.target.name]: e.target.value
    })

    if (e.target.name !== 'email') {
      onPasswordChange(e)
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    if (Validator(UserInfo.username, 'text') !== 1 || Validator(UserInfo.email, 'email') !== 1 || Validator(UserInfo.password, 'password') !== 1 || Validator(UserInfo.confirmedPassword, 'password') !== 1) {
      const setMessage = isNaN(Validator(UserInfo.email, 'email')) ? Validator(UserInfo.email, 'email') : 'Must enter a password with at least one lowercase, one uppercase, a number and a special character'
      return setMessageError(setMessage)
    } else {
      Loader.loading()
      return register(UserInfo)
        .then((response) => {
          if (response.data.key) 
            Loader.loaded( () => activateUser(response.data.key) ) 
            // navigator('/dashboard', { replace: true }) 
          else if (response.data.message && response.data.message.length) 
            Loader.loaded( () => navigator('/welcome-signup', { replace: true }) )
          else
            Loader.loaded( () => setMessageError('An error occurred, please contact support@adfluencepro.com') )
          
        })
        .catch(() => Loader.loaded( setMessageError('An error occurred, please try again') ) )
    }
  }

  return (
    <div className='register-form'>
      <img className='register-logo animated fadeInDown' src={Logo2} />
      <form>
        <LogInput animation="animated fadeInRight" icon='fal fa-user' typeInput="text" nameId='username' placeHolderText='Username' onChange={onChange} />
        <LogInput animation="animated fadeInLeft" icon='fal fa-envelope' typeInput="text" nameId='email' placeHolderText='User Email' onChange={onChange} />
        <LogInput animation="animated fadeInRight" icon='fal fa-lock' typeInput="password" nameId='password' placeHolderText='Password' onChange={onChange} />
        <LogInput animation="animated fadeInLeft" icon='fal fa-lock' typeInput="password" nameId='confirmedPassword' placeHolderText='Confirm Password' onChange={onChange} />
        {messageError !== ''
          ? <ErrorMessage message={messageError} marginBottom='0.5rem' />
          : null}
        <MustContainItem animation="animated fadeInRight" passwordCheck={get} UserInfo={UserInfo} />
        <LogButton onClick={onSubmit} animation="animated bounceInUp" goText="Sign up" loading={Loader.isLoading()} />
        <div className='register-option animated bounceInUp'>
          <Link to="/sign-in">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  )
}
