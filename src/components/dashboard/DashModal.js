import React, { useState, useEffect, useContext } from 'react'
import Choice, { NewCampaignChoice, WizardChoice } from './Choice.js'
import UserContext, { UserProvider } from '../../Contexts/User'

const DashModal = () => {
    
    const { data } = useContext(UserContext)

    return(
        <div className="dash-modal-container">
            <div className="dash-modal-body">
                <div className="top">
                    <h5 className="modal-title">Welcome back !</h5>
                    <h3>What would you like to do first?</h3>
                </div>
                <div className="center">
                    <div className="row">
                        <Choice
                          frontStatus="front" 
                          iconFront="dashboard-icons far fa-tachometer-alt"
                          textFront="My Dashboard"
                          linkPath='my-dashboard'
                        />
                        <Choice 
                          backStatus="back" 
                          iconBackLeft="dashboard-icons fal fa-store" 
                          textBackLeft="My campaigns"
                          leftLinkPath='my-campaigns'
                          iconBackRight="dashboard-icons far fa-wand-magic"
                          textBackRight="Wizard"
                          linkPath='campaign-wizard'
                        />
                    </div>
                    <div className="row">
                        <Choice
                          frontStatus="front" 
                          iconFront="dashboard-icons far fa-user-secret"
                          textFront="My Account"
                          linkPath='my-account'
                        />             
                        <Choice
                          frontStatus="front" 
                          iconFront="dashboard-icons icon-api-docs-logo-svg"
                          textFront="API Docs"
                          linkPath='https://adfluencepro.com/api/v1/schema/swagger-ui/'
                          newWindow={true}
                        />                           
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DashModal
