/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import AgencyPhoto from '../images/pj_logo.jpg'
import ClientPhoto from '../images/traneLogo.jpg'

const Photos = {
    'Agency': AgencyPhoto,
    'Client': ClientPhoto
}

const ConfigurationCard = ({ entity, handleChange, itemsName, entityName, isThereActiveEntity, agencies }) => (
    <div className="card-container">
            <div className={`${entityName.toLowerCase()}-photo-container`}>
              <div className={`${entityName.toLowerCase()}-photo pointer`}>
                <i className={`${entityName.toLowerCase()}-icon fas fa-store-alt`} />
                <img src={Photos[entityName]} />
                <div className="upload-img-container">
                  <input type="file" />
                  <i className="upload-icon fal fa-upload" />
                </div>
              </div>
            </div>
            <div className={`${entityName.toLowerCase()}-data-container`}>
              <div className="row">
                <label>Name:</label>
                <input type="text" name='name' onChange={handleChange} onInput={handleChange} value={entity.name} />
              </div>
              {
                  entityName === 'Client' && isThereActiveEntity()
                    && <div className="row">
                      <label>Agency name:</label>
                      <input type="text" name='agencyName' value={entity.agencyName} onChange={handleChange} onInput={handleChange} />
                    </div>
              }
              <div className="row">
                <label>Address:</label>
                <input type="text" />
              </div>
              <div className="row">
                <label>Contact name:</label>
                <input type="text" />
              </div>
              <div className="row">
                <label>Contact phone:</label>
                <input type="text" />
              </div>
              <div className="row">
                <label>Contact email:</label>
                <input type="text" />
              </div>
              <div className="status-row">
                <div className="status">
                  <label>Active:</label>
                  <input type="checkbox" />
                </div>
                <div className="select-container">
                  <button className="select-btn">
                    {entityName} Type
                    <i className="select-icon fas fa-angle-down" />
                  </button>
                  <div className="list-container">
                    <label>Demo</label>
                    <label>Marketer</label>
                    <label>Advertiser</label>
                  </div>
                </div>
              </div>
              {
                (entityName === 'Client' && !isThereActiveEntity())
                  && <div className={`${entityName.toLowerCase()}-selects`}>
                    <div className="select-container">
                    {console.log(agencies.tabs())}
                      <button className="select-btn">
                        {agencies.activeTab() ? agencies.activeTab().name : 'Choose client agency'}
                        <i className="select-icon fas fa-angle-down" />
                      </button>
                      {agencies.tabs().length > 0
                        && <div className="list-container">
                        {
                            agencies.tabs().map((agency, i) => {
                            if (!agencies.isActiveTab(i) && agency)
                              return <label onClick={() => agencies.setActiveTab(i)}> {agency.name} </label>
                            else
                              return null
                            })
                        }
                      </div>}
                    </div>
                  </div>
              }
              {
                isThereActiveEntity()
                  && <div className={`${entityName.toLowerCase()}-selects`}>
                  <div className="select-container">
                    <button className="select-btn">
                      {itemsName}
                      <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                      <label>STLUC</label>
                      <label>COBAY</label>
                    </div>
                  </div>
                  <div className="select-container">
                    <button className="select-btn">
                      Users
                      <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                      <label>lmarinvera@mediagistic.com</label>
                      <label>ray@mediagistic.com</label>
                    </div>
                  </div>
                </div>
              }
            </div>
    </div>
)

export default ConfigurationCard