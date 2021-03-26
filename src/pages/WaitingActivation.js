import React from 'react'
import LogButton from '../components/login/LogButton'
import '../styles/waitingActivation.css'

import Logo2 from '../images/logo2.png'

export default () => {
  return (
    <div className="waiting-container">
      <div className="waiting-box">
        <img className='waiting-logo animated fadeInDown' src={Logo2} />
        <p className="animated fadeInLeft">Activate your account</p>
        <p className="animated fadeInLeft">Please check your email for an activation link</p>
        <p className="animated fadeInRight">Didn't receive an activation link in your email?</p>
        <LogButton animation="animated bounceInUp" goText="Resend"/>
      </div>
    </div>
  )
}
