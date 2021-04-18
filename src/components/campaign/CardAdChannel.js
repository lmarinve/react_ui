import React from 'react'
import { Select, SelectCheckbox } from './Select'

const CardAdChannel = (props) =>{

    const injectionTest = ["Airfare", "Airline", "Destination city name", "Destination airport code", "Origin temperature", "Destination temperature", "Snow", "Origin city name", "Destination city name"]
    const campaignTest = ["Campaign #1", "Campaign #2"]

    const {AdChannelName, AdChannelStart, AdChannelEnd, AdAccountId, AdChannelBudget, handleUpdate} = props
    return(
        <div className="card-container">
            <div className="row">
                <label>Name:</label>
                <label>{AdChannelName}</label>
            </div>
            <div className="row">
                <label>Start date:</label>
                <label>{AdChannelStart}</label>
            </div>
            <div className="row">
                <label>End date:</label>
                <label>{AdChannelEnd}</label>
            </div>
            <div className="row">
                <label>Ad account ID:</label>
                <label>{AdAccountId}</label>
            </div>
            <div className="row">
                <label>Base budget:</label>
                <label>${AdChannelBudget}</label>
            </div>
            <div className="ad-channel-selects">
                <SelectCheckbox
                  title="Copy injection"
                  elementsName="Copy injections"
                  options={injectionTest}
                />
                <Select 
                  title="Campaigns"
                  elementsName="Campaigns"
                  options={campaignTest}
                />
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn" onClick={handleUpdate}>Update</button>
            </div>
        </div>
    )
}

export default CardAdChannel
