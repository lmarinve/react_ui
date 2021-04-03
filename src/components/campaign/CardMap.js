import React from 'react'
import { Select } from './Select'

const CardMap = (props) =>{
    const {mapId, priority, value1, value2, percentChange, days} = props

    const connectorTest = ["None", "And", "Or"]
    const operTest = ["<", "< =", ":", ">", "> ="]
    const tenseTest = ["Historical", "Real time", "Forecast"]
    const weatherTriggerTest = ["No weather trigger", "Temperature", "Snow", "Wind"]
    const campaignTest = ["Campaign #1", "Campaign #2"]
    const adChannelTest = ["Ad channel #1", "Ad channel #2"]
    const rulesTest = ["Rules #1", "Rules #2"]
    const modifierTest = ["Pause ad", "Increase budget", "Decrease budget"]

    return(
        <div className="card-container">
            <div className="row">
                <div className="box">
                    <label>Map ID:</label>
                    <label className="data">{mapId}</label>
                </div>
                <div className="mid">
                    <label>Priority:</label>
                    <label className="data">{priority}</label>
                </div>
                <div className="box">
                    <Select 
                        title="Connector"
                        elementsName="Connectors"
                        options={connectorTest}
                    />
                </div>
            </div>
            <div className="row operation">
                <div className="box values">
                    <div className="left">
                        <label>Value 1:</label>
                        <label className="data">{value1}</label>
                    </div>
                    <div className="right">
                        <label>Value 2:</label>
                        <label className="data">{value2}</label>
                    </div>
                </div>
                <div className="mid">
                    <Select 
                        title="Oper"
                        elementsName="Opers"
                        options={operTest}
                    />
                </div>
                <div className="box">
                    <label>% change:</label>
                    <label className="data">{percentChange}</label>
                </div>
            </div>
            <div className="row">
                <div className="box">
                    <Select 
                        title="Tense"
                        elementsName="Tenses"
                        options={tenseTest}
                    />
                </div>
                <div className="mid">
                    <label>Days:</label>
                    <label className="data">{days}</label>
                </div>
                <div className="box">
                    <Select 
                        title="Weather trigger"
                        elementsName="Weather triggers"
                        options={weatherTriggerTest}
                    />
                </div>
            </div>
            <div className="row">
                <div className="box">
                    <Select 
                        title="Campaign"
                        elementsName="Campaign"
                        options={campaignTest}
                    />
                </div>
                <div className="box">
                    <Select 
                        title="Ad channel"
                        elementsName="Ad channels"
                        options={adChannelTest}
                    />
                </div>
            </div>
            <div className="row">
                <div className="box">
                    <Select 
                        title="Rules"
                        elementsName="Rules"
                        options={rulesTest}
                    />
                </div>
                <div className="box">
                    <Select 
                        title="Modifier action"
                        elementsName="Modifier actions"
                        options={modifierTest}
                    />
                </div>
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">Update</button>
            </div>
        </div>
    )
}

export default CardMap