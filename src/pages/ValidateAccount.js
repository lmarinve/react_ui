import React from 'react'
import LogButton from '../components/login/LogButton'
import { validateAccount } from '../_services/user.service'
import { useNavigate } from '@reach/router'
import '../styles/validateAccount.css'

import Logo2 from '../images/logo2.png'

export default ({ token }) => {
  const navigator = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    return validateAccount(token)
      .then(() => navigator('/campaignWizard', { replace: true }))
      .catch((e) => console.error(e))
  }

  return (
    <div className="validate-container">
      <div className="validate-box">
        <img className='validate-logo animated fadeInDown' src={Logo2} />
        <p className="animated fadeInLeft">Your account has been activated</p>
        <p className="animated fadeInRight">Click in the button below to go to your Dashboard</p>
        <LogButton animation="animated bounceInUp" goText="Go to my Dashboard" onClick={handleSubmit}/>
      </div>
    </div>
  )
}
