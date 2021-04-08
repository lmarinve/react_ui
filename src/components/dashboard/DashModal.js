import React, { useState, useEffect, useContext } from 'react'
import Choice, { NewCampaignChoice, WizardChoice } from './Choice.js'
import UserContext, { UserProvider } from '../../Contexts/User'
import { 
  getUsers as getUsersRequest,
  getUserAgencies as getUserAgenciesRequest, 
  getUserClients as getUserClientsRequest,
  getUserAdfluenceCampaigns as getUserAdfluenceCampaignsRequest ,
  getMyInfo as getMyInfoRequest
} from '../../_services'

const DashModal = () => {
    
  const token = localStorage.getItem('token')
  const { mockedData, data, setData } = useContext(UserContext)
  const { agencies, clients, adfluence_campaigns } = data

  useEffect(() => {
    let requests = [getMyInfoRequest(token), getUsersRequest(token), getUserAgenciesRequest(token), getUserClientsRequest(token), getUserAdfluenceCampaignsRequest(token)]
    Promise.allSettled(requests)
      .then(responses => {
          setData({
            ...data,
            users: responses[1].status === 'rejected' ? null : responses[1].value.data,
            agencies: responses[2].status === 'rejected' ? [] : responses[2].value.data,
            clients: responses[3].status === 'rejected' ? [] : responses[3].value.data,
            adfluence_campaigns: responses[4].status === 'rejected' ? [] : responses[4].value.data
          })
      })
      .catch(console.log)
  }, [])

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
                          newWindow
                        />                           
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DashModal
