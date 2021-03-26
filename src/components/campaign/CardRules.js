import React from 'react'

const CardRules = ({ruleId, ruleName, blueBtnText}) =>{
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
                <div className="select-container">
                    <button className="select-btn">
                        Rule Type
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container rule-type">
                        <label><i className="rule-type-icon fas fa-plane"></i>Flight</label>
                        <label><i className="rule-type-icon fas fa-cloud-sun"></i>Weather</label>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        Campaigns
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                        <label>Campaign ID #1</label>
                        <label>Campaign ID #2</label>
                        <label>Campaign ID #3</label>
                    </div>
                </div>
            </div>
            <div className="rules-selects">
                <div className="select-container">
                    <button className="select-btn">
                        Maps
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                        <label>Maps ID #1</label>
                        <label>Maps ID #2</label>
                    </div>
                </div>
                <button className="blue-btn">{blueBtnText}</button>
            </div>
        </div>
    )
}

export default CardRules