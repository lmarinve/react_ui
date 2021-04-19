import React from 'react'
import { Select } from './Select'

const CardWeather = ({city}) => {

    const campaignTest = ["campaign #1", "campaign #2"]

    return(
        <div className="card-container">
            <div className="row">
                <label>City:</label>
                <label>{city}</label>
            </div>
            <div className="weather-selects">
                <Select 
                    title="Campaign"
                    elementsName="campaigns"
                    options={campaignTest}
                />
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">Update</button>
            </div>
        </div>
    )
}

export default CardWeather