import React from 'react'
import { Select } from './Select'

const CardRules = ({ruleId, ruleName, blueBtnText}) =>{

    const rulesTypeTest = ["Flight", "Weather"]
    const campaignTest = ["Campaign #1", "Campaign #2"]
    const mapsTest = ["Maps ID #1", "Maps ID #2"]

    return(
        <div className="card-container">
            <div className="row">
                <label>Rule ID:</label>
                <label>{ruleId}</label>
            </div>
            <div className="row">
                <label>Name:</label>
                <label>{ruleName}</label>
            </div>
            <div className="rules-selects">
                <Select 
                    title="Rule Type"
                    elementsName="Rule Types"
                    options={rulesTypeTest}
                />
                <Select 
                    title="Campaigns"
                    elementsName="Campaigns"
                    options={campaignTest}
                />
            </div>
            <div className="rules-selects">
                <Select 
                    title="Maps"
                    elementsName="Maps"
                    options={mapsTest}
                />
                <button className="blue-btn">{blueBtnText}</button>
            </div>
        </div>
    )
}

export default CardRules