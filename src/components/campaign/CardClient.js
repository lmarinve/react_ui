import React from 'react'

import AgencyPhoto from '../../images/traneLogo.jpg'

const CardCampaign = ({clientId, clientName, clientAddress, contactName, contactPhone, contactEmail, blueBtnText, handleClick}) => {
    return(
        <div className="card-container">
            <div className="client-photo-container">
                <div className="client-photo">
                    <i className="client-icon fas fa-store" />
                    <img src={AgencyPhoto} />
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
                    <div className="select-container">
                        <button className="select-btn">
                            Client Type
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Demo</label>
                            <label>Marketer</label>
                            <label>Advertiser</label>
                        </div>
                    </div>
                </div>
                <div className="client-selects">
                    <div className="select-container">
                        <button className="select-btn">
                            Campaigns
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Campaign #1</label>
                            <label>Campaign #2</label>
                        </div>
                    </div>
                    <div className="select-container">
                        <button className="select-btn">
                            Users
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>lmarinvera@mediagistic.com</label>
                            <label>ray@mediagistic.com</label>
                        </div>
                    </div>
                </div>
                <div className="blue-btn-container">
                    <button className="blue-btn" onClick={handleClick}>{blueBtnText}</button>
                </div>
            </div>
        </div>
    )
}

export default CardCampaign