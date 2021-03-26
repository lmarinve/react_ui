/* eslint-disable react/jsx-fragments */
import React, { useContext, useEffect, useState } from 'react'
import TabController from '../../../_helpers/UseTabController'
import { CardNewUser, CardUser } from '../CardUser'
import DashInput from '../DashInput'
import SearchList from '../SearchList'
import UserContext from '../../../Contexts/User'

import ProfileImage from '../../../images/avatar.png'

const NewUsersList = () => (
  <>
    <h3 className="section-title animated fadeInDown">select which type of user will be the new users registered</h3>
    <div className="user-list-container animated fadeInUp">
      <div className="new-user-list">
        <CardNewUser
          username="Test username" 
          email="lmarinvera@mediagistic.com"
          IdUserDemo="demo-1"
          IdUserClient="client-1"
          IdUserStaff="staff-1"
          clientId1="1"
          clientId2="2"
          clientId3="3"
          btnText="Set"
        />
        <CardNewUser
          username="Test username" 
          email="lmarinvera@mediagistic.com"
          IdUserDemo="demo-2"
          IdUserClient="client-2"
          IdUserStaff="staff-2"
          clientId1="4"
          clientId2="5"
          clientId3="6"
          btnText="Set" 
        />
        <CardNewUser
          username="Test username" 
          email="lmarinvera@mediagistic.com"
          IdUserDemo="demo-3"
          IdUserClient="client-3"
          IdUserStaff="staff-3"
          clientId1="7"
          clientId2="8"
          clientId3="9"
          btnText="Set" 
        />
        <CardNewUser
          username="Test username" 
          email="lmarinvera@mediagistic.com"
          IdUserDemo="demo-4"
          IdUserClient="client-4"
          IdUserStaff="staff-4"
          clientId1="10"
          clientId2="11"
          clientId3="12"
          btnText="Set" 
        />
        <CardNewUser
          username="Test username" 
          email="lmarinvera@mediagistic.com"
          IdUserDemo="demo-5"
          IdUserClient="client-5"
          IdUserStaff="staff-5"
          clientId1="13"
          clientId2="14"
          clientId3="15"
          btnText="Set" 
        />
        <CardNewUser
          username="Test username" 
          email="lmarinvera@mediagistic.com"
          IdUserDemo="demo-6"
          IdUserClient="client-6"
          IdUserStaff="staff-6"
          clientId1="16"
          clientId2="17"
          clientId3="18"
          btnText="Set" 
        />
      </div>
    </div> 
  </>
)

const UsersList = () => (
  <>
    <SearchList animation="animated fadeInDown" searchPlaceholder="Search users..." />
      <div className="user-list-container animated fadeInUp">
        <div className="user-list">
          <CardUser
            username="Test username" 
            email="lmarinvera@mediagistic.com"
            firstName="Test first name"
            lastName="Test last name"
            lastLogin="10/10/2021"
            dateJoined="10/10/2021"
            IdUserClient="client-1"
            IdUserStaff="staff-1"
            clientId1="1"
            clientId2="2"
            clientId3="3"
            btnText="Modify" 
          />
          <CardUser
            username="Test username" 
            email="lmarinvera@mediagistic.com"
            firstName="Test first name"
            lastName="Test last name"
            lastLogin="10/10/2021"
            dateJoined="10/10/2021"
            IdUserClient="client-2"
            IdUserStaff="staff-2"
            clientId1="4"
            clientId2="5"
            clientId3="6"
            btnText="Modify" 
          />
          <CardUser
            username="Test username" 
            email="lmarinvera@mediagistic.com"
            firstName="Test first name"
            lastName="Test last name"
            lastLogin="10/10/2021"
            dateJoined="10/10/2021"
            IdUserClient="client-3"
            IdUserStaff="staff-3"
            clientId1="7"
            clientId2="8"
            clientId3="9"
            btnText="Modify" 
          />
          <CardUser
            username="Test username" 
            email="lmarinvera@mediagistic.com"
            firstName="Test first name"
            lastName="Test last name"
            lastLogin="10/10/2021"
            dateJoined="10/10/2021"
            IdUserClient="client-4"
            IdUserStaff="staff-4"
            clientId1="10"
            clientId2="11"
            clientId3="12"
            btnText="Modify" 
          />
          <CardUser
            username="Test username" 
            email="lmarinvera@mediagistic.com"
            firstName="Test first name"
            lastName="Test last name"
            lastLogin="10/10/2021"
            dateJoined="10/10/2021"
            IdUserClient="client-5"
            IdUserStaff="staff-5"
            clientId1="13"
            clientId2="14"
            clientId3="15"
            btnText="Modify" 
          />
          <CardUser
            username="Test username" 
            email="lmarinvera@mediagistic.com"
            firstName="Test first name"
            lastName="Test last name"
            lastLogin="10/10/2021"
            dateJoined="10/10/2021"
            IdUserClient="client-6"
            IdUserStaff="staff-6"
            clientId1="16"
            clientId2="17"
            clientId3="18"
            btnText="Modify" 
          />
        </div>
      </div>
  </>
)

