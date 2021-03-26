import React from 'react'

const CardMap = (props) =>{
    const {mapId, priority, value1, value2, percentChange, days} = props
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
                    <div className="select-container">
                        <button className="select-btn">
                            Connector
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>None</label>
                            <label>And</label>
                            <label>Or</label>
                        </div>
                    </div>
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
                    <div className="select-container">
                        <button className="select-btn">
                            Oper
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>{'<'}</label>
                            <label>{'< ='}</label>
                            <label>{'[:]'}</label>
                            <label>{'>'}</label>
                            <label>{'> ='}</label>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <label>% change:</label>
                    <label className="data">{percentChange}</label>
                </div>
            </div>
            <div className="row">
                <div className="box">
                    <div className="select-container">
                        <button className="select-btn">
                            Tense
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Historical</label>
                            <label>Real time</label>
                            <label>Forecast</label>
                        </div>
                    </div>
                </div>
                <div className="mid">
                    <label>Days:</label>
                    <label className="data">{days}</label>
                </div>
                <div className="box">
                    <div className="select-container">
                        <button className="select-btn">
                            Weather trigger
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>No weather trigger</label>
                            <label>Temperature</label>
                            <label>Snow</label>
                            <label>Wind</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="box">
                    <div className="select-container">
                        <button className="select-btn">
                            Campaign
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Campaign ID</label>
                            <label>Campaign ID</label>
                            <label>Campaign ID</label>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="select-container">
                        <button className="select-btn">
                            Ad channel
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Ad channel ID</label>
                            <label>Ad channel ID</label>
                            <label>Ad channel ID</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="box">
                    <div className="select-container">
                        <button className="select-btn">
                            Rule
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Rule ID</label>
                            <label>Rule ID</label>
                            <label>Rule ID</label>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="select-container">
                        <button className="select-btn">
                            Modifier action
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Pause ad</label>
                            <label>Increase budget</label>
                            <label>Decrease budget</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">Update</button>
            </div>
        </div>
    )
}

export default CardMap