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
  changeMyPassword as changeMyPasswordRequest,
  editUser as editUserRequest,
  editCurrentUser,
  getUsers as getUsersRequest,
  removeUser as removeUserRequest
} from '../../../_services'

import ProfileImage from '../../../images/avatar.png'

function getNumbersInString(string) {
  let tmp = string.split("");
  let map = tmp.map(function(current) {
    if (!isNaN(parseInt(current))) {
      return current;
    }
  });

  let numbers = map.filter(function(value) {
    return value != undefined;
  });

  return numbers.join("");
}

const NewUsersList = ({ users, setActiveTab, setEntity, agencies, clients, adfluence_campaigns }) => (
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
                  setEntity({
                    ...user,
                    agencies: agencies.filter(agency => agency.users.find(singleUser => singleUser === Number(getNumbersInString(user.url)))),
                    clients: clients.filter(client => client.users.find(singleUser => singleUser === Number(getNumbersInString(user.url)))),
                    campaigns: adfluence_campaigns.filter(campaign => campaign.users.find(singleUser => singleUser === Number(getNumbersInString(user.url))))
                  })
                  setActiveTab(2)
                }}
              />
            ))
        }
      </div>
    </div> 
  </>
)

const UsersList = ({ users, setEntity, setActiveTab, agencies, clients, adfluence_campaigns }) => (
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
                btnText="Modify"
                handleClick={() => {
                  setEntity({
                    ...user,
                    agencies: agencies.filter(agency => agency.users.find(singleUser => singleUser === Number(getNumbersInString(user.url)))),
                    clients: clients.filter(client => client.users.find(singleUser => singleUser === Number(getNumbersInString(user.url)))),
                    campaigns: adfluence_campaigns.filter(campaign => campaign.users.find(singleUser => singleUser === Number(getNumbersInString(user.url))))
                  })
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
    data, setData, sendToMyUsers, setAlert, removeUser,token, users
  } = props

  const [user, setUser] = React.useState(() => {
    if (!isThereActiveEntity())
      return { 
        ...myInfo, 
        pk: myInfo.pk, 
        clients: clients, 
        adfluence_campaigns: adfluence_campaigns,
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        modified: false
      }
    else
      return { 
        ...entity(),
        address: entity().address || '',
        city: entity().city || '',
        state: entity().state || '',
        zip: entity().zip || '',
        country: entity().country || '',
        adfluence_campaigns: [],
        modified: false 
      }
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showBadPasswordMessage, setShowBadPasswordMessage] = useState(false)

  const loaders = {
    'update': useLoader(),
    'remove': useLoader()
  }

  const handleChange = event => {
    setErrorMessage('')
    setShowBadPasswordMessage(false)
    setUser({
      ...user,
      [event.target.name]: event.target.value,
      modified: true
    })
  }

  const setUserAsDemo = (event) => {
    if (isThereActiveEntity()) {
      setUser({
        ...user,
        is_staff: false,
        is_superuser: false,
        modified: true
      })
    } else {
      event.preventDefault()
    }
  }
  const setUserAsClient = (event) => {
    if (isThereActiveEntity()) {
      setUser({
        ...user,
        is_staff: true,
        is_superuser: false,
        modified: true
      })
    } else {
      event.preventDefault()
    }
  }
  const setUserAsStaff = (event) => {
    if (isThereActiveEntity()) {
      setUser({
        ...user,
        is_superuser: true,
        modified: true
      })
    } else {
      event.preventDefault()
    }
  }
  const canUpdateUser = () => {
    if (user.first_name && user.last_name && user.address && user.city && user.zip && user.country && user.state)
      return 1
    else {
      if (!user.first_name)
        return setErrorMessage('first name is required')
      else if (!user.last_name)
        return setErrorMessage('last name is required')
      else if (!user.address)
        return setErrorMessage('address is required')
      else if (!user.city)
        return setErrorMessage('city is required')
      else if (!user.zip)
        return setErrorMessage('zip is required')
      else if (!user.country)
        return setErrorMessage('country is required')
      else if (!user.state)
        return setErrorMessage('state is required')
      else
        return setErrorMessage('something went wrong, try again')
    }
  }

  const update = () => {
    if (!user.modified)
      return 0
    
    if (isThereActiveEntity()) {
      return 0
    }
    else {
      if (user.newPassword !== user.confirmedPassword)
        return setShowBadPasswordMessage(true)

      if (user.newPassword && user.confirmedPassword) {
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
        changeMyPasswordRequest(token, user)
          .then((response) => {
            dispatch()
            loaders['update'].loaded()
            document.getElementById('newPassword').value = ''
            document.getElementById('confirmedPassword').value = ''
            setAlert({
              title: 'Yeah!',
              message: 'Your password was succesfully updated',
              icon: 'fas fa-sync-alt'
            })
          })
          .catch(error => {
            loaders['update'].loaded()
            console.log(error)
            setAlert({
              title: 'Oops...',
              message: 'Something went wrong',
              icon: 'fas fa-sync-alt'
            })
          })
      }

      if (canUpdateUser()) {
        loaders['update'].loading()
        editUserRequest(token, user, true)
          .then(() => {
            setAlert({
              title: 'Yeah!',
              message: 'Your user was succesfully updated',
              icon: 'fas fa-sync-alt'
            })
          })
          .catch(() => {
            setAlert({
              title: 'Oh no!',
              message: 'Something went wrong',
              icon: 'far fa-frown'
            })
          })
          .finally(loaders['update'].loaded)
      }
    }

  }

  const editUser = () => {
    if (canUpdateUser()) {
      loaders['update'].loading()
    editUserRequest(token, user, false)
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
  }

  const remove = () => {
    loaders['remove'].loading()
    removeUserRequest(token, user)
        .then((response) => {
          loaders['remove'].loaded()
          sendToMyUsers()
          setAlert({
            title: 'Success!',
            message: 'The user was deleted',
            icon: 'fas fa-sync-alt'
          })
        })
        .catch(error => {
          loaders['remove'].loaded()
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

    const [change, setChange] = useState({status: false, display: 'display-none'});
    const [optional, setOptional] = useState({status: false, display: 'display-none'});

    const onChangePassword = () => {
        if(!change.status){
            setChange({status: true, display: 'display-block'})
        } else {
            setChange({status: false, display: 'display-none'})
        }
    }

    const onChangeOptional = () => {
        if(!optional.status){
            setOptional({status: true, display: 'display-grid'})
        } else {
            setOptional({status: false, display: 'display-none'})
        }
    }
  

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
            <div className="user-main-data-container">
                <div className="left">
                    <div className="row">
                        <label>User email:</label>
                        <label title={user.email}>{user.email}</label>
                    </div>
                    <div className="row">
                        <label>First name:</label>
                        <input type="text" defaultValue={user.first_name} name='first_name' onInput={handleChange} />
                    </div>
                    <div className="row">
                        <label>Last name:</label>
                        <input type="text" defaultValue={user.last_name} name='last_name' onInput={handleChange} />
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
            <div className="optional-info">
                    <label>Optional info: </label><input type="checkbox" onChange={onChangeOptional} />
            </div>
            <div className={`user-additional-data-container ${optional.display}`}>
                    <div className="row">
                        <label>Address:</label>
                        <input type="text" name='address' defaultValue={user.address} onInput={handleChange} />
                    </div>
                    <div className="row">
                        <label>City:</label>
                        <input type="text" name='city' defaultValue={user.city} onInput={handleChange} />
                    </div>
                    <div className="row">
                        <label>State:</label>
                        <input type="text" name='state' defaultValue={user.state} onInput={handleChange} />
                    </div>
                    <div className="row">
                        <label>Zip Code:</label>
                        <input type="text" name='zip' defaultValue={user.zip} onInput={handleChange} />
                    </div>
                    <div className="row">
                        <label>Country:</label>
                        <input type="text" name='country' defaultValue={user.country} onInput={handleChange} />
                    </div>
            </div>
            <div className="user-selects">
                <Select 
                  title="My Agencies"
                  elementsName="agencies"
                  isSelectable
                  options={isThereActiveEntity() ? user.agencies : myInfo.agencies.map(agency => agency.name)}
                />
                <SelectCheckbox 
                  title="My Clients"
                  elementsName="clients"
                  isSelectable
                  options={isThereActiveEntity() ? user.clients : myInfo.clients.map(client => client.name)}
                />
            </div>
            <div className="user-selects">
                <SelectCheckbox 
                  title="Active campaigns"
                  elementsName="campaigns"
                  isSelectable
                  options={isThereActiveEntity() ? user.campaigns : myInfo.campaigns.map(campaign => campaign.name)}
                />
            </div>
            </div>
        </div>
        {
            !isThereActiveEntity()
            && <>
            <div className="change-option">
                <label>Change your password: </label><input type="checkbox" onChange={onChangePassword} />
            </div>
            <div className={`change-password-container ${change.display}`}>
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
            </div>
               </>
        }
        {
          errorMessage &&
            <ErrorMessage message={errorMessage} marginBottom='0.5rem' />
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
    const isSuperuser = users.filter(user => user.is_superuser).find(user => myInfo.email === user.email)

    const tabs = [
      { name: 'Account configuration', Component: AccountConfiguration, props: {} }
    ]

    if (isSuperuser) {
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
