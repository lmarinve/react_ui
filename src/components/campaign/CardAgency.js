import React from 'react'
import { Select, SelectCheckbox } from './Select'

import AgencyPhoto from '../../images/pj_logo.jpg'

const CardAgency = ({agencyId, agencyName, agencyAddress, contactName, contactPhone, contactEmail, blueBtnText, handleClick}) =>{
    
    const agenciesTest = ["Demo", "Advertiser", "Marketer"]
    const clientsTest = ["STLUC", "COBAY"]
    const usersTest = ["lmarinvera@mediagistic.com", "ray@mediagistic.com"]

    return(
        <div className="card-container">
            <div className="agency-photo-container">
                <div className="agency-photo">
                    <i className="agency-icon fas fa-store-alt" />
                    {/* <img src={AgencyPhoto} /> */}
                </div>
            </div>
            <div className="agency-data-container">
                <div className="row">
                    <label>Agency ID:</label>
                    <label>{agencyId}</label>
                </div>
                <div className="row">
                    <label>Name:</label>
                    <label>{agencyName}</label>
                </div>
                <div className="row">
                    <label>Address:</label>
                    <label>{agencyAddress}</label>
                </div>
                <div className="row">
                    <label>Contact name:</label>
                    <label>{contactName}</label>
                </div>
                <div className="row">
                    <label>Contact phone:</label>
                    <label>{contactPhone}</label>
                </div>
                <div className="row">
                    <label>Contact email:</label>
                    <label>{contactEmail}</label>
                </div>
                <div className="status-row">
                    <div className="status">
                        <label>Active:</label>
                        <input type="checkbox" />
                    </div>
                    <SelectCheckbox 
                        title="Agency Type"
                        elementsName="agencies type"
                        isSelectable
                        options={agenciesTest}
                    />
                </div>
                <div className="agency-selects">
                    <Select 
                        title="Clients"
                        elementsName="clients"
                        isSelectable
                        options={clientsTest}
                    />
                    <Select 
                        title="Users"
                        elementsName="users"
                        isSelectable
                        options={usersTest}
                    />
                </div>
                <div className="blue-btn-container">
                    <button className="blue-btn" onClick={handleClick}>{blueBtnText}</button>
                </div>
            </div>
        </div>
    )
}

export default CardAgency