const AccountConfiguration = ({ user }) => {
//   const [userTypes, setUserTypes] = React.useState({
//     0: { name: 'Demo', className: '', checked: user.user_type === 0, activeAgency: user.agency_id, activeCampaign: user.clients[0], activeClient: user.campaigns[0] },
//     1: { name: 'Client', className: '-check', checked: user.user_type === 1, activeAgency: user.agency_id, activeCampaign: 'demo', activeClient: 'demo' },
//     2: { name: 'Staff', className: '-cog', checked: user.user_type === 2, activeAgency: user.agency_id, activeCampaign: 'demo', activeClient: 'demo' }
//   })

  return (
    <div className="account-config-container animated fadeInUp">
    <div className="account-config-form">
      <div className="card-container">
        <div className="user-avatar-container">
          <div className="user-avatar">
            <img src={ProfileImage} />
          </div>
        </div>
        <div className="user-information-container">
          <div className="user-data-container">
            <div className="left">
                <div className="row">
                    <label>Username:</label>
                    <label>demo users</label>
                </div>
                <div className="row">
                    <label>User email:</label>
                    {/* <label> {user.email} </label> */}
                    <label>testwmail@gmail.com</label>
                </div>
                <div className="row">
                    <label>First name:</label>
                    {/* <label>{user.name || 'demo user'}</label>  */}
                    <label>demo user</label>
                </div>
                <div className="row">
                    <label>Last name name:</label>
                    {/* <label>{user.name || 'demo user'}</label>  */}
                    <label>demo user</label>
                </div>
            </div>
            <div className="right">
              {/* <label>User type:</label>
              {  
                user.user_type === 2
                  ? <>
                    { 
                      userTypes.map((userType, index) => (
                        <div className="user-type">
                          <input type="checkbox" checked={userType.checked} onClick={e => console.log(e.target)} name={index} />
                          <label><i className={`user-type-icon fas fa${userType.className}`} /> {userType.name} </label>
                        </div>
                      ))
                    }
                    </>
                  : <div className="user-type">
                    <label htmlFor="staff-7"><i className={`user-type-icon fas fa-user${userTypes[user.user_type].className}`} /> {userTypes[user.user_type].name} </label>
                    </div>
              } */}
                <label>User type:</label>
                <div className="user-type">
                    <label htmlFor="1"><i className="user-type-icon fas fa-user"></i>Demo</label>
                </div>
            </div>
          </div>
          <div className="user-selects">
            <div className="select-container">
              <button className="select-btn">
                My Agency
                <i className="select-icon fas fa-angle-down" />
              </button>
              <div className="list-container">
                {
                  /* <label className='agency-option active' tabIndex="1">demo1</label>
                <label className="agency-option" tabIndex="2">Mediagistic Inc</label>
                <label className="agency-option" tabIndex="3">Agency Name</label> */
                }
                {/* <label className='agency-option active' tabIndex="1"> {user.agency_id} </label> */}
                <label className='agency-option active' tabIndex="1"> demo </label>
              </div>
            </div>
            <div className="select-container">
              <button className="select-btn">
                My Clients
                <i className="select-icon fas fa-angle-down" />
              </button>
              <div className="list-container">
                {/* {  
                  user.clients.map((client, index) => (
                    <div className="row"><input type="checkbox" id="19" /><label className="client-option" htmlFor="19">{client}</label></div>
                  ))
                } */}
                <div className="row"><input type="checkbox"/><label className="client-option">Demo</label></div>
                <div className="row"><input type="checkbox"/><label className="client-option">Coconut Bay</label></div>
                <div className="row"><input type="checkbox"/><label className="client-option">Saint Lucia</label></div>
              </div>
            </div>
          </div>
          <div className="user-selects">
            <div className="select-container">
              <button className="select-btn">
                Active campaigns
                <i className="select-icon fas fa-angle-down" />
              </button>
              <div className="list-container">
                {/* { 
                  user.campaigns.map(campaign => (
                    <label className="agency-option" tabIndex="1">{campaign}</label>
                  ))
                 } */}
                <label className="agency-option active" tabIndex="1">Demo</label>
                <label className="agency-option" tabIndex="2">Mediagistic Inc</label>
                <label className="agency-option" tabIndex="3">Agency Name</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="change-text">Change your password</p>
      <DashInput
        inputTitle='Current Password'
        inputId='currentPassword'
        inputType="password"
      />
      <DashInput
        inputTitle='New Password'
        inputId='password'
        inputType="password"
      />
      <DashInput
        inputTitle='Confirm Password'
        inputId='confirmedPassword'
        inputType="password"
      />
    </div>
    <div className="crud-btn-container">
      <button className="crud-btn"><i className="crud-icon fas fa-sync-alt" />Update</button>
      <button className="crud-btn"><i className="crud-icon fas fa-trash-alt" />Delete</button>
    </div>
    </div>
  )
}

