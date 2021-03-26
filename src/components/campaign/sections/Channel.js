import React from 'react'
import Types from '../Types'

export default () => {
  return (
    <div>
      <div className='timeline-step animated fadeInUp campaign-type'>
        <h3 className="timeline-title animated fadeInDown">Choose an Ad Channel</h3>
        <div className='list-types'>
          {/*Para seleccionar un typeIcon y que aparezca su animacion,  al final del props "type-icon" añadir "selected"*/}
          <Types
            typeIcon='fab fa-google fa-5x animated type-icon selected'
            typeTitle='Google'
          />
          <Types
            typeIcon='fab fa-facebook-f fa-5x animated type-icon'
            typeTitle='Facebook'
          />
        </div>
      </div>
    </div>

  )
}
