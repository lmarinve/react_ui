import React from 'react'

const CardNewUser = (props) =>{
    const {username, email, IdUserDemo, IdUserClient, IdUserStaff, clientId1, clientId2, clientId3, btnText} = props
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
                        <input type="checkbox" id={IdUserDemo}/>
                        <label htmlFor={IdUserDemo}><i className="user-type-icon fas fa-user"></i>Demo</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" id={IdUserClient}/>
                        <label htmlFor={IdUserClient}><i className="user-type-icon fas fa-user-check"></i>Client</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" id={IdUserStaff}/>
                        <label htmlFor={IdUserStaff}><i className="user-type-icon fas fa-user-cog"></i>Staff</label>
                    </div>
                </div>
            </div>
            <div className="user-selects">
                <div className="select-container">
                    <button className="select-btn">
                        My Agency
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container">
                        <label className="agency-option active" tabIndex="1">Demo</label>
                        <label className="agency-option" tabIndex="2">Mediagistic Inc</label>
                        <label className="agency-option" tabIndex="3">Agency Name</label>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        My Clients
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container">
                        <div className="row"><input type="checkbox" id={clientId1}/><label className="client-option" htmlFor={clientId1}>Demo</label></div>
                        <div className="row"><input type="checkbox" id={clientId2}/><label className="client-option" htmlFor={clientId2}>Coconut Bay</label></div>
                        <div className="row"><input type="checkbox" id={clientId3}/><label className="client-option" htmlFor={clientId3}>Saint Lucia</label></div>
                    </div>
                </div>
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">{btnText}</button>
            </div>
        </div>
    )
}

const CardUser = (props) => {
    const {username, email, firstName, lastName, lastLogin, dateJoined, IdUserDemo, IdUserClient, IdUserStaff, clientId1, clientId2, clientId3, btnText} = props
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
                        <input type="checkbox" id={IdUserDemo}/>
                        <label htmlFor={IdUserDemo}><i className="user-type-icon fas fa-user"></i>Demo</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" id={IdUserClient}/>
                        <label htmlFor={IdUserClient}><i className="user-type-icon fas fa-user-check"></i>Client</label>
                    </div>
                    <div className="user-type">
                        <input type="checkbox" id={IdUserStaff}/>
                        <label htmlFor={IdUserStaff}><i className="user-type-icon fas fa-user-cog"></i>Staff</label>
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
                        <input type="checkbox"/>
                    </div>
                    <div className="row">
                        <label>Is superuser:</label>
                        <input type="checkbox"/>
                    </div>
                </div>
            </div>
            <div className="user-selects">
                <div className="select-container">
                    <button className="select-btn">
                        My Agency
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container">
                        <label className="agency-option active" tabIndex="1">Demo</label>
                        <label className="agency-option" tabIndex="2">Mediagistic Inc</label>
                        <label className="agency-option" tabIndex="3">Agency Name</label>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        My Clients
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container">
                        <div className="row"><input type="checkbox" id={clientId1}/><label className="client-option" htmlFor={clientId1}>Demo</label></div>
                        <div className="row"><input type="checkbox" id={clientId2}/><label className="client-option" htmlFor={clientId2}>Coconut Bay</label></div>
                        <div className="row"><input type="checkbox" id={clientId3}/><label className="client-option" htmlFor={clientId3}>Saint Lucia</label></div>
                    </div>
                </div>
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">{btnText}</button>
            </div>
        </div>
    )
}

export { CardNewUser, CardUser}
