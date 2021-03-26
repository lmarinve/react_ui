/* eslint-disable react/jsx-fragments */
import React from 'react'
import AuthContext from '../Context'

import ProfileImage from '../images/employee.jpg'

const DashHeader = (props) => {
  const { title, handleClick } = props
  const { removeUser } = React.useContext(AuthContext)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  return (
    <div className='top-nav-container animated fadeInDown' style={{ zIndex: 100 }}>
      <div className='hamburger-menu-container'>
        <i className="hamburger-menu-icon far fa-bars" />
      </div>
      <div className='nav-center'>
        <button className='nav-center-btn' onClick={handleClick}>{title}</button>
      </div>
      <div className='action-items'>
        <div className='notifications-menu-container'>
          <div className="notifications-btn">
            <i className='fal fa-bell' />
            <i className='fas fa-circle alert' />
          </div>
        </div>
        <div className="profile-menu-container" onClick={() => console.log('me tocastee')}>
          <img className="profile-btn" src={ProfileImage} onClick={() => setShowUserMenu(!showUserMenu)} />
          {showUserMenu 
              && <div className='profile-menu animated fadeInRight' style={{ zIndex: '100' }}>
              <><a style={{ cursor: 'pointer' }}><i className='profile-menu-icon fal fa-user-circle' />My Profile</a></>
              <><a style={{ cursor: 'pointer' }}><i className='profile-menu-icon fal fa-unlock' />Change Password</a></>
              <><a style={{ cursor: 'pointer' }}><i className='profile-menu-icon fal fa-plug' />Integrations</a></>
              <><a style={{ cursor: 'pointer' }}><i className='profile-menu-icon fal fa-plus' />Invite Team Members</a></>
              <><a style={{ cursor: 'pointer' }}><i className='profile-menu-icon fal fa-question' />Help Center</a></>
              <><a style={{ cursor: 'pointer' }} onClick={() => removeUser()}><i className='profile-menu-icon fal fa-sign-out' />Logout</a></>
                 </div>}
        </div>
      </div>
    </div>
  )
}

export default DashHeader
