import React from 'react'

const Alert = ({icon, title, message}) => {
    return(
        // Añadir la calse deploy-in junto a alert-container para que se deslice la alerta adentro de la pantalla
        // Añadir la calse deploy-out junto a alert-container para que se deslice la alerta fuera de la pantalla
        <div className="alert-container deploy-in">
            <i className="alert-close-icon fas fa-chevron-right" />
            <div className="alert-icon-container">
                <i className={`alert-icon ${icon}`} />
            </div>
            <div className="alert-message">
                <div className="title">
                    <h3>{title}</h3>
                    <div></div>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Alert