import React from 'react'
import Campaign from './sections/Campaign'

const Card = (props) => {
    const {campaignImage, CampaignId, CampaignName, CampaignStart, CampaignEnd, CampaignBudget, CampaignStatus, blueBtnText, handleClick} = props
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
                <div className="row">
                    <label>Status:</label>
                    <label>{CampaignStatus}</label>
                </div>
                <div className="campaign-selects">
                    <div className="select-container">
                        <button className="select-btn">
                            Client
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Client ID</label>
                            <label>Client ID</label>
                            <label>Client ID</label>
                        </div>
                    </div>
                    <div className="select-container">
                        <button className="select-btn">
                            Copy injection tags
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Copy injection tags #1</label>
                            <label>Copy injection tags #2</label>
                            <label>Copy injection tags #3</label>
                        </div>
                    </div>
                </div>
                <div className="campaign-selects">
                    <div className="select-container">
                        <button className="select-btn">
                            Ad channel
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Ad channel #1</label>
                            <label>Ad channel #2</label>
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

export default Card
