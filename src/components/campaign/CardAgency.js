import React from 'react'

import AgencyPhoto from '../../images/pj_logo.jpg'

const CardAgency = ({agencyId, agencyName, agencyAddress, contactName, contactPhone, contactEmail, blueBtnText, handleClick}) =>{
    return(
        <div className="card-container">
            <div className="agency-photo-container">
                <div className="agency-photo">
                    <i className="agency-icon fas fa-store-alt" />
                    <img src={AgencyPhoto} />
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
                    <div className="select-container">
                        <button className="select-btn">
                            Agency Type
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Demo</label>
                            <label>Marketer</label>
                            <label>Advertiser</label>
                        </div>
                    </div>
                </div>
                <div className="agency-selects">
                    <div className="select-container">
                        <button className="select-btn">
                            Clients
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>STLUC</label>
                            <label>COBAY</label>
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

export default CardAgency