const User = () =>{
    // const { data, mockedData } = useContext(UserContext)

    // const userConfiguration = {
    //   0: data.length ? data[0] : mockedData,
    //   1: data.length ? data[0] : mockedData,
    //   2: data.length ? data[0] : mockedData
    // }

    // const tabs = data.length && data[0].user_type === 2
    //   ? [
    //     { name: 'New users list', Component: NewUsersList, props: {} },
    //     { name: 'Users list', Component: UsersList, props: {} },
    //     { name: 'Account configuration', Component: AccountConfiguration, props: { user: userConfiguration[data[0].user_type] } }
    //   ]
    //   : [
    //     { name: 'Account configuration', Component: AccountConfiguration, props: { user: userConfiguration[data[0].user_type] } }
    //   ]

    const tabs = [
      { name: 'New users list', Component: NewUsersList, props: {} },
      { name: 'Users list', Component: UsersList, props: {} },
    //   { name: 'Account configuration', Component: AccountConfiguration, props: { user: data.length ? userConfiguration[data[0].user_type] : mockedData[0] } }
      { name: 'Account configuration', Component: AccountConfiguration, props: {} }
    ]

    const useTabController = (tabs) => {
        const [activeTab, setActiveTab] = useState(0)

        return {
            activeTab: () => tabs[activeTab],
            setActiveTab: tabIndex => setActiveTab(tabIndex),
            isActiveTab: tabIndex => activeTab === tabIndex,
            tabs: () => tabs
        }
    }
    
    const tabController = useTabController(tabs)

    const ActiveTab = tabController.activeTab()

    return(
        <div className="user-section-container animated fadeInUp">

        {/* CASO: si el usuario es STAFF */}
          <div className="user-section-menu">
            <div className="user-menu-box" style={tabController.tabs().length > 1 ? {} : { flexDirection: 'column', alignItems: 'center' }}>
              {tabController.tabs().map((tab, index) => (
                <button className={tabController.isActiveTab(index) ? 'active' : ''} onClick={() => tabController.setActiveTab(index)}> {tab.name} </button>
              ))}
            </div>
          </div>
          <ActiveTab.Component {...ActiveTab.props} />
        </div>
    )
}

export default User
