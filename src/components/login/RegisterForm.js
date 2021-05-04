import React, { useState, useContext } from 'react'
import { useNavigate } from '@reach/router'
import { Link } from '@reach/router'
import LogInput from './LogInput'
import LogSelect from './LogSelect'
import LogButton from './LogButton'
import { register1, register2, getEmailAvailability } from '../../_services/user.service'
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
    address: '1',
    is_staff: false,
    is_superuser: false,
    is_active: true,
    role: 'D',
    address: 'A',
    city: '001',
    state: 'fl',
    zip: '00000',
    country: 'usa'
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
      return Validator(UserInfo.email, 'email') !== 1 || 
             Validator(UserInfo.password, 'password') !== 1 || 
             Validator(UserInfo.confirmedPassword, 'password') !== 1
    }
    const hasProfile = () => (
        UserInfo.first_name.length &&
        UserInfo.last_name.length &&
        UserInfo.city &&
        UserInfo.state &&
        UserInfo.zip &&
        UserInfo.country
    )
    if (cantSubmit()) {
      const setMessage = isNaN(Validator(UserInfo.email, 'email')) ? Validator(UserInfo.email, 'email') : 'Must enter a valid email as username and also as email address'
      return setMessageError(setMessage)
    } else {
      Loader.loading()
      const register = !hasProfile() ? register1 : register2
      return register(UserInfo)
        .then((response) => {
          Loader.loaded(() => navigator('/sign-in', { replace: true }))
        })
        .catch(() => Loader.loaded( setMessageError('An error occurred, please try again') ) )
    }
  }
  const [additional, setAdditional] = useState({status: false, display: 'display-none'});

  const onChangeAdditional = () => {
      if(!additional.status){
        setAdditional({status: true, display: 'display-grid'})
      } else {
        setAdditional({status: false, display: 'display-none'})
      }
  }

  return (
    <form className='register-form' autoComplete='off'>
        <img className='register-logo animated fadeInDown' src={Logo2} />
        <LogInput animation="animated fadeInDown" icon='fal fa-envelope' typeInput="text" nameId='email' placeHolderText='User Email' onChange={onChange} />
        <LogInput animation="animated fadeInDown" icon='fal fa-lock' typeInput="password" nameId='password' placeHolderText='Password' onChange={onChange} />
        <LogInput animation="animated fadeInDown" icon='fal fa-lock' typeInput="password" nameId='confirmedPassword' placeHolderText='Confirm Password' onChange={onChange} />
        <div className="register-option animated fadeInDown">
            <label>Optional info: </label><input type="checkbox" onChange={onChangeAdditional}/>
        </div>
        <div className={`aditional-info ${additional.display}`}>
            <LogInput icon='far fa-id-card-alt' typeInput="text" nameId='first_name' placeHolderText='First Name' onChange={onChange} />
            <LogInput icon='far fa-id-card-alt' typeInput="text" nameId='last_name' placeHolderText='Last Name' onChange={onChange} />
            <LogInput icon='far fa-map-marked-alt' typeInput="text" nameId='address' placeHolderText='Address' onChange={onChange} />
            <LogInput icon='fas fa-search-location' typeInput="text" nameId='city' placeHolderText='City' onChange={onChange} />
            <LogInput icon='fas fa-search-location' typeInput="text" nameId='state' placeHolderText='State' onChange={onChange} />
            <LogInput icon='fal fa-location' typeInput="text" nameId='zip' placeHolderText='Zip Code' onChange={onChange} />
            <LogInput icon='far fa-globe-americas' typeInput="text" nameId='country' placeHolderText='Country' onChange={onChange} />
            {/* <LogSelect animation="animated fadeInRight" icon="far fa-globe-americas" title="Country" options={paises} elementsName="contries" value={UserInfo.country} onChange={handleCountryChange} /> */}
            {/* <LogSelect animation="animated fadeInLeft" icon="fas fa-search-location" title="City" options={ciudades} elementsName="cities" value={UserInfo.city} onChange={handleCityChange} /> */}           
        </div>
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
