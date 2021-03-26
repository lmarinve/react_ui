import React from 'react'
import { Link } from '@reach/router'
import Logo2 from '../images/logo2.png'
import '../styles/waitingActivation.css'

export default () => {
  return (
    <div className="waiting-container">
      <div className="waiting-box">
        <img className='waiting-logo animated fadeInDown' src={Logo2} />
        <p className="animated fadeInLeft">Boom! Your user was successfully created</p>
        <p className="animated fadeInLeft">You're set up on a Demo database</p>
        <p className="animated fadeInRight">Demo data has been set for 14 days</p>
        <p className="animated fadeInRight">Let us know to associate your user with your Agency and Clients,</p>
        <p className="animated fadeInRight">on the next 14 days</p>
        <div className='register-option animated bounceInUp'>
          <Link to="/sign-in">Log in</Link>
        </div>
      </div>
    </div>
  )
}
