/* eslint-disable react/jsx-fragments */
import React, { useContext, useEffect, useState } from 'react'
import TabController from '../../../_helpers/UseTabController'
import { CardNewUser, CardUser } from '../CardUser'
import DashInput from '../DashInput'
import SearchList from '../SearchList'
import CardButton from '../../CardButton'
import ErrorMessage from '../../ErrorMessage'
import { Select, SelectCheckbox } from '../Select'
import UserContext from '../../../Contexts/User'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import { useLoader } from '../../../_helpers/Loader'
import {
  request,
  editUser as editUserRequest,
  getUsers as getUsersRequest
} from '../../../_services'

import ProfileImage from '../../../images/avatar.png'

const NewUsersList = ({ users, setActiveTab, setEntity }) => (
  <>
    <div className="user-list-container animated fadeInUp">
      <div className="new-user-list">
        {
            users
              .filter(user => !user.is_superuser && !user.is_staff)
              .map((user, i) => (
              <CardNewUser
                key={user.id}
                username={user.username} 
                email={user.email}
                btnText="Set"
                handleClick={() => {
                  setEntity(user)
                  setActiveTab(2)
                }}
              />
            ))
        }
        {/* <CardNewUser
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
        /> */}
      </div>
    </div> 
  </>
)

const UsersList = ({ users, setEntity, setActiveTab }) => (
  <>
    <SearchList animation="animated fadeInDown" searchPlaceholder="Search users..." />
      <div className="user-list-container animated fadeInUp">
        <div className="user-list">
          {
            users
              .filter(user => user.is_staff || user.is_superuser)
              .map((user, i) => (
              <CardUser
                isStaff={user.is_staff}
                isSuperuser={user.is_superuser}
                key={user.id}
                username={user.username}
                email={user.email}
                firstName={user.firstName}
                lastName={user.lastName}
                lastLogin="10/10/2021"
                dateJoined="10/10/2021"
                IdUserClient={user.id}
                IdUserStaff="staff-1"
                clientId1="1"
                clientId2="2"
                clientId3="3"
                btnText="Modify"
                handleClick={() => {
                  setEntity(user)
                  setActiveTab(2)
                }}
              />
            ))
          }
        </div>
      </div>
  </>
)

