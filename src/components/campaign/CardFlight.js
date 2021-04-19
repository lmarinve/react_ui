import React from 'react'
import { Select } from './Select'

const CardFlight = ({name, origin, destination}) => {

    const campaignTest = ["campaign #1", "campaign #2"]

    return(
        <div className="card-container">
            <div className="row">
                <label>Name:</label>
                <label>{name}</label>
            </div>
            <div className="row">
                <label>Origin:</label>
                <label>{origin}</label>
            </div>
            <div className="row">
                <label>Destination:</label>
                <label>{destination}</label>
            </div>
            <div className="flight-selects">
                <Select 
                    title="Campaign"
                    elementsName="campaigns"
                    options={campaignTest}
                />
                <button className="blue-btn">Update</button>
            </div>
        </div>
    )
}

export default CardFlight