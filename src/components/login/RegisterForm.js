import React, { useState, useContext } from 'react'
import { useNavigate } from '@reach/router'
import { Link } from '@reach/router'
import LogInput from './LogInput'
import LogSelect from './LogSelect'
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
    country: null,
    city: null,
    zip: null,
    dateOfBorn: null
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
    console.log(UserInfo)
    e.preventDefault()
    const canSubmit = () => {
      return Validator(UserInfo.username, 'text') !== 1 || 
             Validator(UserInfo.email, 'email') !== 1 || 
             Validator(UserInfo.password, 'password') !== 1 || 
             Validator(UserInfo.confirmedPassword, 'password') !== 1 ||
             !UserInfo.first_name.length ||
             !UserInfo.last_name.length ||
             !UserInfo.country ||
             !UserInfo.city ||
             !UserInfo.dateOfBorn ||
             !UserInfo.zip
    }
    if (canSubmit()) {
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

  const paises = ["United States", "Canada", "Mexico"];
  const handleCountryChange = value => {
    setUserInfo({
      ...UserInfo,
      country: value
    })
  }
  const ciudades = ["Texas", "California", "Aragua"];
  const handleCityChange = (value) => {
    setUserInfo({
      ...UserInfo,
      city: value
    })
  }

  return (
    <div className='register-form'>
      <img className='register-logo animated fadeInDown' src={Logo2} />
      <form>
        <LogInput animation="animated fadeInRight" icon='fal fa-user' typeInput="text" nameId='username' placeHolderText='Username' onChange={onChange} />
        <LogInput animation="animated fadeInLeft" icon='fal fa-envelope' typeInput="text" nameId='email' placeHolderText='User Email' onChange={onChange} />
        <LogInput animation="animated fadeInRight" icon='fal fa-lock' typeInput="password" nameId='password' placeHolderText='Password' onChange={onChange} />
        <LogInput animation="animated fadeInLeft" icon='fal fa-lock' typeInput="password" nameId='confirmedPassword' placeHolderText='Confirm Password' onChange={onChange} />
        <LogInput animation="animated fadeInRight" icon='far fa-id-card-alt' typeInput="text" nameId='first_name' placeHolderText='First Name' onChange={onChange} />
        <LogInput animation="animated fadeInLeft" icon='far fa-id-card-alt' typeInput="text" nameId='last_name' placeHolderText='Last Name' onChange={onChange} />
        <div className="date-group-container animated fadeInRight" tabIndex="1">
            <div className="date-group">
                <i className="date-group-icon far fa-calendar-alt" />
                <label>Date of Born</label>
            </div>
            <input type="date" id="dateOfBorn" name="dateOfBorn" onInput={onChange} />
        </div>
        {/* <LogInput animation="animated fadeInRight" icon='far fa-calendar-alt' typeInput="date" nameId='dateOfBorn' onChange={onChange} /> */}
        <LogInput animation="animated fadeInLeft" icon='far fa-map-marked-alt' typeInput="text" nameId='address' placeHolderText='Address' onChange={onChange} />
        <LogSelect animation="animated fadeInRight" icon="far fa-globe-americas" title="Country" options={paises} elementsName="contries" value={UserInfo.country} onChange={handleCountryChange} />
        <LogSelect animation="animated fadeInLeft" icon="fas fa-search-location" title="City" options={ciudades} elementsName="contries" value={UserInfo.city} onChange={handleCityChange} />
        <LogInput animation="animated fadeInRight" icon='fal fa-location' typeInput="text" nameId='zip' placeHolderText='Zip Code' onChange={onChange} />
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
