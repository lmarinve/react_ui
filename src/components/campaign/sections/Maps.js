import React from 'react'
import SearchList from '../SearchList'
import CardMap from '../CardMap'
import useTabController from '../../../_helpers/UseTabController'
import { Select } from '../Select'

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
const MapsConfigutation = () => {
    
    const connectorTest = ["None", "And", "Or"]
    const operTest = ["<", "< =", ":", ">", "> ="]
    const tenseTest = ["Historical", "Real time", "Forecast"]
    const weatherTriggerTest = ["No weather trigger", "Temperature", "Snow", "Wind"]
    const campaignTest = ["Campaign #1", "Campaign #2"]
    const adChannelTest = ["Ad channel #1", "Ad channel #2"]
    const rulesTest = ["Rules #1", "Rules #2"]
    const modifierTest = ["Pause ad", "Increase budget", "Decrease budget"]
    
    return(
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
                            <Select 
                              title="Connector"
                              elementsName="Connectors"
                              isSelectable
                              options={connectorTest}
                            />
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
                            <Select 
                              title="Oper"
                              elementsName="Opers"
                              isSelectable
                              options={operTest}
                            />
                        </div>
                        <div className="box">
                            <label>% change:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="box">
                            <Select 
                              title="Tense"
                              elementsName="Tenses"
                              isSelectable
                              options={tenseTest}
                            />
                        </div>
                        <div className="mid">
                            <label>Days:</label>
                            <input type="text" />
                        </div>
                        <div className="box">
                            <Select 
                              title="Weather trigger"
                              elementsName="Weather triggers"
                              isSelectable
                              options={weatherTriggerTest}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="box">
                            <Select 
                              title="Campaign"
                              elementsName="Campaign"
                              isSelectable
                              options={campaignTest}
                            />
                        </div>
                        <div className="box">
                            <Select 
                              title="Ad channel"
                              elementsName="Ad channels"
                              isSelectable
                              options={adChannelTest}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="box">
                            <Select 
                              title="Rules"
                              elementsName="Rules"
                              isSelectable
                              options={rulesTest}
                            />
                        </div>
                        <div className="box">
                            <Select 
                              title="Modifier action"
                              elementsName="Modifier actions"
                              isSelectable
                              options={modifierTest}
                            />
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
}

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
                            <button key={UUIDGenerator()} className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)}> {tab.name} </button>
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