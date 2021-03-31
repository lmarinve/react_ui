import React from 'react'
import ArchiveImg from '../../images/archive.png'

const CreateNewCard = ({ title, entity, handleClick }) => {
    return(
        <div className="create-new-card-box" style={{ marginTop: '20px' }}>
            <h2>{title}</h2>
            <img src={ArchiveImg} />
            <button style={{ marginTop: '20px' }} onClick={handleClick}>Create a new {entity}</button>
        </div>
    )
}

export default CreateNewCard