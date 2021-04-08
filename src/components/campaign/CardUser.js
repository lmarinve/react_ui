import React from 'react'
import { Select, SelectCheckbox } from './Select'

// Elementos de prueba para las selects
const agenciesTest = ["Demo", "Mediagistic Inc", "Agency #3", "Agency #4"]
const clientsTest = ["Demo", "Coconut Bay", "Saint Lucia"]

const CardNewUser = (props) =>{
    const {username, email, btnText, handleClick} = props
    const handleCheckboxClick = (event) => {
        event.preventDefault()
    }

    return(
        <div className="card-container">
            <div className="user-data-container">
                <div className="left">
                    <div className="row">
                        <label>Username:</label>
                        <label>{username}</label>
                    </div>
                    <div className="row">
                        <label>User email:</label>
                        <label>{email}</label>
                    </div>
                </div>
                <div className="right">
                    <label>User type:</label>
                    <div className="user-type">
                        <input type="checkbox" checked onClick={handleCheckboxClick} />
                        <label><i className="user-type-icon fas fa-user-clock" />Demo</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" onClick={handleCheckboxClick} />
                        <label><i className="user-type-icon fas fa-user-tag" />Client</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" onClick={handleCheckboxClick} />
                        <label><i className="user-type-icon fas fa-user-cog" />Staff</label>
                    </div>
                </div>
            </div>
            <div className="user-selects">
                <Select 
                  title="My Agency"
                  elementsName="agencies"
                  options={agenciesTest}
                />
                <SelectCheckbox 
                  title="My Clients"
                  elementsName="clients"
                  options={clientsTest}
                />
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn" onClick={handleClick}>{btnText}</button>
            </div>
        </div>
    )
}

const CardUser = (props) => {
    const { handleClick, username, email, firstName, lastName, lastLogin, dateJoined, IdUserDemo, IdUserClient, IdUserStaff, clientId1, clientId2, clientId3, btnText} = props
    const handleCheckboxClick = (event) => {
        event.preventDefault()
    }
    return(
        <div className="card-container">
            <div className="user-data-container">
                <div className="left">
                    <div className="row">
                        <label>Username:</label>
                        <label>{username}</label>
                    </div>
                    <div className="row">
                        <label>User email:</label>
                        <label>{email}</label>
                    </div>
                    <div className="row">
                        <label>First name</label>
                        <label>{firstName}</label>
                    </div>
                    <div className="row">
                        <label>Last name</label>
                        <label>{lastName}</label>
                    </div>
                </div>
                <div className="right">
                    <label>User type:</label>
                    <div className="user-type">
                        <input type="checkbox" id={IdUserDemo} onClick={handleCheckboxClick} />
                        <label htmlFor={IdUserDemo}><i className="user-type-icon fas fa-user" />Demo</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" id={IdUserClient} checked onClick={handleCheckboxClick} />
                        <label htmlFor={IdUserClient}><i className="user-type-icon fas fa-user-check" />Client</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" id={IdUserStaff} onClick={handleCheckboxClick} />
                        <label htmlFor={IdUserStaff}><i className="user-type-icon fas fa-user-cog" />Staff</label>
                    </div>
                </div>
            </div>
            <div className="user-data-container mid">
                <div className="left">
                    <div className="row">
                        <label>Last login:</label>
                        <label>{lastLogin}</label>
                    </div>
                    <div className="row">
                        <label>Date joined:</label>
                        <label>{dateJoined}</label>
                    </div>
                </div>
                <div className="right">
                    <div className="row">
                        <label>Is active:</label>
                        <input type="checkbox" />
                    </div>
                    <div className="row">
                        <label>Is superuser:</label>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>
            <div className="user-selects">
                <Select 
                  title="My Agency"
                  elementsName="agencies"
                  options={agenciesTest}
                />
                <SelectCheckbox 
                  title="My Clients"
                  elementsName="clients"
                  options={clientsTest}
                />
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn" onClick={handleClick}>{btnText}</button>
            </div>
        </div>
    )
}

export { CardNewUser, CardUser }
