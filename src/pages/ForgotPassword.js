/* eslint-disable react/jsx-fragments */
import React from 'react'
import { navigate } from '@reach/router'
import { getForgottenPassword as getForgottenPasswordRequest, unableUser } from '../_services/user.service' 
import { globalValidator as Validator } from '../_helpers/Validator'
import { useLoader } from '../_helpers/Loader'
import GetUrlParameter from '../_helpers/GetUrlParameter'
import '../styles/forgotPassword.css'

import Logo2 from '../images/logo2.png'
import LogInput from '../components/login/LogInput'
import LogButton from '../components/login/LogButton'
import ErrorMessage from '../components/ErrorMessage'

const ForgotPassword = () => {
    const emailQueryParam = GetUrlParameter('email')
    const [userAccountDisabled, setUserAccountDisabled] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [userEmail, setUserEmail] = React.useState('')
    const Loader = useLoader()
    const handleInputChange = (e) => {
        setErrorMessage('')
        setUserEmail(e.target.value)
    }
    const canGetForgottenPassword = () => Validator(userEmail, 'email')
    const getForgottenPassword = () => {
        Loader.loading()
        getForgottenPasswordRequest(userEmail)
          .then(response => {
            navigate('/sign-in', { replace: true })
          })
          .catch(error => {
            setErrorMessage('Something went wrong, try again.')
          })
          .finally(Loader.loaded)
    }

    function handleDoYouForgotYourPassword (answer) {
      const request = () => answer ? unableUser(emailQueryParam, true) : unableUser(emailQueryParam, false) 

      request()
        .finally(() => navigate('/sign-in', { replace: true }) )
    }

    React.useEffect(() => {
      if (emailQueryParam.length)
        setUserAccountDisabled(true)
    }, [])

    return(
        <div className="forgot-password-container ">
            <div className="forgot-password-box">
              <img className="forgot-logo animated fadeInDown" src={Logo2} />
              {userAccountDisabled
                ? <>
                    <h1 style={{ margin: '20px 0', textAlign: 'center', color: 'white'}}> Your account has been disabled </h1>
                    <div style={{ display: 'flex' }}> 
                      <p> Do you forgot your password ? </p> 
                      <p className='custom-p' style={{ marginLeft: '10px' }} onClick={() => handleDoYouForgotYourPassword(true)}> Yes </p> 
                      <p style={{ marginLeft: '10px' }}> / </p> 
                      <p className='custom-p' style={{ marginLeft: '10px' }} onClick={() => handleDoYouForgotYourPassword(false)}> No </p>
                    </div>
                    <p> You 'll receive an email to return and login again, in the next 10 minutes or so </p>
                  </>
                : <>
                  <LogInput animation="animated fadeInLeft" icon='fal fa-user' typeInput="text" nameId='email' placeHolderText='User Email' onChange={handleInputChange} />
                  {errorMessage !== '' &&
                    <ErrorMessage message={errorMessage} />}
                    <p className="animated fadeInRight">The password corresponding to this account will be sent to the email you provide</p>
                    <LogButton animation="animated bounceInUp" goText="Send" canClick={canGetForgottenPassword} onClick={getForgottenPassword} loading={Loader.isLoading()} />
                  </>}
            </div>
        </div>
    )
}

export default ForgotPassword