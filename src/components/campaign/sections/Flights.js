import React from 'react'
import useTabController from '../../../_helpers/UseTabController'
import CardFlight from '../CardFlight'
import { Select } from '../Select'

const FlightsList = () =>{
    return(
        <div className="flight-list-container animated fadeInUp">
            <div className="flight-list">
                <CardFlight 
                    name="Test flight #1"
                    origin="Test Origin"
                    destination="Test Destination"
                />
                <CardFlight 
                    name="Test flight #1"
                    origin="Test Origin"
                    destination="Test Destination"
                />
                <CardFlight 
                    name="Test flight #1"
                    origin="Test Origin"
                    destination="Test Destination"
                />
            </div>
        </div>
    )
}

const FlightsConfiguration = () =>{

    const campaignTest = ["campaign #1", "campaign #2"]

    return(
        <div className="flight-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <label>Name:</label>
                    <input type="text"/>
                </div>
                <div className="row">
                    <label>Origin:</label>
                    <input type="text"/>
                </div>
                <div className="row">
                    <label>Destination:</label>
                    <input type="text"/>
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
            <div className="crud-btn-container">
                <button className="crud-btn"><i className="crud-icon far fa-file-plus" />Create</button>
                <button className="crud-btn"><i className="crud-icon fas fa-sync-alt" />Update</button>
                <button className="crud-btn"><i className="crud-icon fas fa-trash-alt" />Delete</button>
            </div>
        </div>
    )
}

const Flights = () => {

    const { tabs, activeTab, setActiveTab, isActiveTab } = useTabController([
        { name: 'Flights list', Component: FlightsList },
        { name: 'Flight configuration', Component: FlightsConfiguration  }
    ])
    const ActiveTab = activeTab()

    return(
        <div className="flight-section-container">
             <div className="flight-section-menu">
                <div className="flight-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button key={UUIDGenerator()} className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)}> {tab.name} </button>
                        ))
                    }
                </div>
            </div>
            <ActiveTab.Component />
        </div>
    )
}

export default Flights