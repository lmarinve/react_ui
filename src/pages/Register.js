import React from 'react'
import RegisterForm from '../components/login/RegisterForm'
import '../styles/register.css'

export default () => {
  return (
    <div className='register-container'>
        <div className="register-box">
            <RegisterForm />
        </div>
    </div>
  )
}
