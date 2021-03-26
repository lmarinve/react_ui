import React from 'react'
import Spinner from '../_helpers/Spinner'

const CardButton = ({ isLoading, iconClassName, text, handleClick }) => (
    <button className="crud-btn" onClick={handleClick} style={{ maxHeight: '28px' }}>
      {
        isLoading()
          ? <div> <Spinner color='#fff' width={17} height={17} /> </div>
          : <div>
            <div><i className={`crud-icon ${iconClassName}`} /> {text} </div>
            </div>
      }
    </button>
)

export default CardButton