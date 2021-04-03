import React from 'react'
import Campaign from './sections/Campaign'
import { Select } from './Select'

const Card = (props) => {
    const {campaignImage, CampaignId, CampaignName, CampaignStart, CampaignEnd, CampaignBudget, CampaignStatus, blueBtnText, handleClick} = props
    
    const clientsTest = ["Client ID", "Client ID", "Client ID"]
    const injectionTest = ["Injection tags #1", "Injection  tags #2", "Injection tags #3"]
    const adChannelTest = ["Ad channel #1", "Ad channel #2", "Ad channel #3"]
    const usersTest = ["lmarinvera@mediagistic.com", "ray@mediagistic.com"]
    
    return(
        <div className="card-container">
            <div className="campaign-photo-container">
                <div className="campaign-photo">
                    <i className="campaign-icon fas fa-store-alt" />
                    <img src={campaignImage} />
                </div>
            </div>
            <div className="campaign-data-container">
                <div className="row">
                    <label>Campaign ID:</label>
                    <label>{CampaignId}</label>
                </div>
                <div className="row">
                    <label>Name:</label>
                    <label>{CampaignName}</label>
                </div>
                <div className="row">
                    <label>Start date:</label>
                    <label>{CampaignStart}</label>
                </div>
                <div className="row">
                    <label>End date:</label>
                    <label>{CampaignEnd}</label>
                </div>
                <div className="row">
                    <label>Base daily budget:</label>
                    <label>${CampaignBudget}</label>
                </div>
                <div className="status-row">
                    <div className="status">
                        <label>Active:</label>
                        <input type="checkbox" />
                    </div>
                </div>
                <div className="campaign-selects">
                    <Select 
                        title="Clients"
                        elementsName="clients"
                        options={clientsTest}
                    />
                    <Select 
                        title="Copy injection tags"
                        elementsName="Copy injection tags"
                        options={injectionTest}
                    />
                </div>
                <div className="campaign-selects">
                    <Select 
                        title="Ad channel"
                        elementsName="Ad channels"
                        options={adChannelTest}
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

export default Card
