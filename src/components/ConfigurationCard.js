/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { Select, SelectCheckbox } from './campaign/Select'
import AgencyPhoto from '../images/pj_logo.jpg'
import ClientPhoto from '../images/traneLogo.jpg'

// const Photos = {
//     'Agency': AgencyPhoto,
//     'Client': ClientPhoto
// }

const ClientsTest = ['STLUC', 'COBAY']
const UsersTest = ['lmarinvera@mediagistic.com', 'ray@mediagistic.com']

const ConfigurationCard = ({ entity, handleChange, itemsName, entityName, isThereActiveEntity, agencies, activeOption, handleOptionsChange, items }) => (
    <div className="card-container">
            <div className={`${entityName.toLowerCase()}-photo-container`}>
              <div className={`${entityName.toLowerCase()}-photo pointer`}>
                <i className={`${entityName.toLowerCase()}-icon fas fa-store-alt`} />
                {/* <img src={Photos[entityName]} /> */}
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
                {
                  isThereActiveEntity()
                    && <div className="status">
                    <label>Active:</label>
                    <input type="checkbox" checked />
                  </div>
                }
                <SelectCheckbox
                  title={`${entityName} Type`}
                  elementsName="agencies type"
                  isSelectable
                  options={["Demo", "Advertiser", "Marketer"]}
                />
              </div>
              {
                isThereActiveEntity()
                  && <div className={`${entityName.toLowerCase()}-selects`}>
                    <Select
                      title={itemsName}
                      elementsName={itemsName}
                      isSelectable
                      options={items}
                      activeOption={null}
                      handleOptionsChange={() => null}
                    />
                    <Select
                        title="Users"
                        elementsName="users"
                        isSelectable
                        options={UsersTest}
                    />
                </div>
              }
            </div>
    </div>
)

export default ConfigurationCard