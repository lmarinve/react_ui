import React from 'react'
import { Link, useNavigate } from '@reach/router'
import UserContext from '../../Contexts/User'

const Choice = (props) => {
    const { setActiveMenu } = React.useContext(UserContext)
    const navigator = useNavigate()
    const { 
        onClick, frontStatus, backStatus, iconFront, 
        textFront, iconBackLeft, textBackLeft, iconBackRight, 
        textBackRight, leftLinkPath, linkPath, newWindow = false 
    } = props 
    const handleClick = path => {
        setActiveMenu(path)
        navigator(path, { replace: true })
    }

    return(
        <div className="n-camp">
            {
                newWindow
                  ? <a href={linkPath} target='_blank'  style={{ textDecoration: 'none', color: '#fff' }} className={frontStatus}>
                      <i className={iconFront} />
                      <p>{textFront}</p>
                  </a>
                  : <div className={frontStatus} onClick={() => handleClick(linkPath)}>
                      <i className={iconFront} />
                      <p>{textFront}</p>
                  </div>
            }
            <div className={backStatus}>
                <Link to={`/${leftLinkPath}`}>
                  <i className={iconBackLeft} />
                  <p>{textBackLeft}</p>
                </Link>
                <Link to={`/${linkPath}`}>
                  <i className={iconBackRight} />
                  <p>{textBackRight}</p>
                </Link>
            </div>
        </div>
    )
}

export default Choice