const AccountConfiguration = (props) => {
  const { 
    myInfo, isThereActiveEntity, entity, 
    setEntity, clients, adfluence_campaigns, 
    data, setData, sendToMyUsers, setAlert, removeUser,token
  } = props

  const [user, setUser] = React.useState(() => {
    if (!isThereActiveEntity())
      return { 
        ...myInfo, 
        clients: clients, 
        adfluence_campaigns: adfluence_campaigns,
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
        modified: false
      }
    else
      return { 
        ...entity(),
        clients: [], 
        adfluence_campaigns: [],
        modified: false 
      }
  })
  const [showBadPasswordMessage, setShowBadPasswordMessage] = useState(false)

  const loaders = {
    'update': useLoader(),
    'remove': useLoader()
  }

  const handleChange = event => {
    setShowBadPasswordMessage(false)
    setUser({
      ...user,
      [event.target.name]: event.target.value,
      modified: true
    })
  }

  const setUserAsDemo = () => {
    setUser({
      ...user,
      is_staff: false,
      is_superuser: false,
      modified: true
    })
  }
  const setUserAsClient = () => {
    setUser({
      ...user,
      is_staff: true,
      is_superuser: false,
      modified: true
    })
  }
  const setUserAsStaff = () => {
    setUser({
      ...user,
      is_superuser: true,
      modified: true
    })
  }

  const update = () => {
    if (!user.modified)
      return 0
    
    if (isThereActiveEntity()) {
      return 0
    }
    else {
      if (user.password !== user.currentPassword || user.newPassword !== user.confirmedPassword)
        return setShowBadPasswordMessage(true)

      loaders['update'].loading()
      const dispatch = () => {
        setData({
          ...data,
          myInfo: {
            ...myInfo,
            password: user.newPassword
          }
        })
        setUser({
          ...user,
          password: user.newPassword,
          currentPassword: '',
          newPassword: '',
          confirmedPassword: '',
        })
      }
      request(dispatch)
        .then((response) => {
          dispatch()
          loaders['update'].loaded()
          document.getElementById('currentPassword').value = ''
          document.getElementById('newPassword').value = ''
          document.getElementById('confirmedPassword').value = ''
          setAlert({
            title: 'Yeah!',
            message: 'Your password was succesfully updated',
            icon: 'fas fa-sync-alt'
          })
        })
        .catch(error => {
          console.log(error)
          setAlert({
            title: 'Oops...',
            message: 'Something went wrong',
            icon: 'fas fa-sync-alt'
          })
        })
    }

  }

  const editUser = () => {
    loaders['update'].loading()
    editUserRequest(token, user)
      .then(response => {
        loaders['update'].loaded()
        sendToMyUsers()
        setAlert({
          title: 'Success!',
          message: 'The user was updated',
          icon: 'fas fa-sync-alt'
        })
      })
      .catch(error => {
        console.log(error.response)
        loaders['update'].loaded()
        setAlert({
          title: 'Oops...',
          message: 'Something went wrong',
          icon: 'fas fa-sync-alt'
        })
      })
  }

  const remove = () => {
    loaders['remove'].loading()
    request(() => null)
        .then((response) => {
          loaders['remove'].loaded()
          removeUser()
          sendToMyUsers()
          setAlert({
            title: 'Success!',
            message: 'The user was deleted',
            icon: 'fas fa-sync-alt'
          })
        })
        .catch(error => {
          console.log(error)
          setAlert({
            title: 'Oops...',
            message: 'Something went wrong',
            icon: 'fas fa-sync-alt'
          })
        })
  }

    // Elementos de prueba para las selects
    const agenciesTest = ["Demo", "Mediagistic Inc", "Agency #3", "Agency #4"]
    const clientsTest = ["Demo", "Coconut Bay", "Saint Lucia"]

  return (
    <div className="account-config-container animated fadeInUp">
      {console.log(entity())}
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
                    <label>{user.username}</label>
                </div>
                <div className="row">
                    <label>User email:</label>
                    <label>{user.email}</label>
                </div>
                <div className="row">
                    <label>First name:</label>
                    <label>{user.first_name}</label>
                </div>
                <div className="row">
                    <label>Last name:</label>
                    <label>{user.last_name}</label>
                </div>
            </div>
            <div className="right">
                <label>User type:</label>
                <div className="user-type">
                    <input onClick={setUserAsDemo} type="checkbox" checked={!user.is_superuser && !user.is_staff} />
                    <label><i className="user-type-icon fas fa-user-clock" />Demo</label>
                </div>
                <div className="user-type">
                    <input onClick={setUserAsClient} type="checkbox" checked={user.is_staff && !user.is_superuser} />
                    <label><i className="user-type-icon fas fa-user-tag" />Client</label>
                </div>
                <div className="user-type">
                    <input onClick={setUserAsStaff} type="checkbox" checked={user.is_superuser} />
                    <label><i className="user-type-icon fas fa-user-cog" />Staff</label>
                </div>
            </div>
          </div>
          <div className="user-selects">
            <Select 
              title="My Agency"
              elementsName="agencies"
              isSelectable
              options={agenciesTest}
            />
            {/* <div className="select-container">
                <button className="select-btn">
                    My Agency
                    <i className="select-icon fas fa-angle-down" />
                </button>
                <div className="list-container">
                    <label className='agency-option active' tabIndex="1"> {user.agencyName} </label>
                </div>
            </div> */}
            <SelectCheckbox 
              title="My Clients"
              elementsName="clients"
              isSelectable
              options={clientsTest}
            />
            {/* <div className="select-container">
              <button className="select-btn">
                My Clients
                <i className="select-icon fas fa-angle-down" />
              </button>
              <div className="list-container">
                {
                  user.clients.length
                    ? user.clients.map((client, i) => (
                      <div key={client.id} className='row'><input type="checkbox" /><label className='client-option'>{client.name}</label></div>
                    ))
                    : <div className='row'> There are no clients </div>
                }
              </div>
            </div> */}
          </div>
          <div className="user-selects">
            <SelectCheckbox 
              title="Active campaigns"
              elementsName="campaigns"
              isSelectable
              options={user.adfluence_campaigns}
            />
            {/* <div className="select-container">
              <button className="select-btn">
                Active campaigns
                <i className="select-icon fas fa-angle-down" />
              </button>
              <div className="list-container">
                {
                  user.adfluence_campaigns.length
                    ? user.adfluence_campaigns.map((campaign, i) => (
                      <label key={campaign.id} className="agency-option" tabIndex="1">{campaign.name}</label>
                    ))
                    : <label className="agency-option" tabIndex="1"> There are no campaigns </label>
                }
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {
        !isThereActiveEntity()
          && <>
            <p className="change-text">Change your password</p>
      <DashInput
        inputTitle='Current Password'
        inputId='currentPassword'
        inputType="password"
        handleChange={handleChange}
      />
      <DashInput
        inputTitle='New Password'
        inputId='newPassword'
        inputType="password"
        handleChange={handleChange}
      />
      <DashInput
        inputTitle='Confirm Password'
        inputId='confirmedPassword'
        inputType="password"
        handleChange={handleChange}
      />
             </>
      }
      {showBadPasswordMessage
          && <ErrorMessage message='The passwords does not match' marginBottom='0.5rem' />}
    </div>
    <div className="crud-btn-container">
      {
        isThereActiveEntity()
          ? <>
            <CardButton 
              text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={editUser}
            />
            <CardButton
              text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={remove}
            />
            </>
          : <CardButton 
            text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={update}
            />
      }
    </div>
    </div>
  )
}

const User = ({ setAlert }) =>{
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { myInfo, agencies, clients, adfluence_campaigns, users } = data

    const tabs = [
      { name: 'Account configuration', Component: AccountConfiguration, props: {} }
    ]

    if (users) {
      tabs.unshift(
        { name: 'New users list', Component: NewUsersList, props: {} },
        { name: 'Users list', Component: UsersList, props: {} },
      )
    }

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
    const ActiveTab = tabController.activeTab().Component
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const sendToMyUsers = () => {
      getUsersRequest(token)
        .then(response => {
          setData({
            ...data,
            users: response.data
          })
          tabController.setActiveTab(1)
        })
    }
    const removeUser = () => {
      const newUsers = data.users.filter(user => user.userId !== entity().userId)
      setData({
        ...data,
        users: newUsers
      })
      sendToMyUsers()
    }

    return(
        <div className="user-section-container animated fadeInUp">

        {/* CASO: si el usuario es STAFF */}
          <div className="user-section-menu">
            <div className="user-menu-box" style={tabController.tabs().length > 1 ? {} : { flexDirection: 'column', alignItems: 'center' }}>
              {tabController.tabs().map((tab, index) => (
                <button 
                  key={index} 
                  className={tabController.isActiveTab(index) ? 'active' : ''} 
                  onClick={() => {
                    if (index === 2)
                      setEntity({})
                      
                    tabController.setActiveTab(index)
                  }}
                > {tab.name} 
                </button>
              ))}
            </div>
          </div>
          <ActiveTab
            data={data}
            setData={setData}
            myInfo={myInfo}
            entity={entity}
            setEntity={setEntity}
            isThereActiveEntity={isThereActiveEntity}
            agencies={agencies}
            clients={clients}
            adfluence_campaigns={adfluence_campaigns}
            sendToMyUsers={sendToMyUsers}
            setAlert={setAlert}
            users={users}
            setActiveTab={tabController.setActiveTab}
            removeUser={removeUser}
            token={token}
          />
        </div>
    )
}

export default User
