import React from 'react'
import SearchList from '../SearchList'
import CardMap from '../CardMap'
import useTabController from '../../../_helpers/UseTabController'

const MapsList = () => (
    <div className="maps-list-container animated fadeInUp">
        <div className="maps-list">
            <CardMap 
              mapId="Test ID"
              priority="10"
              value1="20"
              value2="30"
              percentChange="2"
              days="50"
            />
            <CardMap 
              mapId="Test ID"
              priority="1"
              value1="20"
              value2="30"
              percentChange="2"
              days="5"
            />
        </div>
    </div>
)

const MyMaps = () => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search maps..." />
        <div className="maps-list-container animated fadeInUp">
            <div className="maps-list">
                <CardMap 
                mapId="Test ID"
                priority="10"
                value1="20"
                value2="30"
                percentChange="2"
                days="50"
                />
                <CardMap 
                mapId="Test ID"
                priority="1"
                value1="20"
                value2="30"
                percentChange="2"
                days="5"
                />
            </div>
        </div>
    </>
)
const MapsConfigutation = () => (
    <div className="maps-config-container animated fadeInUp">
                <div className="card-container">
                    <div className="row">
                        <div className="box">
                            <label>Map ID:</label>
                            <input type="text" />
                        </div>
                        <div className="mid">
                            <label>Priority:</label>
                            <input type="text" />
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
                                <input type="text" />
                            </div>
                            <div className="right">
                                <label>Value 2:</label>
                                <input type="text" />
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
                                    <label>[:]</label>
                                    <label>{'>'}</label>
                                    <label>{'> ='}</label>
                                </div>
                            </div>
                        </div>
                        <div className="box">
                            <label>% change:</label>
                            <input type="text" />
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
                            <input type="text" />
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
                </div>
                <div className="crud-btn-container">
                    <button className="crud-btn"><i className="crud-icon far fa-file-plus" />Create</button>
                    <button className="crud-btn"><i className="crud-icon fas fa-sync-alt" />Update</button>
                    <button className="crud-btn"><i className="crud-icon fas fa-trash-alt" />Delete</button>
                </div>
    </div>
)

const Maps = () =>{
    const { tabs, activeTab, isActiveTab, setActiveTab } = useTabController([
        { name: 'Maps list', Component: MapsList },
        { name: 'My maps', Component: MyMaps },
        { name: 'Maps configuration', Component: MapsConfigutation }
    ])

    const ActiveTab = activeTab().Component

    return (
        <div className="maps-section-container animated fadeInUp">
            <div className="maps-section-menu">
                <div className="maps-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)}> {tab.name} </button>
                        ))
                    }
                </div>
            </div>
            {/* CASO: si el usuario selecciona el boton de Maps list */}
            <ActiveTab />
            
            {/* CASO: si el usuario selecciona el boton de Maps configuration */}
        </div>
    )
}

export default Maps