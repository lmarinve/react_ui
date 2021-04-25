import React, { useState, useContext } from 'react'
import { useNavigate } from '@reach/router'
import { Link } from '@reach/router'
import LogInput from './LogInput'
import LogSelect from './LogSelect'
import LogDate from './LogDate'
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
    first_name: '',
    last_name: '',
    address: '',
    is_staff: false,
    is_superuser: false,
    is_active: true,
    role: 'D',
    country: 'usa',
    city: '',
    zip: '00000',
    dateOfBorn: '2000/01/01'
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
    const cantSubmit = () => {
      return Validator(UserInfo.username, 'text') !== 1 || 
             Validator(UserInfo.email, 'email') !== 1 || 
             Validator(UserInfo.password, 'password') !== 1 || 
             Validator(UserInfo.confirmedPassword, 'password') !== 1
    }
    if (cantSubmit()) {
      const setMessage = isNaN(Validator(UserInfo.email, 'email')) ? Validator(UserInfo.email, 'email') : 'Must enter a valid email as username and also as email address'
      return setMessageError(setMessage)
    } else {
      Loader.loading()
      return register(UserInfo)
        .then((response) => {
          Loader.loaded(() => navigator('/sign-in', { replace: true }))
        })
        .catch(() => Loader.loaded( setMessageError('An error occurred, please try again') ) )
    }
  }

  return (
    <form className='register-form' autoComplete='off'>
        <img className='register-logo animated fadeInDown' src={Logo2} />
        <LogInput animation="animated fadeInDown" icon='fal fa-user' typeInput="text" nameId='username' placeHolderText='Username' onChange={onChange} />
        <LogInput animation="animated fadeInDown" icon='fal fa-envelope' typeInput="text" nameId='email' placeHolderText='User Email' onChange={onChange} />
        <LogInput animation="animated fadeInDown" icon='fal fa-lock' typeInput="password" nameId='password' placeHolderText='Password' onChange={onChange} />
        <LogInput animation="animated fadeInDown" icon='fal fa-lock' typeInput="password" nameId='confirmedPassword' placeHolderText='Confirm Password' onChange={onChange} />
        <LogInput animation="animated fadeInDown" icon='far fa-id-card-alt' typeInput="text" nameId='first_name' placeHolderText='First Name' onChange={onChange} />
        <LogInput animation="animated fadeInDown" icon='far fa-id-card-alt' typeInput="text" nameId='last_name' placeHolderText='Last Name' onChange={onChange} />
        {/* <LogSelect animation="animated fadeInRight" icon="far fa-globe-americas" title="Country" options={paises} elementsName="contries" value={UserInfo.country} onChange={handleCountryChange} /> */}
        {/* <LogSelect animation="animated fadeInLeft" icon="fas fa-search-location" title="City" options={ciudades} elementsName="cities" value={UserInfo.city} onChange={handleCityChange} /> */}
        <LogInput animation="animated fadeInDown" icon='far fa-map-marked-alt' typeInput="text" nameId='address' placeHolderText='Address' onChange={onChange} />
        <LogInput animation="animated fadeInUp" icon='far fa-globe-americas' typeInput="text" nameId='country' placeHolderText='Country' onChange={onChange} />
        <LogInput animation="animated fadeInUp" icon='fas fa-search-location' typeInput="text" nameId='city' placeHolderText='City' onChange={onChange} />
        <LogInput animation="animated fadeInUp" icon='fal fa-location' typeInput="text" nameId='zip' placeHolderText='Zip Code' onChange={onChange} />
        <LogDate animation="animated fadeInUp" setter={onChange} />
        {messageError !== ''
          ? <ErrorMessage message={messageError} />
          : null}
        <LogButton onClick={onSubmit} animation="animated fadeInUp" goText="Sign up" loading={Loader.isLoading()} />
        <div className="register-option animated fadeInUp">
            <Link to="/sign-in">Already have an account? Log in</Link>
        </div>
        <MustContainItem animation="animated fadeInUp" passwordCheck={get} UserInfo={UserInfo} />
    </form>
  )
}
