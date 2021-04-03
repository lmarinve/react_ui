import React from 'react'
import { Select, SelectCheckbox } from './Select'

import GoogleLogo from '../../images/G-Logo.png'

const CardAdChannel = (props) =>{

    const injectionTest = ["Airfare", "Airline", "Destination city name", "Destination airport code", "Origin temperature", "Destination temperature", "Snow", "Origin city name", "Destination city name"]
    const cityTest = ["Miami, FL", "Phoenix, AZ", "Austin, TX"]
    const channelTypeTest = ["Google", "Facebook"]
    const actionTypeTest = ["Action Type #1", "Action Type #2"]
    const campaignTest = ["Campaign #1", "Campaign #2"]
    const rulesTest = ["Rules #1", "Rules #2"]

    const {AdChannelId, AdChannelName, AdChannelBudget, AdGroupId, AdAccountId, BaseAdId, AdId, AdCreativeId, PixelId, Headline, injectionId1, injectionId2, injectionId3, injectionId4, injectionId5, injectionId6, injectionId7, injectionId8, injectionId9} = props
    return(
        <div className="card-container">
            <div className="ad-initial-container">
                <div className="left">
                    <div className="row">   
                        <label>Ad channel ID:</label>
                        <label>{AdChannelId}</label>
                    </div>
                    <div className="row">
                        <label>Name:</label>
                        <label>{AdChannelName}</label>
                    </div>
                    <div className="row">
                        <label>Base budget:</label>
                        <label>${AdChannelBudget}</label>
                    </div>
                    <div className="row">
                        <label>Ad group ID:</label>
                        <label>{AdGroupId}</label>
                    </div>
                    <div className="row">
                        <label>Ad account ID:</label>
                        <label>{AdAccountId}</label>
                    </div>
                </div>
                <div className="right">
                    <div className="row">
                        <label>Base ad ID:</label>
                        <label>{BaseAdId}</label>
                    </div>
                    <div className="row">
                        <label>Ad ID:</label>
                        <label>{AdId}</label>
                    </div>
                    <div className="row">
                        <label>Ad creative ID:</label>
                        <label>{AdCreativeId}</label>
                    </div>
                    <div className="row">
                        <label>Pixel ID:</label>
                        <label>{PixelId}</label>
                    </div>
                    <div className="row">
                        <label>Headline:</label>
                        <label>{Headline}</label>
                    </div>
                </div>
            </div>
            <div className="ad-channel-selects">
                <SelectCheckbox
                    title="Copy injection"
                    elementsName="Copy injections"
                    options={injectionTest}
                />
                <Select 
                    title="City"
                    elementsName="Cities"
                    options={cityTest}
                />
            </div>
            <div className="ad-channel-selects">
                <Select 
                    title="Channel type"
                    elementsName="Channel types"
                    options={channelTypeTest}
                />
                <Select 
                    title="Action types"
                    elementsName="Channel types"
                    options={actionTypeTest}
                />
            </div>
            <div className="ad-channel-selects">
                <Select 
                    title="Campaigns"
                    elementsName="Campaigns"
                    options={campaignTest}
                />
                <Select 
                    title="Rules"
                    elementsName="Rules"
                    options={rulesTest}
                />
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">Update</button>
            </div>
        </div>
    )
}

export default CardAdChannel
