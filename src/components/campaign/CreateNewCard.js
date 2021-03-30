import React from 'react'
import ArchiveImg from '../../images/archive.png'

const CreateNewCard = ({sectionTitle, cardTitle }) => {
    return(
        <div className="create-new-card-box">
            <h2>There is not {cardTitle} created yet</h2>
            <img src={ArchiveImg} />
            <p>If you wanna create a new {sectionTitle} go to "{sectionTitle} configuration" or click in the button below</p>
            <button>Create a new {sectionTitle}</button>
        </div>
    )
}

export default CreateNewCard