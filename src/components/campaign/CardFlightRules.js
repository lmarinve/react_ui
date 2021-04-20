import React from 'react'
import { Select } from './Select'

const FlightCardRules = ({name, priority, lowPrice, highPrice, percentChange, blueBtnText, handleUpdate}) =>{

    const connectorOptions = ["None", "And", "Or"]
    const LogicOptions = ["<", "< =", ":", ">", "> ="]
    const ModifierOptions = ["Pause ad", "Increase budget", "Decrease budget"]

    return(
        <div className="card-container">
            <div className="row">
                <div className="box">
                    <label>Name:</label>
                    <label className="data" title={name}>{name}</label>
                </div>
                <div className="mid">
                    <label>Priority:</label>
                    <label className="data" title={priority}>{priority}</label>
                </div>
                <div className="box">
                    <Select 
                      title="Connector"
                      elementsName="Connectors"
                      options={connectorOptions}
                    />
                </div>
            </div>
            <div className="row">
                <div className="box">
                    <label>Low price:</label>
                    <label className="data" title={lowPrice}>{lowPrice}</label>
                </div>
                <div className="mid">
                    <Select 
                      title="Logic"
                      elementsName="Opers"
                      options={LogicOptions}
                    />
                </div>
                <div className="box">
                    <label>High price:</label>
                    <label className="data" title={highPrice}>{highPrice}</label>
                </div>
            </div>
            <div className="row">
                <Select 
                  title="Modifier action"
                  elementsName="Modifier actions"
                  options={ModifierOptions}
                />
                <div className="mid">
                    <label>% change:</label>
                    <label className="data" title={percentChange}>{percentChange}</label>
                </div>
                <div className="box">
                    <button className="blue-btn" onClick={handleUpdate}>{blueBtnText}</button>
                </div>
            </div>
        </div>
    )
}

export default FlightCardRules