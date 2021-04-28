import React from 'react'
import { Select, SelectCheckbox } from './Select'

import AgencyPhoto from '../../images/traneLogo.jpg'

const CardCampaign = ({adfluence_campaigns, clientId, clientName, clientAddress, contactName, contactPhone, contactEmail, blueBtnText, handleClick}) => {
    
    const clientsTest = ["Demo", "Advertiser", "Marketer"]
    const campaignsTest = ["Campaign #1", "Campaign #2", "Campaign #3"]
    const usersTest = ["lmarinvera@mediagistic.com", "ray@mediagistic.com"]

    return(
        <div className="card-container">
            <div className="client-photo-container">
                <div className="client-photo">
                    <i className="client-icon fas fa-store" />
                    {/* <img src={AgencyPhoto} /> */}
                </div>
            </div>
            <div className="client-data-container">
                <div className="row">
                    <label>Client ID:</label>
                    <label>{clientId}</label>
                </div>
                <div className="row">
                    <label>Name:</label>
                    <label>{clientName}</label>
                </div>
                <div className="row">
                    <label>Address:</label>
                    <label>{clientAddress}</label>
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
                      title="Client Type"
                      elementsName="clients type"
                      isSelectable
                      options={clientsTest}
                    />
                </div>
                <div className="client-selects">
                    <Select 
                      title="Campaigns"
                      elementsName="campaigns"
                      options={adfluence_campaigns.filter(campaign => campaign.client === clientId).map(campaign => campaign.name)}
                    />
                    <Select 
                      title="Users"
                      elementsName="users"
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

export default CardCampaign